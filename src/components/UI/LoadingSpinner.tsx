'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export function LoadingSpinner({ size = 'md', message = '데이터를 불러오는 중' }: LoadingSpinnerProps) {
  // 크기에 따른 클래스 결정
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div 
        className={`${sizeClasses[size]} rounded-full border-t-blue-500 border-r-blue-500 border-b-gray-700 border-l-gray-700 animate-spin`}
      />
      
      {message && (
        <div className="mt-4 text-gray-300">
          <p className="relative">
            {message}
            <span className="absolute inline-flex">
              <span className="animate-ping1 ml-1">.</span>
              <span className="animate-ping2 ml-1">.</span>
              <span className="animate-ping3 ml-1">.</span>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

// 추가 CSS 스타일을 위한 스타일 요소
export function LoadingSpinnerStyles() {
  return (
    <style jsx global>{`
      @keyframes ping-slow1 {
        0%, 20% { opacity: 0; }
        40%, 100% { opacity: 1; }
      }
      @keyframes ping-slow2 {
        0%, 40% { opacity: 0; }
        60%, 100% { opacity: 1; }
      }
      @keyframes ping-slow3 {
        0%, 60% { opacity: 0; }
        80%, 100% { opacity: 1; }
      }
      .animate-ping1 {
        animation: ping-slow1 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
      }
      .animate-ping2 {
        animation: ping-slow2 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
      }
      .animate-ping3 {
        animation: ping-slow3 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
      }
    `}</style>
  );
} 