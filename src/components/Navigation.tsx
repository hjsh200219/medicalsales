'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  {
    name: '마이페이지',
    path: '/mypage'
  },
  {
    name: '설정',
    path: '/settings'
  },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
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
                  className={`flex items-center px-6 py-4 font-medium transition-colors ${
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
            </nav>
          </div>
        </div>
      )}
      
      
    </>
  );
} 