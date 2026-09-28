import type {CSSProperties} from 'react';
import {Invitation} from '../../shared';

export const metadata={
  title:'엄마가 된 후 비로소 깨닫게 된 것 6가지 | 그림책 Q',
  description:'백희나 작가의 그림책 여섯 권을 따라가며, 엄마가 된 뒤에야 알게 된 마음과 사랑, 쉼과 도움의 의미를 돌아봅니다.'
};

type CropProps={
  src:string; alt:string; sourceWidth:number; sourceHeight:number;
  x:number; y:number; width:number; height:number; className?:string;
};

function ScreenshotCrop({src,alt,sourceWidth,sourceHeight,x,y,width,height,className=''}:CropProps){
  const imageStyle={
    width:`${sourceWidth/width*100}%`,
    left:`-${x/width*100}%`,
    top:`-${y/height*100}%`
  } as CSSProperties;
  return <div className={`screenshot-crop ${className}`} style={{aspectRatio:`${width} / ${height}`}}>
    <img src={src} alt={alt} style={imageStyle}/>
  </div>;
}

const lessons=[
  {
    number:'01',
    book:'《구멍책》',
    title:'엄마도 지치는 한 사람이다',
    body:[
      '엄마가 되기 전에는 사랑만 충분하면 무엇이든 해낼 수 있을 줄 알았습니다. 하지만 가족을 돌보는 일은 마음뿐 아니라 몸의 에너지까지 매일 요구합니다.',
      '누군가를 아끼는 마음과 내가 지쳤다는 사실은 동시에 존재할 수 있습니다. 힘든 날에는 아이에게 작은 일을 맡기고, 잠시 혼자 숨을 고르는 것도 좋은 돌봄입니다.'
    ],
    image:<ScreenshotCrop src="/images/baek-heena-hole-book-source.png" alt="백희나 그림책 구멍책 표지" sourceWidth={613} sourceHeight={840} x={78} y={12} width={458} height={633}/>
  },
  {
    number:'02',
    book:'《구름빵》',
    title:'아이들은 부모의 환한 웃음을 응원한다',
    body:[
      '비 오는 아침, 고양이 남매가 구름을 데려와 만든 빵은 바쁜 아빠에게 날아갈 힘을 건넵니다. 가족을 향한 조그마한 마음이 하루를 다시 움직이게 하지요.',
      '아이에게 필요한 것은 완벽한 부모보다 함께 웃을 수 있는 부모일지 모릅니다. 부모의 기쁨은 아이에게도 집이 안전하다는 따뜻한 신호가 됩니다.'
    ],
    image:<ScreenshotCrop src="/images/baek-heena-cloud-bread-source.png" alt="백희나 그림책 구름빵 표지" sourceWidth={619} sourceHeight={997} x={82} y={42} width={459} height={624}/>
  },
  {
    number:'03',
    book:'《알사탕》',
    title:'아이의 마음을 듣다 보면 내 마음도 들린다',
    body:[
      '혼자 놀던 동동이는 신비한 알사탕을 통해 주변 존재들의 속마음을 듣습니다. 무심한 잔소리 뒤에 감춰진 사랑도, 먼저 다가가고 싶은 자신의 마음도 발견합니다.',
      '아이의 이야기를 듣느라 바쁜 엄마에게도 자기 마음을 묻는 시간이 필요합니다. 지금 정말 원하는 것이 무엇인지, 오늘 어떤 말이 필요했는지 가만히 들어보세요.'
    ],
    image:<ScreenshotCrop src="/images/baek-heena-magic-candy-source.png" alt="백희나 그림책 알사탕 표지" sourceWidth={769} sourceHeight={1164} x={165} y={298} width={458} height={459}/>
  },
  {
    number:'04',
    book:'《장수탕 선녀님》',
    title:'엄마에게도 신나게 놀 시간이 필요하다',
    body:[
      '오래된 목욕탕에서 만난 선녀님은 낯설지만 다정합니다. 세대를 뛰어넘어 이어지는 우정과 놀이가 덕지의 하루를 반짝이게 만듭니다.',
      '엄마의 삶이 집안일과 일정표만으로 채워질 필요는 없습니다. 아이와 함께 웃고, 때로는 아이 없이도 좋아하는 일을 하며 노는 시간은 사치가 아니라 삶의 힘입니다.'
    ],
    image:<ScreenshotCrop src="/images/baek-heena-bath-fairy-source.png" alt="백희나 그림책 장수탕 선녀님 표지" sourceWidth={693} sourceHeight={1152} x={119} y={335} width={458} height={627}/>
  },
  {
    number:'05',
    book:'《삐약이 엄마》',
    title:'서툴러도 사랑은 가족을 만든다',
    body:[
      '고양이 니양이는 자신과 전혀 다른 병아리를 품고 엄마가 됩니다. 닮아서 가족인 것이 아니라, 돌보고 기다리는 시간 속에서 가족이 되어갑니다.',
      '요리도 청소도 육아도 마음처럼 되지 않는 날이 있습니다. 그래도 다시 밥을 차리고 안아주는 서툰 사랑이 우리 집의 하루를 이어줍니다.'
    ],
    image:<ScreenshotCrop src="/images/baek-heena-chick-mom-source.png" alt="백희나 그림책 삐약이 엄마 표지" sourceWidth={740} sourceHeight={1039} x={177} y={35} width={458} height={671}/>
  },
  {
    number:'06',
    book:'《이상한 엄마》',
    title:'엄마도 누군가의 도움을 받아도 된다',
    body:[
      '아픈 아이 곁에 갈 수 없는 엄마의 다급한 마음 앞에 구름을 타고 온 낯선 존재가 나타납니다. 조금 이상하지만 지극히 다정한 손길이 엄마와 아이의 빈자리를 메웁니다.',
      '모든 일을 혼자 해내는 것이 좋은 엄마의 조건은 아닙니다. 도움을 청하고 받아들이는 일도 가족을 지키는 용기입니다. 엄마 역시 보살핌이 필요한 사람입니다.'
    ],
    image:<ScreenshotCrop src="/images/baek-heena-strange-mom-source.png" alt="백희나 그림책 이상한 엄마 표지" sourceWidth={637} sourceHeight={1146} x={87} y={368} width={458} height={612}/>
  }
];

