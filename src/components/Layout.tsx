import Navigation from '@/components/UI/Navigation';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 pb-16 md:pb-0">
      <Script src="/xlsx.full.min.js" strategy="afterInteractive" />
      {/* 헤더 */}
      <header className="bg-blue-500 text-white shadow-lg">
        <div className="container mx-auto px-2 py-2 flex justify-between items-center">
          <Link href="/institutions" className="text-2xl font-bold hover:text-white/90 transition-colors">
            <Image
              src="/images/ms_logo.png" 
              alt="Medical Sales" 
              width={180}
              height={25}
              className="h-6 w-auto ml-2 md:ml-4"
              priority
            />
          </Link>
          <div className="flex items-center space-x-2">
            <Navigation />
          </div>
        </div>
      </header>

      {children}
    </div>
  );
} 