const root='http://127.0.0.1:8787';
for(const route of ['/','/about','/children','/family-workshop','/instructor','/lectures','/book','/stories']){
 const response=await fetch(root+route);const html=await response.text();
 const matches=[...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].filter(m=>/문의|상담/.test(m[2].replace(/<[^>]*>/g,'')));
 const invalid=matches.filter(m=>!m[1].startsWith('/contact')&&!m[1].startsWith('tel:'));
 if(!response.ok||invalid.length)throw Error('CTA verification failed '+route);
 console.log(route+': '+matches.length+' contact/telephone CTAs OK');
}
