# Assist Sales PWA

의료 판매 앱을 위한 Progressive Web App(PWA)입니다. Tailwind CSS와 TypeScript로 개발되었으며, Vercel에 serverless로 배포 가능합니다.

## 기술 스택

- Next.js 14
- TypeScript
- Tailwind CSS
- PWA (next-pwa)

## 기능

- 모바일 친화적인 반응형 디자인
- 오프라인 지원 (PWA)
- 앱 설치 가능 (Add to Home Screen)
- 빠른 로딩 속도

## 로컬 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## Vercel에 배포하기

1. [Vercel](https://vercel.com)에 계정 생성 및 로그인
2. GitHub, GitLab 또는 BitBucket에 리포지토리 푸시
3. Vercel 대시보드에서 "New Project" 클릭
4. 리포지토리 선택 후 "Import" 클릭
5. 다음 설정을 확인:
   - Framework Preset: Next.js
   - Build Command: 기본값 사용
   - Output Directory: 기본값 사용
   - Environment Variables: 필요한 경우 설정
6. "Deploy" 버튼 클릭

## 직접 Vercel CLI로 배포하기

```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 프로젝트 배포
vercel
```

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
