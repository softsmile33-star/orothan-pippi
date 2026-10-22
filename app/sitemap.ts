import type {MetadataRoute} from 'next';
import {ORIGIN,seoPages} from '@/lib/seo';
export default function sitemap():MetadataRoute.Sitemap{return Object.keys(seoPages).map(path=>({url:ORIGIN+path}));}
