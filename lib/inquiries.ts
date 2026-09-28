type SqlParam = string | number | null;
type QueryResult<T> = { success: boolean; results: T[]; meta?: { changes?: number } };
type ApiResult<T> = { success: boolean; result?: QueryResult<T>[] };

async function query<T>(sql: string, params: SqlParam[]): Promise<QueryResult<T>> {
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;
  const database = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const token = process.env.CLOUDFLARE_D1_API_TOKEN;
  if (!account || !database || !token) throw new Error('Storage unavailable');
  const url = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(account)}/d1/database/${encodeURIComponent(database)}/query`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ sql, params }),
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
  });
  const body = await response.json() as ApiResult<T>;
  const result = body.result?.[0];
  if (!response.ok || !body.success || !result?.success) throw new Error('Storage query failed');
  return result;
}

export function inquiryDb() {
  return {
    prepare(sql: string) {
      const statement = (params: SqlParam[]) => ({
        bind: (...next: SqlParam[]) => statement(next),
        async first<T>(): Promise<T | null> {
          return (await query<T>(sql, params)).results[0] ?? null;
        },
        async all<T>(): Promise<{ results: T[] }> {
          return { results: (await query<T>(sql, params)).results };
        },
        async run(): Promise<{ meta: { changes: number } }> {
          const result = await query<unknown>(sql, params);
          return { meta: { changes: result.meta?.changes ?? 0 } };
        },
      });
      return statement([]);
    },
  };
}

export function adminToken() { return process.env.ADMIN_TOKEN; }
export async function isAdmin(request: Request) {
  const token = adminToken();
  if (!token || token.length < 32) return false;
  const supplied = request.headers.get('authorization')?.replace(/^Bearer /, '') || '';
  const encoder = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(token)),
    crypto.subtle.digest('SHA-256', encoder.encode(supplied)),
  ]);
  const aa = new Uint8Array(a), bb = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < aa.length; i++) diff |= aa[i] ^ bb[i];
  return diff === 0;
}
export const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
