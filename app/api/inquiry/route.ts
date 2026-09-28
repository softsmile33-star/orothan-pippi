import {env} from 'cloudflare:workers';
import {z} from 'zod';
import {inquiryDb,json} from '@/lib/inquiries';
import {inquiryTypes,failureMessage} from '@/lib/inquiry-fields';
const schema=z.object({name:z.string().trim().min(1).max(60),phone:z.string().trim().regex(/^\+?[\d\s()-]{8,22}$/).refine(s=>s.replace(/\D/g,'').length>=8),email:z.union([z.literal(''),z.string().email().max(120)]),inquiryType:z.enum(inquiryTypes),organization:z.string().trim().max(120),preferredDate:z.string().trim().max(120),message:z.string().trim().min(1).max(3000),privacyConsent:z.literal('true'),website:z.literal('')});
export async function POST(request:Request) {
  const fail=(status:number)=>json({success:false,error:failureMessage},status);
  if(request.headers.get('origin')!==new URL(request.url).origin)return fail(403);
  if(!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded'))return fail(415);
  const id=request.headers.get('Idempotency-Key');
  if(!z.string().uuid().safeParse(id).success)return fail(400);
  try {
    const text=await request.text();if(text.length>40000)return fail(413);
    const parsed=schema.safeParse(Object.fromEntries(new URLSearchParams(text)));
    if(!parsed.success)return fail(400);
    const url=(env as unknown as {GOOGLE_APPS_SCRIPT_WEB_APP_URL?:string}).GOOGLE_APPS_SCRIPT_WEB_APP_URL;
    if(!url||!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(url))return fail(503);
    const db=inquiryDb();
    // Atomic claim prevents concurrent or retried requests from adding a second Sheet row.
    const claim=await db.prepare("INSERT INTO inquiry_deliveries (id,state,created_at) VALUES (?,'pending',?) ON CONFLICT(id) DO NOTHING").bind(id,Date.now()).run();
    if(!claim.meta.changes) {
      const old=await db.prepare('SELECT state FROM inquiry_deliveries WHERE id = ?').bind(id).first<{state:string}>();
      return old?.state==='sent'?json({success:true}):fail(409);
    }
    try {
      const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(parsed.data),redirect:'follow',signal:AbortSignal.timeout(25000)});
      const answer:unknown=await response.json();
      if(!response.ok||typeof answer!=='object'||answer===null||!('success' in answer)||answer.success!==true)throw new Error('Unconfirmed delivery');
      await db.prepare("UPDATE inquiry_deliveries SET state='sent' WHERE id=?").bind(id).run();
      return json({success:true},201);
    }catch {
      // A timeout may happen after Google saved the row. Never automatically resend it.
      await db.prepare("UPDATE inquiry_deliveries SET state='unknown' WHERE id=?").bind(id).run();
      return fail(502);
    }
  }catch{return fail(503);}
}
