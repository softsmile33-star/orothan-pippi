import {z} from 'zod';
import {adminToken,inquiryDb,json} from '@/lib/inquiries';

const schema=z.object({
  id:z.string().uuid(),
  name:z.string().trim().min(1).max(60),
  lecture:z.string().trim().min(1).max(120),
  organization:z.string().trim().max(120),
  rating:z.number().int().min(1).max(5),
  review:z.string().trim().min(10).max(2000),
  publishConsent:z.boolean(),
  privacyConsent:z.literal(true),
  website:z.string().max(0)
});

export async function POST(request:Request){
  if(request.headers.get('origin')!==new URL(request.url).origin)return json({error:'이 홈페이지에서 다시 작성해 주세요.'},403);
  if(!adminToken()||adminToken()!.length<32)return json({error:'후기 저장소를 준비 중입니다. 잠시 후 다시 시도해 주세요.'},503);
  try{
    const text=await request.text();
    if(text.length>12000)return json({error:'후기 내용이 너무 깁니다.'},413);
    let body:unknown;try{body=JSON.parse(text)}catch{return json({error:'입력 내용을 확인해 주세요.'},400)}
    const parsed=schema.safeParse(body);
    if(!parsed.success)return json({error:'필수 항목과 후기 내용(10자 이상)을 확인해 주세요.'},400);
    const p=parsed.data,db=inquiryDb();
    const old=await db.prepare('SELECT id FROM lecture_reviews WHERE id = ?').bind(p.id).first();
    if(old)return json({id:p.id},200);
    const ip=request.headers.get('cf-connecting-ip')||'local';
    const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(ip+adminToken()));
    const hash=Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,'0')).join('');
    const count=await db.prepare('SELECT count(*) AS n FROM lecture_reviews WHERE ip_hash = ? AND created_at > ?').bind(hash,Date.now()-600000).first<{n:number}>();
    if((count?.n??0)>=3)return json({error:'짧은 시간에 여러 번 작성했습니다. 10분 후 다시 시도해 주세요.'},429);
    const now=Date.now();
    await db.prepare('INSERT INTO lecture_reviews (id, name, lecture, organization, rating, review, publish_consent, privacy_consent_at, status, created_at, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').bind(p.id,p.name,p.lecture,p.organization,p.rating,p.review,p.publishConsent?1:0,now,'pending',now,hash).run();
    return json({id:p.id},201);
  }catch(error){console.error('Review storage failed',error instanceof Error?error.name:'unknown');return json({error:'후기를 저장하지 못했습니다. 입력 내용은 유지됩니다. 잠시 후 다시 시도해 주세요.'},503)}
}
