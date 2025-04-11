import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';

export default function MedicalInstitutions() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <PageHeader 
          title="의료기관 조회" 
          subtitle="지역별 의료기관 정보를 검색하고 조회할 수 있습니다"
        />
        {/* 검색 필터 */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          </div>
        </div>
      </div>
    </Layout>
  );
}

