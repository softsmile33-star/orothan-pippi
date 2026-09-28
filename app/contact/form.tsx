'use client';
import {useState,useRef} from 'react';
import {inquiryTypes,normalizeProgram,successMessage,failureMessage} from '@/lib/inquiry-fields';
export default function ContactForm({initialProgram}:{initialProgram?:string}) {
  const [program,setProgram]=useState(normalizeProgram(initialProgram));
  const [busy,setBusy]=useState(false);
  const [result,setResult]=useState<{ok:boolean;text:string}|null>(null);
  const locked=useRef(false);
  const requestId=useRef('');
  async function submit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(locked.current || result?.ok || !e.currentTarget.reportValidity())return;
    locked.current=true;setBusy(true);setResult(null);
    const form=new FormData(e.currentTarget);
    requestId.current ||= crypto.randomUUID();
    const body=new URLSearchParams();
    for(const key of ['name','phone','email','inquiryType','organization','preferredDate','message','website'])body.set(key,String(form.get(key)||'').trim());
    body.set('privacyConsent',form.get('privacyConsent')==='true'?'true':'false');
    try {
      const response=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','Idempotency-Key':requestId.current},body});
      const data=await response.json() as {success?:boolean};
      if(!response.ok||data.success!==true)throw new Error();
      setResult({ok:true,text:successMessage});
    }catch {setResult({ok:false,text:failureMessage});}
    finally {locked.current=false;setBusy(false);}
  }
  return <form className="contact-form" onSubmit={submit}>
    <fieldset disabled={busy||result?.ok} style={{border:0,padding:0,margin:0,minWidth:0}}>
      <div className="field"><label htmlFor="inquiryType">문의 분야 *</label><select id="inquiryType" name="inquiryType" required value={program} onChange={e=>setProgram(e.target.value)}><option value="">문의 분야를 선택해 주세요</option>{inquiryTypes.map(p=><option key={p}>{p}</option>)}</select></div>
      <div className="field"><label htmlFor="name">이름 *</label><input id="name" name="name" autoComplete="name" required maxLength={60} pattern=".*\S.*"/></div>
      <div className="field"><label htmlFor="phone">연락처 *</label><input id="phone" name="phone" type="tel" autoComplete="tel" required maxLength={22} pattern="[+0-9()\s\-]{8,22}" placeholder="010-0000-0000"/></div>
      <div className="field"><label htmlFor="email">이메일 (선택)</label><input id="email" name="email" type="email" autoComplete="email" maxLength={120}/></div>
      <div className="field"><label htmlFor="organization">소속 기관·지역 (선택)</label><input id="organization" name="organization" autoComplete="organization" maxLength={120}/></div>
      <div className="field"><label htmlFor="preferredDate">희망 일정 (선택)</label><input id="preferredDate" name="preferredDate" maxLength={120} placeholder="희망 날짜나 가능한 시간대를 적어 주세요"/></div>
      <div className="field"><label htmlFor="message">문의 내용 *</label><textarea id="message" name="message" required maxLength={3000}/></div>
      <div className="hidden-trap" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off"/></div>
      <details><summary>개인정보 수집·이용 안내</summary><p className="small">수집 항목: 이름, 연락처, 문의 내용, 문의 분야, 이메일·소속 기관·지역·희망 일정(선택). 이용 목적: 상담 응대 및 프로그램 안내. 문의는 연구소의 Google Sheets 문의 DB에 저장되어 담당자가 확인합니다. 상담 종료 후 담당자가 삭제하며, 삭제 요청은 연구소 연락처로 문의해 주세요. 동의를 거부할 수 있으나 온라인 문의 접수는 제한됩니다.</p></details>
      <div className="consent" style={{marginTop:20}}><input id="privacyConsent" name="privacyConsent" type="checkbox" value="true" required/><label htmlFor="privacyConsent">개인정보 수집 및 이용에 동의합니다. (필수)</label></div>
      <button className="submit" disabled={busy||result?.ok} type="submit">{busy?'접수 중…':result?.ok?'접수 완료':'문의 내용 제출하기 →'}</button>
    </fieldset>
    {result&&<div role={result.ok?'status':'alert'} className={'form-result'+(result.ok?'':' error')}>{result.text}</div>}
  </form>;
}
