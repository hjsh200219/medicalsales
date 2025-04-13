import Layout from '@/app/layout';
import PageHeader from '@/components/UI/PageHeader';

export default function Settings() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <PageHeader 
            title="설정" 
          />
        </div>
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <p>설정 페이지입니다.</p>
        </div>
      </div>
    </Layout>
  );
} 