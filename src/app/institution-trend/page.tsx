'use client';

import Layout from '@/components/Layout';
import PageHeader from '@/components/UI/PageHeader';
import TrendDashboard from '@/components/Institution/TrendDashboard';

export default function InstitutionTrend() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <PageHeader 
            title="의료기관 개업 추이" 
          />
        </div>
        
        {/* 트렌드 대시보드 */}
        <TrendDashboard />
      </div>
    </Layout>
  );
} 