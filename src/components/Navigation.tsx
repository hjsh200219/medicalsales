'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

const menuItems = [
  {
    name: '의료기관 조회',
    path: '/medical-institutions'
  },
  {
    name: '개업 추이',
    path: '/opening-trends'
  },
  {
    name: '고객 관리',
    path: '/customer-management'
  },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  
  // 모바일 메뉴가 열려있을 때 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // 사용자 메뉴 컴포넌트 (데스크톱용)
  const renderUserMenu = () => {
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
          className="px-4 py-1 bg-blue-700 text-white font-medium rounded-md  hover:bg-blue-800 transition-colors"
        >
          Login
        </button>
      );
    }

    return (
      <div className="relative">
        <button
          onClick={toggleUserMenu}
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
        </button>
        
        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-blue-300 rounded-md shadow-lg py-1 z-10 md:right-0 md:top-full">
            <div className="px-4 py-2 border-b border-gray-700">
              <p className="text-sm text-gray-700 font-medium">{session.user.name}</p>
              <p className="text-xs text-gray-700 truncate">{session.user.email}</p>
            </div>
            <Link 
              href="/mypage"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500"
              onClick={() => setIsUserMenuOpen(false)}
            >
              My Page
            </Link>
            <Link 
              href="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500"
              onClick={() => setIsUserMenuOpen(false)}
            >
              Settings
            </Link>
            <button
              onClick={() => {
                setIsUserMenuOpen(false);
                signOut({ callbackUrl: '/medical-institutions' });
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-blue-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  };

  // 모바일용 사용자 메뉴 렌더링
  const renderMobileUserMenu = () => {
    if (status === 'loading') {
      return (
        <div className="flex justify-center mt-6 pt-4 border-t border-blue-400">
          <div className="w-8 h-8 rounded-full bg-blue-300 animate-pulse"></div>
        </div>
      );
    }

    if (!session) {
      return (
        <div className="flex justify-center mt-6 pt-4 border-t border-blue-400">
          <button 
            onClick={() => signIn()}
            className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md border border-blue-100 hover:bg-blue-50 transition-colors"
          >
            Login
          </button>
        </div>
      );
    }

    return (
      <div className="mt-6 pt-4 border-t border-blue-400">        
        {/* 사용자 메뉴 항목 */}
        <ul className="mt-3">
          <li className="mb-1">
            <Link 
              href="/mypage"
              className="flex items-center p-3 rounded-lg text-white hover:bg-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Page
            </Link>
          </li>
          <li className="mb-1">
            <Link 
              href="/settings"
              className="flex items-center p-3 rounded-lg text-white hover:bg-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Settings
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                signOut({ callbackUrl: '/medical-institutions' });
              }}
              className="w-full flex items-center p-3 rounded-lg text-white hover:bg-blue-600 text-left"
            >
              Logout
            </button>
          </li>
        </ul>

        {/* 사용자 프로필 정보 */}
        <div className="px-4 py-3 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-300 overflow-hidden">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || '사용자'}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold">
                {session.user.name?.charAt(0) || '?'}
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-white font-medium">{session.user.name}</p>
            <p className="text-white/80 text-xs truncate">{session.user.email}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* 데스크톱 탭 네비게이션 - 768px 이상에서만 표시 */}
      <div className="hidden md:block">
        <div className="container mx-auto">
          <nav className="flex">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`flex items-center px-4 py-2 font-medium transition-colors ${
                    isActive 
                      ? 'text-white border-b-2 border-white font-bold' 
                      : 'text-white/80 hover:text-white hover:bg-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 햄버거 메뉴 버튼 - 모바일에서만 표시 */}
      <button 
        className="md:hidden p-2 rounded-full hover:bg-blue-600 focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="메뉴 열기"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* 사용자 메뉴 - 데스크톱에서만 표시 */}
      <div className="hidden md:block">
        {renderUserMenu()}
      </div>
      
      {/* 모바일 사이드 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="fixed top-0 right-0 h-full w-64 bg-blue-500 shadow-lg transform transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-blue-400">
              <h2 className="text-xl font-bold text-white">메뉴</h2>
              <button 
                className="p-2 rounded-full hover:bg-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-4">
              <ul>
                {menuItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.path} className="mb-2">
                      <Link 
                        href={item.path}
                        className={`flex items-center p-3 rounded-lg ${
                          isActive 
                            ? 'bg-blue-600 text-white font-medium' 
                            : 'text-white hover:bg-blue-600'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              
              {/* 사용자 메뉴 추가 - 모바일용 */}
              {renderMobileUserMenu()}
            </nav>
          </div>
        </div>
      )}
    </>
  );
} 