'use client';
import {useRef,useState} from 'react';

export default function ReviewForm(){
  const [busy,setBusy]=useState(false);
  const [result,setResult]=useState<{ok:boolean;text:string}|null>(null);
  const locked=useRef(false);
  const requestId=useRef('');

  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(locked.current||result?.ok||!e.currentTarget.reportValidity())return;
    locked.current=true;setBusy(true);setResult(null);
    const form=new FormData(e.currentTarget);
    requestId.current ||= crypto.randomUUID();
    const payload={
      id:requestId.current,
      name:String(form.get('name')||'').trim(),
      lecture:String(form.get('lecture')||'').trim(),
      organization:String(form.get('organization')||'').trim(),
      rating:Number(form.get('rating')),
      review:String(form.get('review')||'').trim(),
      publishConsent:form.get('publishConsent')==='true',
      privacyConsent:form.get('privacyConsent')==='true',
      website:String(form.get('website')||'')
    };
    try{
      const response=await fetch('/api/reviews',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const data=await response.json() as {error?:string};
      if(!response.ok)throw new Error(data.error||'후기를 저장하지 못했습니다.');
      setResult({ok:true,text:'소중한 후기를 남겨주셔서 감사합니다. 확인 후 공개 동의한 후기만 홈페이지에 소개하겠습니다.'});
    }catch(error){setResult({ok:false,text:error instanceof Error?error.message:'후기를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.'});}
    finally{locked.current=false;setBusy(false);}
  }

  return <form className="contact-form review-form" onSubmit={submit}>
    <fieldset disabled={busy||result?.ok} style={{border:0,padding:0,margin:0,minWidth:0}}>
      <div className="field"><label htmlFor="review-name">이름 또는 닉네임 *</label><input id="review-name" name="name" required maxLength={60} pattern=".*\S.*" placeholder="홈페이지에 표시해도 되는 이름을 적어 주세요"/></div>
      <div className="field"><label htmlFor="review-lecture">참여한 강의명 *</label><input id="review-lecture" name="lecture" required maxLength={120} pattern=".*\S.*" placeholder="예: 그림책 인문학 부모교육"/></div>
      <div className="field"><label htmlFor="review-organization">기관·지역 (선택)</label><input id="review-organization" name="organization" maxLength={120} placeholder="예: ○○도서관, 서울"/></div>
      <div className="field"><label htmlFor="review-rating">강의 만족도 *</label><select id="review-rating" name="rating" required defaultValue=""><option value="" disabled>만족도를 선택해 주세요</option><option value="5">★★★★★ 매우 만족</option><option value="4">★★★★ 만족</option><option value="3">★★★ 보통</option><option value="2">★★ 아쉬움</option><option value="1">★ 매우 아쉬움</option></select></div>
      <div className="field"><label htmlFor="review-text">강의 후기 *</label><textarea id="review-text" name="review" required minLength={10} maxLength={2000} placeholder="기억에 남은 내용이나 강의 후 달라진 생각을 자유롭게 적어 주세요."/></div>
      <div className="hidden-trap" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off"/></div>
      <details><summary>후기 및 개인정보 이용 안내</summary><p className="small">수집 항목: 이름 또는 닉네임, 참여 강의명, 기관·지역(선택), 만족도, 후기. 이용 목적: 강의 품질 개선과 후기 확인. 후기는 바로 공개되지 않으며, 공개에 동의한 내용만 담당자가 확인한 뒤 홈페이지에 소개할 수 있습니다. 삭제 요청은 연구소로 문의해 주세요.</p></details>
      <div className="consent" style={{marginTop:20}}><input id="publishConsent" name="publishConsent" type="checkbox" value="true"/><label htmlFor="publishConsent">작성한 후기를 홈페이지에 소개하는 것에 동의합니다. (선택)</label></div>
      <div className="consent" style={{marginTop:14}}><input id="reviewPrivacyConsent" name="privacyConsent" type="checkbox" value="true" required/><label htmlFor="reviewPrivacyConsent">후기 확인을 위한 개인정보 수집 및 이용에 동의합니다. (필수)</label></div>
      <button className="submit" type="submit" disabled={busy||result?.ok}>{busy?'후기 저장 중…':result?.ok?'후기 접수 완료':'강의 후기 남기기 →'}</button>
    </fieldset>
    {result&&<div role={result.ok?'status':'alert'} className={'form-result'+(result.ok?'':' error')}>{result.text}</div>}
  </form>;
}
