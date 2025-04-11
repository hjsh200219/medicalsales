import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  backButton?: boolean;
  onBack?: () => void;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  action,
  backButton,
  onBack
}: PageHeaderProps) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {backButton && (
            <button 
              onClick={onBack} 
              className="mr-2 p-1 rounded-full hover:bg-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        </div>
        {action && (
          <div>
            {action}
          </div>
        )}
      </div>
      {subtitle && (
        <p className="text-gray-400 text-sm">{subtitle}</p>
      )}
    </div>
  );
} 