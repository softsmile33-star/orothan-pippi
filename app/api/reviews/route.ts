
import {z} from 'zod';
import {json} from '@/lib/inquiries';

const schema=z.object({
  id:z.string().uuid(),
  name:z.string().trim().min(1).max(60),
  lecture:z.string().trim().min(1).max(120),
  organization:z.string().trim().max(120),
  rating:z.number().int().min(1).max(5),
  review:z.string().trim().min(10).max(2000),
  publishConsent:z.boolean(),
  privacyConsent:z.literal(true),
  website:z.literal('')
});

export async function POST(request:Request){
  if(request.headers.get('origin')!==new URL(request.url).origin)return json({error:'이 홈페이지에서 다시 작성해 주세요.'},403);
  const url=process.env.GOOGLE_REVIEWS_SCRIPT_WEB_APP_URL;
  if(!url||!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(url))return json({error:'후기 접수를 준비 중입니다. 잠시 후 다시 시도해 주세요.'},503);
  try{
    const text=await request.text();
    if(text.length>12000)return json({error:'후기 내용이 너무 깁니다.'},413);
    let body:unknown;
    try{body=JSON.parse(text)}catch{return json({error:'입력 내용을 확인해 주세요.'},400)}
    const parsed=schema.safeParse(body);
    if(!parsed.success)return json({error:'필수 항목과 후기 내용(10자 이상)을 확인해 주세요.'},400);
    const p=parsed.data;
    const response=await fetch(url,{
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:new URLSearchParams({id:p.id,name:p.name,lecture:p.lecture,organization:p.organization,rating:String(p.rating),review:p.review,publishConsent:String(p.publishConsent),privacyConsent:'true',website:''}),
      redirect:'follow',
      signal:AbortSignal.timeout(25000)
    });
    const answer:unknown=await response.json();
    if(!response.ok||typeof answer!=='object'||answer===null||!('success' in answer)||answer.success!==true)throw new Error('Unconfirmed review');
    return json({id:p.id},201);
  }catch{
    return json({error:'후기를 저장하지 못했습니다. 입력 내용은 유지됩니다. 잠시 후 다시 시도해 주세요.'},503);
  }
}
