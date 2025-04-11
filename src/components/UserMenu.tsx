'use client';

import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-300 animate-pulse"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <button 
        onClick={() => signIn()}
        className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md border border-blue-100 hover:bg-blue-50 transition-colors"
      >
        로그인
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-blue-300 overflow-hidden">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || '사용자'}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold">
              {session.user.name?.charAt(0) || '?'}
            </div>
          )}
        </div>
        <span className="text-white">{session.user.name}</span>
      </button>
      
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 md:right-0 md:top-full">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium">{session.user.name}</p>
            <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
          </div>
          <Link 
            href="/mypage"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            마이페이지
          </Link>
          <Link 
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            설정
          </Link>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              signOut({ callbackUrl: '/medical-institutions' });
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
} 