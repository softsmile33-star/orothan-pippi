const panels = [
  ['PEOPLE', '사람을 잇는 힘', '엄마와 두 아이가 함께 그림책을 읽는 장면'],
  ['IMAGINATION', '상상하는 마음', '아이가 색연필로 상상 속 동물을 그리는 장면'],
  ['POSSIBILITY', '가능성을 여는 시선', '아이가 직접 만든 그림책을 펼쳐 보이는 장면'],
  ['PICTURE BOOK', '그림책이 만드는 하루', '가족이 그림책 속 그림을 함께 가리키는 장면'],
  ['INSIGHT', '이야기에서 찾는 나', '엄마가 읽은 책 옆에서 생각을 기록하는 장면'],
];

export default function PippiStrip() {
  return (
    <section className="wrap pippi-section" aria-label="PIPPI에 담은 다섯 가지 마음">
      <div className="pippi-strip">
        {panels.map(([word, meaning, scene], i) => (
          <div
            className="pippi-panel"
            key={word}
            role="img"
            aria-label={`${word} · ${meaning}. ${scene}`}
            style={{ backgroundPosition: `${i * 25}% center` }}
          />
        ))}
      </div>
    </section>
  );
}
