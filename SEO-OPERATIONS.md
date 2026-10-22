# 기술 SEO 운영 안내

## 운영 환경
- 운영 소스: softsmile33-star/orothan-pippi, main
- 프레임워크: Next.js 16 App Router. 기존 동적 slug 및 FAQ 경로 유지.
- 기준 도메인: https://www.orothan-pippi.com
- 공개 페이지 18개: lib/seo-pages.json이 메타데이터와 사이트맵의 공통 목록입니다.
- 기존 화면의 JSX, 스타일, 이미지 파일, 메뉴와 폼 처리 코드는 유지합니다.

## 적용 내용
- 페이지마다 고유한 title, description, 절대 canonical, Open Graph 및 Twitter Card.
- 대표 이미지는 실제 기존 이미지입니다. 새 1200×630 이미지 생성이나 기존 이미지 변형은 하지 않았습니다.
- 홈: EducationalOrganization, WebSite, WebPage.
- 하위 페이지: WebPage, BreadcrumbList. 기존 홈/블로그/FAQ 탐색 구조와 현재 페이지 제목을 사용합니다.
- Course: 초등 수업, 엄마와 아이 워크숍, 지도사 과정 3개. 가격·평점·후기·일정을 생성하지 않습니다.
- sameAs는 기존 사이트의 실제 소셜 링크를 재사용합니다. 인스타그램과 네이버는 현재 연결된 게시물 URL입니다.
- 네이버와 Google 인증 태그 유지.
- /sitemap.xml, /robots.txt, /llms.txt. 관리자와 API는 사이트맵에서 제외하고 robots에 수집 제외 지정. 관리자 noindex도 유지합니다. robots는 접근 제어 수단이 아닙니다.

## 방문자 분석
기존 중복 추적 스크립트는 없습니다. @vercel/analytics/next 공식 컴포넌트를 루트 레이아웃에서 한 번 실행합니다. 별도 추적 ID나 실행용 환경변수는 필요하지 않습니다.
Vercel 프로젝트의 Analytics에서 Enable을 켜야 수집 경로가 활성화됩니다. 현재 연결 도구는 팀 접근 권한이 없고 브라우저도 로그인이 필요하므로 대시보드의 수집 활성화는 별도 확인 대상입니다.
관리자/API 이벤트는 제외하며 URL의 query와 hash도 제거합니다.

## 검증
- node scripts/verify-seo.mjs baseline: 수정 전 운영 페이지의 보이는 HTML 구조를 저장합니다.
- node scripts/verify-seo.mjs verify http://localhost:4173: 로컬 운영 빌드 검증.
- node scripts/verify-seo.mjs verify: 실제 운영 URL 검증.
- 검증 결과와 기준 HTML 해시는 프로젝트 부모 폴더의 seo-*.json에 저장됩니다.
- 기존 코드와 화면의 불변 여부를 검사하며 실제 문의·후기를 제출하지 않습니다.

## 검색 도구 제출
네이버와 Google Search Console에 https://www.orothan-pippi.com/sitemap.xml 을 제출할 수 있습니다.
기술 설정 개선은 검색 노출이나 순위를 보장하지 않습니다.
