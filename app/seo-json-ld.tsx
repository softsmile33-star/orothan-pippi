import {ORIGIN,SITE_NAME,seoPages} from '@/lib/seo';
import {socialChannels} from '@/lib/social-channels';
export default function SeoJsonLd({path}:{path:string}){
 const p=seoPages[path];if(!p)return null;
 const url=ORIGIN+path;const org=ORIGIN+'/#organization';const site=ORIGIN+'/#website';
 const graph:Record<string,unknown>[]=[];
 if(path==='/')graph.push({'@type':'EducationalOrganization','@id':org,name:SITE_NAME,url:ORIGIN,logo:ORIGIN+'/images/logo.png',description:'그림책과 인문학을 활용한 어린이·성인 교육 연구소',sameAs:socialChannels.map(c=>c.href)},{'@type':'WebSite','@id':site,name:SITE_NAME,url:ORIGIN+'/',inLanguage:'ko-KR',publisher:{'@id':org}});
 const crumbs=[{name:path.startsWith('/faq/')?'홈 · 연구소 이야기':'홈',item:ORIGIN+(path.startsWith('/faq/')?'/#stories':'/')}];
 if(path.startsWith('/blog/'))crumbs.push({name:'그림책 Q',item:ORIGIN+'/blog'});
 if(path!=='/')crumbs.push({name:p.breadcrumb,item:url});
 graph.push({'@type':'WebPage','@id':url+'#webpage',url,name:p.title,description:p.description,inLanguage:'ko-KR',isPartOf:{'@id':site},...(path!=='/'?{breadcrumb:{'@id':url+'#breadcrumb'}}:{})});
 if(path!=='/')graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))});
 if(p.course)graph.push({'@type':'Course','@id':url+'#course',name:p.title,description:p.description,url,inLanguage:'ko-KR',provider:{'@type':'EducationalOrganization','@id':org,name:SITE_NAME,url:ORIGIN}});
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')}}/>;
}
