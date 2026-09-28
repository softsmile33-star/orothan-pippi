import {Invitation} from '../shared';

export const metadata={
  title:'그림책 Q | 오롯한 삐삐 그림책 인문학 연구소',
  description:'그림책에서 시작해 아이의 삶과 마음으로 이어지는 질문을 나눕니다.'
};

const posts=[{
  href:'/blog/seeing-the-invisible',
  category:'그림책 Q',
  title:'초등 그림책 인문학, 보이지 않는 것을 보는 방법',
  summary:'《어린 왕자》·《프레드릭》·《알사탕》과 일기 쓰기로 아이가 마음과 관계를 바라보는 힘을 키워봅니다.',
  image:'/images/invisible-diary-family-source.png',
  alt:'엄마와 두 딸이 함께 일기를 쓰는 모습',
  diaryCrop:true
},{
  href:'/blog/five-tastes-for-children',
  category:'그림책 Q',
  title:'아이에게 꽃길만 걷게 해주고 싶나요?',
  summary:'《굴비 한 번 쳐다보고》를 읽으며 단맛뿐 아니라 짠맛·매운맛·쓴맛·신맛까지 삶의 경험으로 품는 힘을 생각합니다.',
  image:'/images/gulbi-feature.png',
  alt:'굴비 한 번 쳐다보고 그림책과 함께 삶의 다섯 가지 맛을 이야기하는 오롯한 삐삐 대표'
},{
  href:'/blog/eyes-pop-imagination',
  category:'그림책 Q',
  title:'눈알 하나로 세상을 다르게 보는 힘',
  summary:'《눈알이 쏙쏙》을 읽으며 관찰하고 상상하고 새롭게 해석하는 아이의 시선을 만나봅니다.',
  image:'/images/eyes-pop-11.png',
  alt:'눈알이 쏙쏙 그림책으로 만나는 상상력 이야기'
},{
  href:'/blog/autumn-happiness',
  category:'그림책 Q',
  title:'아이에게 지금의 행복을 알려주는 가을 그림책 10권',
  summary:'계절을 천천히 바라보는 일이 왜 아이의 행복 감각을 키우는지, 가을 그림책과 인문학 질문으로 만나봅니다.',
  image:'/images/가을_그림책_10권_대표사진_합성_인스타피드.jpg',
  alt:'가을 그림책 10권을 함께 펼쳐 놓은 모습'
},{
  href:'/blog/five-tastes-of-life',
  category:'그림책 Q',
  title:'엄마가 된 후 비로소 깨닫게 된 것 6가지',
  summary:'《구멍책》부터 《이상한 엄마》까지, 백희나 작가의 그림책 여섯 권을 따라 엄마의 마음과 삶을 돌아봅니다.',
  image:'/images/baek-heena-author-source.png',
  alt:'작업실에서 그림책을 펼쳐 든 백희나 작가',
  authorCrop:true
}];

export default function BlogPage(){return <>
  <section className="page-heading"><div className="wrap"><p className="breadcrumb"><a href="/">홈</a> / 블로그</p><p className="eyebrow">PICTURE BOOK Q</p><h1>그림책 Q</h1><p className="lead">그림책 한 권에서 시작한 질문을 아이의 오늘과 삶의 이야기로 이어갑니다.</p></div></section>
  <section className="wrap content-section blog-list">
    {posts.map(post=><a className="blog-card" href={post.href} key={post.href}>
      {'authorCrop' in post
        ? <div className="blog-card-author-crop"><img src={post.image} alt={post.alt}/></div>
        : 'diaryCrop' in post
        ? <div className="blog-card-diary-crop"><img src={post.image} alt={post.alt}/></div>
        : <img src={post.image} alt={post.alt}/>}
      <div><p className="eyebrow">{post.category}</p><h2>{post.title}</h2><p>{post.summary}</p><span className="text-link">글 읽기 ↗</span></div>
    </a>)}
  </section>
  <Invitation/>
  </>}
