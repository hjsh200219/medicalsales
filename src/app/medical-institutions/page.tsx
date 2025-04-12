'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { InstitutionsList } from '@/components/InstitutionsList';
import { SearchFilter } from '@/components/InstitutionFilter';
import { SerializedInstitution } from '@/types/institution';

export default function MedicalInstitutions() {
  const [allInstitutions, setAllInstitutions] = useState<SerializedInstitution[]>([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState<SerializedInstitution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // 기본값 (lg 화면)
  
  // 화면 크기에 따라 페이지당 표시 아이템 수 조정
  useEffect(() => {
    function handleResize() {
      // 모바일 화면 (sm)
      if (window.innerWidth < 768) {
        setItemsPerPage(6);
      } 
      // 태블릿 화면 (md)
      else if (window.innerWidth < 1024) {
        setItemsPerPage(10);
      } 
      // 데스크탑 화면 (lg)
      else {
        setItemsPerPage(12);
      }
    }

    // 초기 로드 시 실행
    handleResize();
    
    // 화면 크기 변경 시 실행
    window.addEventListener('resize', handleResize);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 필터링 결과가 변경되면 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredInstitutions]);

  // 페이지 변경 처리
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 상단으로 스크롤
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 데이터를 가져오는 함수
  async function fetchInstitutions() {
    try {
      setLoading(true);
      const response = await fetch('/api/institutions');
      
      if (!response.ok) {
        throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
      }
      
      const data = await response.json();
      setAllInstitutions(data);
      setFilteredInstitutions(data);
    } catch (err) {
      console.error('데이터 로딩 중 오류:', err);
      setError(err instanceof Error ? err.message : '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  // 컴포넌트 마운트 시 데이터 로드
  React.useEffect(() => {
    fetchInstitutions();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-4">
          <PageHeader title="의료기관 조회" />
          <div className="bg-gray-800 p-4 rounded-md">데이터를 불러오는 중...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-4">
          <PageHeader title="의료기관 조회" />
          <div className="bg-red-800 text-white p-4 rounded-md">
            {error}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <PageHeader title="의료기관 조회" />
        <SearchFilter
          institutions={allInstitutions}
          onFilterChange={setFilteredInstitutions}
        />
        <div className="mt-4">
          <div className="text-gray-300 mb-2 flex justify-between items-center">
            <p>
              총 {filteredInstitutions.length}개의 의료기관
            </p>
          </div>
          <InstitutionsList 
            institutions={filteredInstitutions}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
}

