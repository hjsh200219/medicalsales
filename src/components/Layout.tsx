import Navigation from '@/components/Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* 헤더 */}
      <header className="bg-blue-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-1 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Medical Sales</h1>
          <Navigation />
        </div>
      </header>

      {children}
    </div>
  );
} 