import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';

export default function Settings() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <PageHeader 
          title="설정" 
          subtitle="앱 설정 및 사용자 환경을 관리할 수 있습니다"
        />
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <p>설정 페이지입니다.</p>
        </div>
      </div>
    </Layout>
  );
} 