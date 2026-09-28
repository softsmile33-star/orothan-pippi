import {Invitation} from '../../shared';

export const metadata={
  title:'아이에게 꽃길만 걷게 해주고 싶나요? 삶의 다섯 가지 맛 | 그림책 Q',
  description:'박완서의 그림책 굴비 한 번 쳐다보고를 통해 아이가 짠맛, 매운맛, 쓴맛, 신맛, 단맛을 경험하며 자기 삶을 살아갈 힘을 생각합니다.'
};

const tastes=[
  ['짠맛','눈물과 노력으로 배우는 맛','기다림과 노력이 힘들어 보인다는 이유로 부모가 모든 일을 대신하면 아이는 자기 힘으로 이루어 낸 기쁨을 만나기 어렵습니다. “힘들었구나. 그래도 끝까지 해냈네”라고 과정과 마음을 알아봐 주세요.'],
  ['매운맛','용기와 도전을 배우는 맛','갈등이 생길 때마다 어른이 먼저 해결해 주기보다 아이가 자기 마음을 말하고 선택할 기회를 조금씩 열어 주세요. 안전한 경험 안에서 매운맛을 지나 본 아이는 관계를 풀어가는 용기를 배웁니다.'],
  ['쓴맛','실패 뒤 다시 시작하는 맛','낮아진 점수나 경기의 패배, 친구의 거절은 쓰지만 삶에서 사라지지 않습니다. 실패한 감정을 충분히 받아 준 뒤 “다음에는 어떻게 해볼까?”라고 물으면 아이는 실패를 자기 정체성으로 여기지 않게 됩니다.'],
  ['신맛','낯선 세계를 만나는 맛','새로운 친구와 학년, 처음 가는 장소는 기대와 긴장을 함께 데려옵니다. 아이의 속도를 존중하면서 감당할 수 있는 작은 도전을 제안해 주세요. 낯선 경험은 호기심을 깨우고 세상을 넓힙니다.'],
  ['단맛','다시 일어설 힘을 주는 사랑의 맛','따뜻한 말 한마디와 포옹, 함께 웃고 책 읽는 시간은 어려움을 견디게 하는 마음의 자리입니다. 사랑의 단맛을 충분히 경험한 아이는 힘든 순간에도 “나는 혼자가 아니야”라고 생각할 수 있습니다.']
];

