import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';

export default function OpeningTrends() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <PageHeader 
          title="개업 추이" 
          subtitle="지역별, 기간별 의료기관 개업 통계를 확인할 수 있습니다"
        />
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <p>개업 추이 페이지입니다.</p>
        </div>
      </div>
    </Layout>
  );
} 