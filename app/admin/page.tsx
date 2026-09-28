const sheetUrl='https://docs.google.com/spreadsheets/d/1ELb5ZVdctIBme8B_Uh3diCLD4wkRUinyf0Qvi-OmSA4/edit';

export default function Admin(){
  return <section className="wrap section">
    <p className="eyebrow">PRIVATE · INQUIRY DESK</p>
    <h1>연구소 문의·후기 관리</h1>
    <p>문의와 강의 후기는 연구소 구글 시트에서 확인합니다. 접근 권한이 있는 구글 계정으로 열어 주세요.</p>
    <div className="empty-note" style={{marginTop:30}}>
      <h2>문의 DB</h2>
      <p>새로 접수된 문의를 확인하고 상담 상태와 답변 메모를 기록하세요.</p>
      <a className="text-link" href={sheetUrl} target="_blank" rel="noopener noreferrer">구글 문의 시트 열기 ↗</a>
    </div>
    <div className="empty-note" style={{marginTop:20}}>
      <h2>강의 후기</h2>
      <p>같은 시트의 ‘강의 후기’ 탭에서 접수된 후기를 확인하세요. 공개 동의와 내용을 확인한 뒤 소개 여부를 결정할 수 있습니다.</p>
      <a className="text-link" href={sheetUrl} target="_blank" rel="noopener noreferrer">구글 후기 시트 열기 ↗</a>
    </div>
  </section>;
}
