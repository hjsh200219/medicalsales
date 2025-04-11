import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Medical Sales</h1>
          <nav>
            <button className="p-2 rounded-full hover:bg-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8">
        {/* 카테고리 섹션 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">카테고리</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center transition hover:shadow-lg hover:bg-indigo-50">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                  </svg>
                </div>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 인기 제품 섹션 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">인기 제품</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400">제품 이미지</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.manufacturer}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-indigo-600">{product.price.toLocaleString()}원</span>
                    <button className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700">
                      장바구니
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 하단 네비게이션 */}
      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">홈</span>
          </Link>
          <Link href="/categories" className="flex flex-col items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-xs mt-1">카테고리</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs mt-1">검색</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">내 정보</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}

// 샘플 데이터
const categories = [
  { id: 1, name: '의약품', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { id: 2, name: '의료기기', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
  { id: 3, name: '건강식품', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { id: 4, name: '위생용품', icon: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V14m0-2.5v-2a1.5 1.5 0 013 0m0 0V14m0-2.5v-2a1.5 1.5 0 013 0' },
];

const products = [
  { id: 1, name: '마스크 100매', manufacturer: 'MedCorp', price: 15000 },
  { id: 2, name: '디지털 체온계', manufacturer: 'HealthTech', price: 45000 },
  { id: 3, name: '비타민 D 90정', manufacturer: 'NutrientLife', price: 23000 },
  { id: 4, name: '혈압 측정기', manufacturer: 'HealthTech', price: 85000 },
  { id: 5, name: '소독용 알코올', manufacturer: 'MedCorp', price: 5000 },
  { id: 6, name: '멸균 거즈', manufacturer: 'SafeCare', price: 12000 },
];
