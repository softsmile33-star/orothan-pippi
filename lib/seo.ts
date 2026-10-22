import type {Metadata} from 'next';
import pages from './seo-pages.json';
export const ORIGIN='https://www.orothan-pippi.com';
export const SITE_NAME='오롯한 삐삐 그림책 인문학 연구소';
export const seoPages: Record<string,{title:string;description:string;breadcrumb:string;image:string;course:boolean}>=pages;
export function pageMetadata(path:string):Metadata {
 const p=Object.hasOwn(seoPages,path)?seoPages[path]:undefined; if(!p)return {title:'페이지를 찾을 수 없습니다',robots:{index:false,follow:false}};
 const title=path==='/'?SITE_NAME:p.title+' | '+SITE_NAME;
 const url=ORIGIN+path; const image=ORIGIN+p.image;
 return {metadataBase:null,title:{absolute:title},description:p.description,alternates:{canonical:url},openGraph:{title,description:p.description,url,type:'website',siteName:SITE_NAME,locale:'ko_KR',images:[{url:image,alt:p.title}]},twitter:{card:'summary_large_image',title,description:p.description,images:[image]}};
}
