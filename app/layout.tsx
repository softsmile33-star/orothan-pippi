import SocialDock from './social-dock';
import type { Metadata } from 'next';
import Navigation from './navigation';
import './globals.css';
export const metadata:Metadata={title:{default:'오롯한 삐삐 | 그림책 인문학 연구소',template:'%s | 오롯한 삐삐'},description:'그림책으로 꿈을 짓고 인문학으로 삶의 무늬를 만들다. 초등 그림책 인문학, 엄마와 아이 워크숍, 지도사 과정과 기관 강의.',robots:{index:false,follow:false},icons:{icon:'/images/logo.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body><a className="skip" href="#main">본문 바로가기</a><Navigation/><main id="main">{children}</main><footer className="business-footer"><div className="wrap"><p className="business-details"><span>상호: 오롯한 삐삐 그림책 인문학 연구소</span><span>대표: 박향의</span><span>사업자 등록번호: 735-18-02453</span></p><p className="business-details"><a href="tel:01022418301">TEL: 010-2241-8301</a><a href="mailto:catching31@naver.com">E-Mail: catching31@naver.com</a></p><p className="business-copyright">© 2026 오롯한 삐삐 그림책 인문학 연구소. ALL RIGHTS RESERVED.</p></div></footer><SocialDock/></body></html>}
