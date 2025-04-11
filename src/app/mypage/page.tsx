import Layout from '@/components/Layout';

export default function MyPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p>마이페이지입니다.</p>
        </div>
      </div>
    </Layout>
  );
} 