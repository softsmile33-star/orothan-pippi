import type {CSSProperties} from 'react';
import {Invitation} from '../../shared';

export const metadata={
  title:'초등 그림책 인문학, 보이지 않는 것을 보는 방법 | 그림책 Q',
  description:'어린 왕자, 프레드릭, 알사탕과 일기 쓰기를 통해 아이가 눈앞의 결과 너머 마음과 관계를 바라보는 힘을 키우는 방법을 나눕니다.'
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

export default function SeeingTheInvisible(){return <>
  <article className="article-page">
    <header className="article-header wrap">
      <p className="breadcrumb"><a href="/">홈</a> / <a href="/blog">그림책 Q</a></p>
      <p className="eyebrow">PICTURE BOOK Q</p>
      <h1>초등 그림책 인문학<br/>보이지 않는 것을 보는 방법</h1>
      <p className="article-intro">지식은 검색할 수 있지만 마음을 헤아리는 힘은 천천히 길러집니다. 그림책과 일기로 아이가 눈앞의 결과 너머를 바라보는 시간을 만들어 봅니다.</p>
    </header>

    <div className="article-body wrap">
      <section>
        <figure className="article-insight invisible-family-intro">
          <ScreenshotCrop src="/images/invisible-intro-source.png" alt="어린 두 딸과 함께한 오롯한 삐삐 대표" sourceWidth={2048} sourceHeight={857} x={800} y={514} width={180} height={246}/>
          <figcaption>그림책 육아에서 시작해 초등 그림책 인문학으로 이어진 시간</figcaption>
        </figure>
        <p>어린 두 딸과 그림책을 읽던 시간은 아이들이 초등학생이 되면서 조금씩 달라졌습니다. 무엇을 읽힐지보다, 책을 통해 어떤 마음과 질문을 만나게 할지가 더 중요해졌습니다.</p>
        <p>빠르게 답을 찾는 능력이 중요해진 시대일수록 아이에게는 <strong>쉽게 검색할 수 없는 것</strong>을 바라보는 연습이 필요합니다. 친구의 표정 뒤에 숨은 마음, 실패 후 다시 시작할 용기, 가족이 건네는 조용한 응원처럼 삶을 깊게 만드는 것들은 대부분 눈에 보이지 않기 때문입니다.</p>
      </section>

      <section>
        <p className="eyebrow">WHY PICTURE BOOKS?</p>
        <h2>그림책은 마음을 읽는 가장 다정한 징검다리입니다</h2>
        <p>그림책은 짧은 문장과 그림 사이에 넓은 생각의 공간을 남겨 둡니다. 아이는 인물의 표정과 색, 장면의 변화에 머물며 “왜 그랬을까?”, “나라면 어땠을까?”를 자연스럽게 묻게 됩니다.</p>
        <p>인문학은 많은 지식을 외우는 일이 아니라 내가 누구인지, 다른 사람과 어떻게 살아갈지를 질문하는 일입니다. 그래서 그림책 인문학의 목표는 책을 빨리 끝내는 데 있지 않습니다. 한 장면을 오래 바라보고 자기 언어로 의미를 만들어 보는 데 있습니다.</p>
      </section>

      <section>
        <p className="eyebrow">01 · THE LITTLE PRINCE</p>
        <h2>마음으로 보아야 비로소 보이는 것</h2>
        <p>《어린 왕자》 속 여우는 중요한 것은 눈으로만 볼 수 없다고 알려줍니다. 우리는 성적과 결과, 겉으로 드러난 행동에 시선을 빼앗기기 쉽지만 아이의 진짜 마음은 그 안쪽에 숨어 있을 때가 많습니다.</p>
        <figure className="article-hero-image">
          <ScreenshotCrop src="/images/invisible-little-prince-source.png" alt="어린 왕자와 여우가 함께 있는 그림책 장면" sourceWidth={1201} sourceHeight={1122} x={130} y={101} width={886} height={409}/>
          <figcaption>보이지 않는 마음은 오래 바라보고 관계를 맺을 때 조금씩 모습을 드러냅니다.</figcaption>
        </figure>
        <div className="reflection-card">
          <p>포기하고 싶은 순간에도 다시 시도하는 용기, 친구를 배려하는 마음, 아이의 상상과 호기심, 부모와 아이 사이의 따뜻한 눈맞춤. 삶을 움직이는 중요한 힘은 대개 숫자로 재기 어렵습니다.</p>
        </div>
      </section>

      <section>
        <p className="eyebrow">02 · FREDERICK</p>
        <h2>햇살과 색깔과 이야기도 삶의 양식입니다</h2>
        <p>다른 들쥐들이 겨울을 준비하며 곡식을 모을 때 프레드릭은 햇살과 색깔, 이야기를 모읍니다. 겉으로는 가만히 있는 것처럼 보이지만, 추운 겨울 공동체를 견디게 해 줄 마음의 양식을 준비하고 있었지요.</p>
        <figure className="article-book-cover article-insight">
          <ScreenshotCrop src="/images/invisible-frederick-cover-source.png" alt="레오 리오니 그림책 프레드릭 표지" sourceWidth={1118} sourceHeight={832} x={411} y={194} width={376} height={469}/>
          <figcaption>레오 리오니의 《프레드릭》</figcaption>
        </figure>
        <div className="invisible-scene-grid">
          <figure>
            <ScreenshotCrop src="/images/invisible-frederick-scenes-source.png" alt="겨울을 위해 색깔을 나누어 주는 프레드릭" sourceWidth={581} sourceHeight={1016} x={130} y={21} width={332} height={442}/>
            <figcaption>색깔을 나누어 주는 프레드릭</figcaption>
          </figure>
          <figure>
            <ScreenshotCrop src="/images/invisible-frederick-scenes-source.png" alt="친구들에게 이야기를 들려주는 프레드릭" sourceWidth={581} sourceHeight={1016} x={130} y={560} width={332} height={446}/>
            <figcaption>이야기로 긴 겨울을 밝히는 시간</figcaption>
          </figure>
        </div>
        <p>AI가 많은 정보를 대신 찾아주는 시대에도 예술과 상상력, 감성은 아이가 자기 삶의 방향을 만드는 힘으로 남습니다. “왜 아무것도 안 하니?”라고 서두르기 전에 아이가 지금 무엇을 보고, 느끼고, 마음속에 모으고 있는지 물어봐 주세요.</p>
      </section>

      <section className="question-box">
        <p className="eyebrow">A QUESTION FOR CHILDREN</p>
        <h2>“너라면 겨울을 위해 무엇을 모으고 싶니?”</h2>
        <p>정답을 찾기보다 아이의 답이 어디에서 시작되었는지 궁금해해 주세요. 햇살, 노래, 냄새, 가족의 웃음처럼 아이가 고른 보이지 않는 보물 속에 그 아이만의 세계가 담겨 있습니다.</p>
      </section>

      <section>
        <p className="eyebrow">03 · MAGIC CANDIES</p>
        <h2>다른 사람의 속마음을 듣는다는 것</h2>
        <p>《알사탕》의 동동이는 신비한 사탕을 먹은 뒤 주변 존재들의 속마음을 듣게 됩니다. 그러나 이 이야기가 건네는 가장 중요한 질문은 특별한 사탕 없이도 우리는 서로의 마음에 귀를 기울일 수 있는가에 있습니다.</p>
        <figure className="article-book-cover article-insight">
          <ScreenshotCrop src="/images/invisible-candy-cover-source.png" alt="백희나 그림책 알사탕 표지" sourceWidth={1124} sourceHeight={1044} x={132} y={51} width={886} height={885}/>
          <figcaption>백희나 작가의 《알사탕》</figcaption>
        </figure>
        <figure className="article-hero-image">
          <ScreenshotCrop src="/images/invisible-candy-scene-source.png" alt="알사탕을 먹고 속마음을 듣는 동동이 그림책 장면" sourceWidth={1242} sourceHeight={697} x={239} y={92} width={886} height={441}/>
          <figcaption>말로 표현되지 않은 감정에도 다정하게 반응하는 힘</figcaption>
        </figure>
        <p><strong>우리 아이는 자기 안에서 일어나는 이야기를 얼마나 잘 듣고 있을까요?</strong> 감정에 이름을 붙이고, 왜 그런 마음이 생겼는지 말해 보는 순간이 인문학의 시작입니다. 자기 마음을 읽을 수 있는 아이가 타인의 마음도 섣불리 판단하지 않고 바라볼 수 있습니다.</p>
      </section>

      <section>
        <p className="eyebrow">04 · READ & WRITE</p>
        <h2>일기는 보이지 않는 마음을 문장으로 만나는 시간</h2>
        <figure className="article-hero-image">
          <ScreenshotCrop src="/images/invisible-author-source.png" alt="일기로 배우는 초등 그림책 인문학 책과 함께 선 오롯한 삐삐 대표" sourceWidth={1128} sourceHeight={653} x={153} y={67} width={887} height={500}/>
          <figcaption>《일기로 배우는 초등 그림책 인문학》</figcaption>
        </figure>
        <p>일기는 숙제를 완성하는 시간이 아니라 하루 끝에 자기 마음의 목소리를 듣는 시간입니다. 엄마와 오늘 있었던 일을 도란도란 이야기한 뒤 서운했던 감정, 문득 떠오른 생각, 다시 해 보고 싶은 일을 몇 줄 적는 것만으로도 충분합니다.</p>
        <figure className="article-hero-image">
          <ScreenshotCrop src="/images/invisible-diary-family-source.png" alt="엄마와 두 딸이 함께 일기를 쓰는 모습" sourceWidth={1195} sourceHeight={871} x={110} y={0} width={887} height={500}/>
          <figcaption>잘 쓴 문장보다 자기 마음을 솔직하게 바라보는 시간이 먼저입니다.</figcaption>
        </figure>
        <p>친구에게 거절당한 슬픔을 기록하며 관계의 의미를 배우고, 직접 만든 음식의 과정을 적으며 나눔의 기쁨을 발견하고, 속담 한 줄로 하루를 마무리하며 오래된 지혜를 만납니다. 일기는 아이가 스스로를 발견하는 가장 작고 소중한 방이 됩니다.</p>
      </section>

      <section className="question-box">
        <p className="eyebrow">THREE QUESTIONS FOR TODAY</p>
        <h2>책을 덮은 뒤 함께 나눌 질문</h2>
        <ol>
          <li>오늘 눈에는 보이지 않았지만 마음으로 느낀 것은 무엇이었니?</li>
          <li>프레드릭처럼 네가 다른 사람에게 나누어 줄 수 있는 것은 무엇일까?</li>
          <li>지금 네 마음이 말을 한다면 어떤 이야기를 들려줄까?</li>
        </ol>
        <p>아이의 답을 고치거나 더 멋진 말로 바꾸지 않아도 괜찮습니다. 끝까지 들어주는 경험이 아이에게는 자기 생각을 믿게 하는 힘이 됩니다.</p>
      </section>

      <section>
        <h2>보이지 않는 것을 바라보는 여유</h2>
        <p>아이들이 살아갈 시대에는 정보를 빨리 찾는 능력만큼 마음과 관계의 결을 알아보는 능력이 중요합니다. 그림책을 함께 읽고 하루 끝에 짧은 일기를 쓰는 시간은 아이가 보이지 않는 가치를 천천히 발견하게 하는 다정한 인문학 습관입니다.</p>
      </section>

      <div className="article-back"><a className="text-link" href="/blog">그림책 Q 목록으로 돌아가기 ←</a></div>
    </div>
  </article>
  <Invitation/>
  </>}
