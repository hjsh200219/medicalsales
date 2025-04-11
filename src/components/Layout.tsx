import Navigation from '@/components/Navigation';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* 헤더 */}
      <header className="bg-blue-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/medical-institutions" className="text-2xl font-bold hover:text-white/90 transition-colors">
            Medical Sales
          </Link>
          <Navigation />
        </div>
      </header>

      {children}
    </div>
  );
} 