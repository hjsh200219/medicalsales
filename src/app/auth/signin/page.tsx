'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { Suspense } from 'react';
import Link from 'next/link';

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/institutions';
  const error = searchParams.get('error');

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">        
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            {error === 'Signin' && '로그인 중 오류가 발생했습니다.'}
            {error === 'OAuthCallback' && '인증 도중 오류가 발생했습니다.'}
            {error === 'OAuthAccountNotLinked' && '이미 다른 방법으로 가입한 이메일입니다.'}
            {!['Signin', 'OAuthCallback', 'OAuthAccountNotLinked'].includes(error) && '로그인 중 오류가 발생했습니다.'}
          </div>
        )}
        
        <div className="space-y-4">
          <button 
            onClick={() => signIn('google', { callbackUrl })}
            className="w-full flex items-center justify-center px-4 py-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google로 로그인
          </button>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-400">
            이름과 이메일 이외 어떠한 정보도 저장되지 않습니다.
          </p>
          <p className="text-sm text-gray-400">
            로그인과 동시에 회원가입이 됩니다.
          </p>
          <p className="text-sm text-gray-400">
            회원 탈퇴는 <Link href="/mypage" className="text-blue-500 hover:text-blue-600">My Page</Link>에서 가능합니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Layout>
      <Suspense fallback={
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-8">로그인</h1>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      }>
        <SignInContent />
      </Suspense>
    </Layout>
  );
} 