export default function MotherhoodLessons(){return <>
  <article className="article-page">
    <header className="article-header wrap">
      <p className="breadcrumb"><a href="/">홈</a> / <a href="/blog">그림책 Q</a></p>
      <p className="eyebrow">PICTURE BOOK Q</p>
      <h1>엄마가 된 후 비로소<br/>깨닫게 된 것 6가지</h1>
      <p className="article-intro">아이를 키우며 알게 된 것은 아이에 관한 것만이 아니었습니다. 백희나 작가의 그림책 여섯 권을 따라, 엄마의 마음과 삶을 다시 바라봅니다.</p>
    </header>

    <div className="article-body wrap">
      <section>
        <figure className="article-hero-image">
          <ScreenshotCrop className="author-crop" src="/images/baek-heena-author-source.png" alt="작업실에서 그림책을 펼쳐 든 백희나 작가" sourceWidth={968} sourceHeight={868} x={185} y={411} width={600} height={428}/>
          <figcaption>백희나 작가의 그림책은 아이와 엄마의 마음을 함께 비춥니다.</figcaption>
        </figure>
      </section>

      <section>
        <h2>아이를 키우며, 나도 다시 자랍니다</h2>
        <p>엄마가 되기 전에는 사랑하는 마음만 있으면 충분할 줄 알았습니다. 하지만 육아는 기쁨과 함께 피로, 외로움, 서툶, 미안함을 데려왔습니다. 그러는 동안 아이만 자란 것이 아니라 엄마인 나도 이전과 다른 사람이 되어갔습니다.</p>
        <p>백희나 작가의 세계에는 완벽한 어른 대신 지친 곰 인형, 외로운 아이, 낡은 목욕탕의 선녀, 서툰 고양이 엄마처럼 어딘가 부족해서 더 다정한 존재들이 등장합니다. 그들을 따라가다 보면 <strong>잘해야만 사랑할 수 있는 것이 아니라는 사실</strong>을 만나게 됩니다.</p>
      </section>

      <section className="lesson-list">
        {lessons.map(({number,book,title,body,image})=><div className="motherhood-lesson" key={number}>
          <div className="lesson-copy">
            <p className="lesson-number">깨달음 {number}</p>
            <p className="lesson-book">{book}</p>
            <h2>{title}</h2>
            {body.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
          </div>
          <figure className="lesson-cover">{image}</figure>
        </div>)}
      </section>

      <section className="question-box">
        <p className="eyebrow">A QUESTION FOR MOM</p>
        <h2>오늘의 나는 어떤 돌봄이 필요할까요?</h2>
        <p>아이에게 필요한 것을 묻는 만큼, 엄마인 나에게 필요한 것도 물어보세요. 잠깐의 쉼일 수도, 신나게 웃는 시간일 수도, 누군가의 도움이 필요하다는 솔직한 고백일 수도 있습니다.</p>
        <p><strong>엄마도 누군가의 아이였고, 지금도 돌봄을 받을 자격이 있는 한 사람입니다.</strong></p>
      </section>

      <section>
        <h2>완벽하지 않아도 충분히 다정한 하루</h2>
        <p>아이를 키우고 나를 다시 키우느라 바쁜 모든 엄마에게, 이 여섯 권의 그림책이 작은 숨구멍이 되어주기를 바랍니다. 오늘 모든 일을 잘 해내지 못했더라도 괜찮습니다. 사랑은 완벽한 결과보다 다시 손을 내미는 하루하루에 더 오래 머뭅니다.</p>
      </section>

      <div className="article-back"><a className="text-link" href="/blog">그림책 Q 목록으로 돌아가기 ←</a></div>
    </div>
  </article>
  <Invitation/>
  </>}