export default function FiveTastesForChildren(){return <>
  <article className="article-page">
    <header className="article-header wrap">
      <p className="breadcrumb"><a href="/">홈</a> / <a href="/blog">그림책 Q</a></p>
      <p className="eyebrow">PICTURE BOOK Q</p>
      <h1>아이에게 꽃길만<br/>걷게 해주고 싶나요?</h1>
      <p className="article-intro">아이 앞에 놓인 돌멩이를 모두 치워주고 싶은 것이 부모 마음입니다. 그러나 달콤함만으로는 자기 삶의 맛을 만들 수 없습니다. 《굴비 한 번 쳐다보고》를 읽으며 아이에게 필요한 다섯 가지 삶의 맛을 생각해 봅니다.</p>
    </header>

    <div className="article-body wrap">
      <section>
        <figure className="article-hero-image">
          <img src="/images/gulbi-feature.png" alt="굴비 한 번 쳐다보고 그림책과 함께 삶의 다섯 가지 맛을 이야기하는 오롯한 삐삐 대표"/>
          <figcaption>그림책 한 권에서 시작하는 삶의 다섯 가지 맛 이야기</figcaption>
        </figure>
      </section>

      <section>
        <h2>아이에게 좋은 일만 생기면 좋겠지만</h2>
        <p>부모라면 누구나 아이가 상처받지 않고, 실패하지 않고, 좋은 사람만 만나 행복하게 살아가기를 바랍니다. 저 역시 두 딸 앞에 놓인 돌멩이를 먼저 치워주고 싶은 순간이 많았습니다.</p>
        <p>그러나 아이의 삶에서 기다림과 속상함, 실패와 갈등을 모두 없애 줄 수 있을까요? 단맛만 알고 자란 아이는 어느 날 갑자기 찾아온 쓴맛 앞에서 쉽게 흔들릴 수 있습니다. 필요한 것은 어려움이 전혀 없는 길이 아니라, <strong>감당할 수 있는 경험을 지나 자기 힘으로 다시 일어서는 법</strong>입니다.</p>
        <figure className="article-insight article-book-cover">
          <img src="/images/gulbi-02.png" alt="박완서 글 이종균 그림 굴비 한 번 쳐다보고 표지"/>
          <figcaption>박완서 글·이종균 그림 《굴비 한 번 쳐다보고》</figcaption>
        </figure>
      </section>

      <section>
        <h2>굴비를 바라보며 밥을 먹던 자린고비</h2>
        <p>옛이야기 속 자린고비는 반찬값을 아끼려고 굴비를 천장에 매달아 두고 바라보며 밥을 먹었다고 하지요. 아들이 굴비를 두 번 쳐다보자 너무 짜게 먹는다며 나무랐다는 우스갯소리도 전해집니다.</p>
        <figure className="article-hero-image">
          <img src="/images/gulbi-03.jpg" alt="굴비를 바라보며 밥을 먹는 자린고비 이야기 그림"/>
          <figcaption>익숙한 자린고비 이야기는 세 아들의 삶으로 이어집니다.</figcaption>
        </figure>
        <p>박완서 작가는 여기서 이야기를 멈추지 않고 그 아들들의 삶을 상상합니다. 아버지가 세상을 떠난 뒤 첫째는 물려받은 땅에서 농사를 짓고, 둘째는 소리를 찾아 떠나며, 셋째는 뛰어난 눈썰미로 그림을 그립니다. 그런데 정성을 들인 농작물과 노래와 그림에는 이상하게도 사람을 끌어당기는 맛이 없었습니다.</p>
      </section>

      <section>
        <h2>세 아들에게 부족했던 것은 삶의 여러 맛이었습니다</h2>
        <p>아버지가 자식들에게 주고 싶었던 것은 굶지 않을 재산과 재능이었을 것입니다. 그러나 삶은 한 가지 경험만으로 깊어지지 않습니다. 눈물로 배운 기다림, 관계를 위해 내딛는 용기, 실패 뒤의 재도전, 낯선 세계를 향한 호기심, 다시 돌아와 쉴 수 있는 사랑이 함께 섞일 때 비로소 한 사람만의 맛이 생깁니다.</p>
        <figure className="article-insight article-tall-photo">
          <img src="/images/gulbi-04.jpg" alt="굴비 한 번 쳐다보고 그림책 속표지"/>
          <figcaption>세 아들의 새로운 이야기가 시작되는 속표지</figcaption>
        </figure>
      </section>

      <section>
        <p className="eyebrow">FIVE TASTES OF LIFE</p>
        <h2>아이가 살아가며 만날 다섯 가지 맛</h2>
        <div className="taste-list">{tastes.map(([name,meaning,body],i)=><div className="taste-note" key={name}>
          <span>{String(i+1).padStart(2,'0')}</span>
          <div><h3>{name} <small>{meaning}</small></h3><p>{body}</p></div>
        </div>)}</div>
      </section>

      <section className="question-box">
        <p className="eyebrow">QUESTIONS FOR TODAY</p>
        <h2>책을 덮은 뒤 아이와 나눌 질문</h2>
        <ol>
          <li>요즘 네가 자주 느끼는 삶의 맛은 어떤 맛일까?</li>
          <li>힘든 일을 지나고 나서 새롭게 알게 된 것이 있니?</li>
          <li>우리 가족에게 지금 더 필요한 맛은 무엇일까?</li>
        </ol>
        <p>정답을 정해 두고 묻기보다 아이가 자기 경험에 이름을 붙이도록 기다려 주세요. 말로 풀어내는 시간 자체가 삶의 여러 맛을 천천히 소화하는 연습입니다.</p>
      </section>

      <section>
        <h2>부모는 삶의 맛을 없애는 사람이 아닙니다</h2>
        <p>부모의 역할은 아이 앞의 모든 어려움을 없애는 것이 아니라, 아이가 감당할 수 있는 삶의 맛을 경험하고 자기 힘으로 소화하도록 곁에서 지켜주는 일일지 모릅니다.</p>
        <p><strong>단맛뿐 아니라 짠맛, 매운맛, 쓴맛과 신맛까지 느껴 본 아이가 자기만의 삶의 맛을 만들어갑니다.</strong> 눈물은 부끄럽지 않고, 실패는 끝이 아니며, 낯섦은 새로운 세계의 입구라는 사실을 함께 확인해 주세요.</p>
        <figure className="article-insight article-tall-photo">
          <img src="/images/gulbi-05.jpg" alt="굴비 한 번 쳐다보고 그림책 뒤표지"/>
          <figcaption>“맛을 알아야 맛을 내지!”</figcaption>
        </figure>
      </section>

      <section className="activity-panel">
        <p className="eyebrow">READ & TALK</p>
        <h2>그림책 독후활동지</h2>
        <p>다섯 가지 맛을 아이의 경험과 연결해 볼 수 있도록 질문을 담았습니다. 그림책을 함께 읽은 뒤 천천히 대화를 이어가 보세요.</p>
        <a className="outline-button" href="https://drive.google.com/file/d/1794nn4nkC_jMtWAuUvrrhgtvITvB8-c6/view?usp=sharing" target="_blank" rel="noreferrer">독후활동지 보기 ↗</a>
      </section>

      <div className="article-back"><a className="text-link" href="/blog">그림책 Q 목록으로 돌아가기 ←</a></div>
    </div>
  </article>
  <Invitation/>
  </>}
