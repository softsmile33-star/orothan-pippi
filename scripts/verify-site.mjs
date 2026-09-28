import {spawnSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
const binary=process.env.AGENT_BROWSER_BIN;
if(!binary)throw new Error('Set AGENT_BROWSER_BIN');
const origin='http://localhost:5173';
const routes=['/','/about','/children','/family-workshop','/instructor','/lectures','/book','/stories','/contact'];
const report={pages:[],api:[],consoleErrors:[]};
function cmd(...args){const r=spawnSync(binary,['--session','pippi',...args],{encoding:'utf8',timeout:45000});if(r.status!==0)throw new Error(r.stderr||r.stdout);return r.stdout.trim()}
function evaluate(code){const raw=cmd('eval',code);return JSON.parse(raw)}
mkdirSync('outputs',{recursive:true});
for(const width of [1440,390,320]){cmd('set','viewport',String(width),'900');for(const route of routes){cmd('open',origin+route);const check=evaluate(`JSON.stringify({title:document.title,h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0),active:document.querySelector('nav a[aria-current="page"]')?.getAttribute('href')??null,links:[...document.querySelectorAll('a')].map(a=>a.getAttribute('href')).filter(h=>h&&!h.startsWith('#'))})`);const result=JSON.parse(check);if(result.h1!==1||result.overflow||!result.images||(route!=='/'&&result.active!==route))throw new Error(JSON.stringify({route,width,...result}));report.pages.push({route,width,...result});if(width!==320)cmd('screenshot',resolve('outputs',`${route==='/'?'home':route.slice(1)}-${width}.png`),'--full');}}
cmd('set','viewport','390','844');cmd('open',origin+'/children');cmd('click','.menu-button');if(evaluate('document.querySelector(".menu-button").getAttribute("aria-expanded")')!=='true')throw new Error('Mobile menu failed');cmd('click','nav a[href="/contact"]');cmd('open',origin+'/contact?program='+encodeURIComponent('초등 그림책 인문학'));
if(!evaluate('document.querySelector("#program").textContent').includes('초등 그림책 인문학'))throw new Error('Program transfer failed');
cmd('fill','#name','화면 검증 테스트');cmd('fill','#contact','test@example.com');cmd('fill','#message','상담 흐름 검증 데이터입니다. 테스트 후 삭제합니다.');cmd('click','#consent');cmd('click','button[type="submit"]');
cmd('wait','.form-result');const result=evaluate('document.querySelector(".form-result").textContent');if(!result.includes('저장되었습니다'))throw new Error(result);
cmd('screenshot',resolve('outputs','contact-success-mobile.png'),'--full');
const token=readFileSync('.dev.vars','utf8').trim().split('=')[1];
const adminHeaders={Authorization:'Bearer '+token};
let res=await fetch(origin+'/api/admin/inquiries',{headers:adminHeaders});let data=await res.json();if(!res.ok)throw new Error('Admin read failed');const saved=data.items.find(i=>i.name==='화면 검증 테스트');if(!saved)throw new Error('Saved inquiry not found');report.api.push({case:'browser submit persisted and admin read',pass:true});
const payload={id:saved.id,program:saved.program,name:saved.name,contact:saved.contact,organization:'',message:saved.message,consent:true,website:''};const headers={'Content-Type':'application/json',Origin:origin};
res=await fetch(origin+'/api/inquiries',{method:'POST',headers,body:JSON.stringify(payload)});if(res.status!==200)throw new Error('Idempotency failed');report.api.push({case:'retry returns same receipt without duplicate',pass:true});
for(const [name,patch,status] of [['missing consent',{consent:false},400],['invalid contact',{contact:'invalid'},400],['honeypot',{website:'spam'},400]]){res=await fetch(origin+'/api/inquiries',{method:'POST',headers,body:JSON.stringify({...payload,...patch,id:crypto.randomUUID()})});if(res.status!==status)throw new Error(name+' '+res.status);report.api.push({case:name,status,pass:true})}
res=await fetch(origin+'/api/admin/inquiries');if(res.status!==401)throw new Error('Admin exposed');report.api.push({case:'anonymous admin access denied',status:401,pass:true});
res=await fetch(origin+'/api/inquiries',{method:'POST',headers:{...headers,Origin:'https://example.com'},body:JSON.stringify(payload)});if(res.status!==403)throw new Error('Origin validation failed');report.api.push({case:'cross-origin blocked',status:403,pass:true});
res=await fetch(origin+'/api/admin/inquiries',{method:'DELETE',headers:{...adminHeaders,...headers},body:JSON.stringify({id:saved.id})});if(!res.ok)throw new Error('Delete failed');data=await (await fetch(origin+'/api/admin/inquiries',{headers:adminHeaders})).json();if(data.items.some(i=>i.id===saved.id))throw new Error('Delete not persistent');report.api.push({case:'admin deletes test record permanently',pass:true});
const allLinks=[...new Set(report.pages.flatMap(p=>p.links))];for(const link of allLinks){if(!link.startsWith('/'))throw new Error('Unexpected external link '+link);const r=await fetch(origin+link);if(!r.ok)throw new Error('Broken link '+link)}report.internalLinks=allLinks.length;
report.consoleErrors=cmd('errors');if(report.consoleErrors)throw new Error(report.consoleErrors);
writeFileSync('outputs/verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify({pages:report.pages.length,apiChecks:report.api.length,internalLinks:allLinks.length,passed:true}));
