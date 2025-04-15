# Assist Sales PWA

의료 판매 앱을 위한 Progressive Web App(PWA)입니다. Tailwind CSS와 TypeScript로 개발되었으며, Vercel에 serverless로 배포 가능합니다.

## 기술 스택

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- PWA (next-pwa)
- Prisma (ORM)
- PostgreSQL 데이터베이스

## 주요 기능

- 모바일 친화적인 반응형 디자인
- 오프라인 지원 (PWA)
- 앱 설치 가능 (Add to Home Screen)
- 빠른 로딩 속도
- 공공 데이터 API 연동 및 DB 저장
- 주소 기반 위경도 변환 (카카오맵 API)
- 실시간 DB 저장 진행률 표시
- 다양한 필터링 옵션 (등록일/생성일/특정 날짜 기준)

## 설정 방법

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 값들을 설정하세요:

```
# 데이터베이스 연결 정보
DATABASE_URL="postgresql://..."

# 공공 데이터 포털 API 키
GOV_SERVICE_KEY="..."
NEXT_PUBLIC_HOSPITAL_INFO_ENDPOINT="https://..."
NEXT_PUBLIC_PHARMACY_INFO_ENDPOINT="https://..."

# 카카오 API 키 (위경도 변환용)
KAKAO_API_KEY="..."
```

## 로컬 개발 환경 설정

```bash
# 의존성 설치
npm install

# 데이터베이스 마이그레이션
npx prisma migrate dev

# 개발 서버 실행
npm run dev
```

## 공공 데이터 관리

본 앱은 공공 데이터 포털에서 제공하는 병원 및 약국 정보를 가져와 관리합니다:

1. **데이터 가져오기**: 공공 데이터 API를 통해 최신 데이터를 가져옵니다.
2. **데이터 필터링**: 등록일/생성일/특정 날짜 기준으로 필터링 가능합니다.
3. **DB 저장**: 청크 단위로 데이터를 저장하여 실시간 진행률을 확인할 수 있습니다.
4. **위치 정보 변환**: 주소 정보를 카카오맵 API를 통해 위경도로 변환합니다.

## 기능 상세

### 위경도 변환

주소가 있지만 좌표 정보가 없는 경우, 카카오맵 API를 사용하여 자동으로 변환합니다. 변환 실패 시 주소의 뒷부분을 점진적으로 제거하며 재시도합니다.

### 데이터 필터링

3가지 필터링 옵션을 제공합니다:
- 등록일 기준: 의료기관 등록일을 기준으로 새로운 데이터 필터링
- 생성일 기준: DB 레코드 생성일을 기준으로 필터링
- 특정 날짜 기준: 사용자가 선택한 날짜 이후의 데이터만 필터링

### 실시간 진행률

대용량 데이터 처리 시 청크 단위로 나누어 처리하며 실시간 진행률을 제공합니다.

## Vercel에 배포하기

1. [Vercel](https://vercel.com)에 계정 생성 및 로그인
2. GitHub, GitLab 또는 BitBucket에 리포지토리 푸시
3. Vercel 대시보드에서 "New Project" 클릭
4. 리포지토리 선택 후 "Import" 클릭
5. 다음 설정을 확인:
   - Framework Preset: Next.js
   - Build Command: 기본값 사용
   - Output Directory: 기본값 사용
   - Environment Variables: 필요한 환경 변수 설정
6. "Deploy" 버튼 클릭

## 라이선스

MIT License

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
