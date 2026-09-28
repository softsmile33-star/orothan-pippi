const lessons = [
  {title:'그림책과 철학 1',subtitle:'자기다움에 대한 이야기',items:['그림책 인문학 이해와 10대 아이들의 발달단계 파악','정체성과 자존감 높이기, 강사로서의 미래를 그려보기','SNS 브랜딩의 필요성과 페르소나 만들기','AI 활용의 필요성 알아보기'],books:'오리건의 여행, 나는 강물처럼 말해요 등'},
  {title:'그림책과 철학 2',subtitle:'어떻게 살아갈 것인가: 관계',items:['관계의 어려움과 현명하게 관계 맺는 방법','각 SNS의 특징과 AI를 활용해 커리큘럼 짜는 방법','강의 제안서 만들기, 강의자료 만들기와 수업 노하우'],books:'어린왕자 그림책으로 만나다, 프레드릭, 알사탕'},
  {title:'그림책과 문학',subtitle:'말간 일상이 서사가 되는 시간',items:['문학, 특히 고전을 읽어야 하는 이유와 나의 일상이 콘텐츠가 되는 이유','나만의 콘텐츠를 정하고 벤치마킹할 계정 찾기','AI를 활용해 콘텐츠 조사하기'],books:'책의 아이, 점 등'},
  {title:'그림책과 역사',subtitle:'텍스트 너머 살아있는 시간',items:['지루한 연도 암기를 넘어 당대 사람들의 마음과 삶에 공감하는 방법','AI를 활용한 SNS 업로드 시스템 만들기: 30일치 계획해 보기'],books:'만희네 집, 비무장지대에 봄이 오면 등'},
  {title:'그림책과 명화',subtitle:'보이지 않는 것을 읽는 문해력',items:['그림책과 명화 보기를 통하여 그림 읽기의 관찰력과 상상력 키우기','AI를 활용해 실제로 SNS에 업로드해 보기: 인스타 카드뉴스'],books:'마티스의 정원, 미술관에 간 윌리 등'},
  {title:'그림책과 클래식',subtitle:'귀와 마음으로 듣는 소리',items:['그림책 속 이야기와 클래식을 연결하여 그림책을 더 깊이 이해하고 삶에 받아들이기','AI를 활용해 유튜브 숏츠와 인스타 릴스 업로드로 브랜딩하기'],books:'알록달록 오케스트라, 여름이 온다 등'},
  {title:'그림책과 글쓰기',subtitle:'나만의 문장으로 세상을 읽다',items:['그림책의 맥락 이해하기와 글을 쓰면 좋은 점','일기 쓰기와 편지 쓰기 노하우','AI를 활용한 SNS 글쓰기를 통한 브랜딩하기'],books:'리디아의 정원, 6분 소설가 하준수 등'},
  {title:'시연과 시험',subtitle:'',items:['그림책 인문학 지도사 1급 자격증 시험과 시연하기'],books:''},
];
export default function InstructorCurriculum(){return <section className="wrap content-section" aria-labelledby="curriculum-heading"><p className="eyebrow">8-SESSION CURRICULUM</p><h2 id="curriculum-heading">그림책 인문학 지도사 과정 · 8회차</h2><div className="curriculum-list">{lessons.map((lesson,index)=><article className="curriculum-row" key={lesson.title}><div className="curriculum-topic"><span className="curriculum-number">{index+1}회</span><h3>{lesson.title}</h3>{lesson.subtitle&&<p>{lesson.subtitle}</p>}</div><div className="curriculum-detail"><ul>{lesson.items.map(item=><li key={item}>{item}</li>)}</ul>{lesson.books&&<p className="curriculum-books"><strong>함께 읽는 그림책</strong><br/>{lesson.books}</p>}</div></article>)}</div></section>}
