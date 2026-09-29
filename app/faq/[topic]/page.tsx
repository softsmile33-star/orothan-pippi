import {notFound} from 'next/navigation';
import data from '../data.json';

type Topic = keyof typeof data;
const isTopic = (value:string):value is Topic => value in data;

export function generateStaticParams(){return Object.keys(data).map(topic=>({topic}));}

export async function generateMetadata({params}:{params:Promise<{topic:string}>}){
  const {topic}=await params;
  return {title:isTopic(topic)?data[topic].title:'페이지를 찾을 수 없습니다'};
}

export default async function FAQPage({params}:{params:Promise<{topic:string}>}){
  const {topic}=await params;
  if(!isTopic(topic))notFound();
  const page=data[topic];
  const other=topic==='diary'?{href:'/faq/picture-books',label:'그림책 인문학 Q&A 보기'}:{href:'/faq/diary',label:'일기쓰기 Q&A 보기'};

  return <>
    <section className="page-heading"><div className="wrap">
      <p className="breadcrumb"><a href="/#stories">홈 · 연구소 이야기</a> / {page.title}</p>
      <p className="eyebrow">{page.tag}</p><h1>{page.title}</h1><p className="lead">{page.lead}</p>
    </div></section>
    <section className="wrap content-section faq-content" aria-label={page.title}>
      <div className="faq-list">{page.questions.map(({question,answer},i)=><article className="faq-item" key={question}>
        <h2><span className="faq-number">Q{i+1}.</span> {question}</h2><p>{answer}</p>
      </article>)}</div>
      <nav className="faq-links" aria-label="Q&A 페이지 이동">
        <a className="text-link" href="/#stories">연구소 이야기로 돌아가기</a>
        <a className="text-link" href={other.href}>{other.label}</a>
      </nav>
    </section>
  </>;
}
