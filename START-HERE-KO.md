# 오롯한 삐삐 홈페이지 소스

2026-09-28 최신 게시본(v34)입니다.
소스 버전: 3ed38dd3ec0b9d9c45e10ec6f4d81dd7a0bfb348

## 포함 내용
홈페이지 전체 코드, 블로그 글, 이미지, 스타일, 패키지 잠금 파일, 데이터베이스 스키마와 마이그레이션.
최근 추가한 그림책 강사 수업 카드와 초록색 안내 영역의 문구 수정/보조 문장 삭제가 포함되어 있습니다.
실제 환경변수, 비밀번호, .git 이력, node_modules, 빌드 결과, 로컬 DB, 문의 데이터는 포함하지 않았습니다.

## GitHub에 보관하기
1. ZIP을 풀고 GitHub 저장소에 폴더 안의 파일을 올립니다.
2. 우선 비공개 저장소를 권장합니다. 이미지와 글도 저장소에 포함됩니다.
3. .env.example, .dev.vars.example은 빈 설정 예시이며 실제 비밀값을 커밋하면 안 됩니다.

## Vercel 이전 시 중요 사항
이 ZIP은 현재 운영 중인 Cloudflare Workers / Vinext 원본입니다.
Vercel 즉시 배포용으로 변환된 패키지가 아닙니다. GitHub 업로드만으로 Vercel에서 모든 기능이 작동하지 않습니다.

이전 작업에는 다음이 필요합니다.
- package.json의 dev/build/start를 Next.js 실행 방식으로 전환하고 Next.js 빌드를 검증합니다.
- cloudflare:workers를 참조하는 lib/inquiries.ts, db/index.ts, app/api/inquiry/route.ts의 환경변수 및 DB 접근을 Vercel 환경으로 옮깁니다.
- Cloudflare D1에 의존하는 문의/후기/관리자 기능과 중복 제출 방지를 지원할 영구 데이터베이스를 마련하고 스키마 및 필요한 데이터를 이전합니다.
- GOOGLE_APPS_SCRIPT_WEB_APP_URL, ADMIN_TOKEN을 Vercel 환경변수로 별도 등록합니다. 실제 값은 이 ZIP에 없습니다.
- 문의 폼 → Google Sheets 저장, 중복 제출 방지, 관리자 인증, 후기 기능을 테스트한 후 배포합니다.
- 기존 Google Sheets 문의 DB와 Cloudflare 운영 데이터는 이 소스 ZIP에 복사되지 않습니다.

이 작업에서는 GitHub 업로드, Vercel 배포, 기존 홈페이지의 호스팅 변경을 실행하지 않았습니다.
