import {env} from 'cloudflare:workers';
export function inquiryDb(){if(!env.DB)throw new Error('Storage unavailable');return env.DB}
export function adminToken(){return (env as unknown as {ADMIN_TOKEN?:string}).ADMIN_TOKEN}
export async function isAdmin(request:Request){const token=adminToken();if(!token||token.length<32)return false;const supplied=request.headers.get('authorization')?.replace(/^Bearer /,'')||'';const encoder=new TextEncoder();const [a,b]=await Promise.all([crypto.subtle.digest('SHA-256',encoder.encode(token)),crypto.subtle.digest('SHA-256',encoder.encode(supplied))]);const aa=new Uint8Array(a),bb=new Uint8Array(b);let diff=0;for(let i=0;i<aa.length;i++)diff|=aa[i]^bb[i];return diff===0}
export const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
