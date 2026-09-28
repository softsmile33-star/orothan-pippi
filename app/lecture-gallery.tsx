'use client';
import {useRef,useState} from 'react';
const photos=[
  ['lecture-03.jpg','함께 듣고 질문하는 북토크 현장'],
  ['lecture-07.jpg','참여자들과 이야기를 나누는 기관 강의'],
  ['lecture-01.jpg','그림책 장면을 함께 살펴보는 강의'],
  ['lecture-02.jpg','참여자들과 읽기와 일기 이야기를 나누는 북토크'],
  ['lecture-04.jpg','아이의 질문을 듣는 그림책 수업'],
  ['lecture-05.jpg','그림책과 함께하는 꿈 인문학 수업'],
  ['lecture-06.jpg','고전과 함께하는 그림책 인문학'],
];
export default function LectureGallery(){const dialog=useRef<HTMLDialogElement>(null);const [selected,setSelected]=useState(0);return <section className="wrap content-section lecture-gallery" id="lecture-gallery"><p className="eyebrow">MOMENTS TOGETHER</p><h2>강의와 북토크의 순간들</h2><p>그림책을 펼치고, 이야기를 나누고, 서로의 질문을 만납니다. 사진을 누르면 크게 볼 수 있어요.</p><div className="lecture-photo-grid">{photos.map(([file,caption],i)=><button type="button" className={i<2?"lecture-photo lecture-featured":"lecture-photo"} key={file} onClick={()=>{setSelected(i);dialog.current?.showModal()}} aria-label={`${caption} · 사진 크게 보기`}><img src={`/images/${file}`} alt={caption} loading="lazy"/><span>{caption}<span aria-hidden="true"> ↗</span></span></button>)}</div><dialog className="photo-dialog" ref={dialog} aria-label="강의 현장 사진" onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close()}}><button type="button" className="photo-close" onClick={()=>dialog.current?.close()} autoFocus>닫기 ×</button><img src={`/images/${photos[selected][0]}`} alt={photos[selected][1]}/><p>{photos[selected][1]}</p></dialog></section>}
