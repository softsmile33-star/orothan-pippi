import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const pages=JSON.parse(fs.readFileSync('lib/seo-pages.json','utf8'));
const origin='https://www.orothan-pippi.com';
const mode=process.argv[2]??'verify';const base=process.argv[3]??origin;
const baselineFile='../seo-baseline.json';
// Next.js adds an inert template for the Analytics client-rendering boundary.
const visible=html=>html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1].replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<link\b[^>]*>/gi,'').replace(/<template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"><\/template>/g,'').replace(/<!--.*?-->/gs,'').replace(/\s+/g,' ').trim();
const hash=s=>crypto.createHash('sha256').update(s??'').digest('hex');
const descriptions=new Set();const baseline=mode==='verify'?JSON.parse(fs.readFileSync(baselineFile,'utf8')):{};const results=[];
for(const path of Object.keys(pages)){
 const res=await fetch(base+path);assert.equal(res.status,200,path);const html=await res.text();
 if(mode==='baseline'){baseline[path]=hash(visible(html));continue;}
 const meta=(key)=>html.match(new RegExp('<meta[^>]*(?:name|property)="'+key+'"[^>]*content="([^"]*)"'))?.[1];
 assert.ok(html.match(/<title>[^<]+<\/title>/),path+' title');
 const desc=meta('description');assert.ok(desc,path+' description');assert.ok(!descriptions.has(desc),path+' duplicate description');descriptions.add(desc);
 assert.ok(html.includes('rel="canonical" href="'+origin+path+'"'),path+' canonical');
 for(const key of ['og:title','og:description','og:url','og:type','og:image','og:site_name','twitter:card','twitter:title','twitter:description','twitter:image'])assert.ok(meta(key),path+' '+key);
 assert.equal(meta('og:url'),origin+path);assert.equal(meta('twitter:card'),'summary_large_image');
 assert.equal(meta('naver-site-verification'),'7afda57f56a6a89ef1d29e48042286659b3c34ec');assert.equal(meta('google-site-verification'),'ieKPJL1m_NbbQT8YH1HLwOKgC25QeYsKjAkAd4P5IjM');
 assert.equal(meta('robots'),'index, follow');
 const blocks=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];assert.equal(blocks.length,1,path+' JSON-LD count');const graph=JSON.parse(blocks[0][1])['@graph'];assert.equal(new Set(graph.map(g=>g['@id'])).size,graph.length);
 assert.ok(graph.some(g=>g['@type']==='WebPage'));if(path!=='/')assert.ok(graph.some(g=>g['@type']==='BreadcrumbList'));
 assert.equal(graph.some(g=>g['@type']==='Course'),pages[path].course);
 const unchanged=hash(visible(html))===baseline[path];assert.ok(unchanged,path+' visible HTML changed');results.push({path,status:200,metadata:true,jsonLd:true,visibleHtmlUnchanged:unchanged});
}
if(mode==='baseline'){fs.writeFileSync(baselineFile,JSON.stringify(baseline,null,2));console.log('Saved visible HTML baseline for '+Object.keys(baseline).length+' pages');process.exit();}
for(const image of new Set(Object.values(pages).map(p=>p.image))){const res=await fetch(base+image);assert.equal(res.status,200,image);}
const sitemap=await fetch(base+'/sitemap.xml');assert.equal(sitemap.status,200);const xml=await sitemap.text();const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);assert.deepEqual(urls.sort(),Object.keys(pages).map(p=>origin+p).sort());
const robots=await fetch(base+'/robots.txt');assert.equal(robots.status,200);const txt=await robots.text();assert.ok(txt.includes('Allow: /'));assert.ok(txt.includes(origin+'/sitemap.xml'));
const llms=await fetch(base+'/llms.txt');assert.equal(llms.status,200);assert.ok((await llms.text()).includes(origin+'/contact'));
const admin=await fetch(base+'/admin');assert.equal(admin.status,200);assert.ok((await admin.text()).includes('noindex, nofollow'));
const missing=await fetch(base+'/seo-page-does-not-exist');assert.equal(missing.status,404);
const report={base,checkedAt:new Date().toISOString(),pages:results,sitemap:{status:200,count:urls.length},robots:200,llms:200,images:200,adminNoindex:true,missing404:true};fs.writeFileSync('../seo-verification-'+(base===origin?'production':'local')+'.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
