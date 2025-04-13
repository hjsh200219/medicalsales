'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/UI/PageHeader';
import { SearchFilter } from '@/components/Institution/InstitutionFilter';
import { SerializedInstitution } from '@/types/institution';
import { InstitutionsList } from '@/app/institutions/InstitutionsList';
import InstitutionMap from '@/app/institutions/InstitutionsMap';
import { LoadingSpinner, LoadingSpinnerStyles } from '@/components/UI/LoadingSpinner';

export default function MedicalInstitutions() {
  const [filteredInstitutions, setFilteredInstitutions] = useState<SerializedInstitution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(true);
  
  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // 기본값 (lg 화면)
  const [totalItems, setTotalItems] = useState(0); // 전체 아이템 수
  
  // 필터 상태 - 초기값은 빈 객체로 설정
  const [filterParams, setFilterParams] = useState<Record<string, string>>({});
  
  // 화면 크기에 따라 페이지당 표시 아이템 수 조정
  useEffect(() => {
    function handleResize() {
      // 모바일 화면 (sm)
      if (window.innerWidth < 768) {
        setItemsPerPage(6);
      } 
      // 태블릿 화면 (md)
      else if (window.innerWidth < 1024) {
        setItemsPerPage(8);
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
  }, [filterParams]);

  // 데이터를 가져오는 함수
  const fetchInstitutions = useCallback(async () => {
    try {
      setLoading(true);
      
      // URL 파라미터 생성
      const queryParams = new URLSearchParams();
      
      // 지도 뷰일 땐 페이지네이션 없이 모든 데이터를 가져옴
      if (viewMode === 'map') {
        // 지도 뷰에서는 제한 없이 모든 데이터를 로드
        queryParams.append('limit', '5000'); // 충분히 큰 숫자로 설정
        queryParams.append('offset', '0');
      } else {
        // 리스트 뷰에서는 페이지네이션 적용
        const offset = (currentPage - 1) * itemsPerPage;
        queryParams.append('offset', offset.toString());
        queryParams.append('limit', itemsPerPage.toString());
      }
      
      // 필터 파라미터 추가
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });
            
      const response = await fetch(`/api/institutions?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // 지도 뷰에서 데이터 로드 시 콘솔 메시지 추가
      if (viewMode === 'map') {
        console.log(`지도 뷰: ${data.institutions.length}개 의료기관 데이터 로드됨 (전체 ${data.total}개)`);
      }
            
      setFilteredInstitutions(data.institutions);
      setTotalItems(data.total);
    } catch (err) {
      console.error('데이터 로딩 중 오류:', err);
      setError(err instanceof Error ? err.message : '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, filterParams, viewMode]);

  // 페이지, 필터 또는 뷰 모드가 변경되면 데이터 다시 로드
  useEffect(() => {
    fetchInstitutions();
  }, [fetchInstitutions]);

  // 페이지 변경 처리
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 상단으로 스크롤
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 필터 표시/숨김 토글 핸들러
  const handleToggleFilters = (isVisible: boolean) => {
    setShowFilters(isVisible);
  };
  
  // 필터 변경 핸들러
  const handleFilterChange = (_: SerializedInstitution[], params: Record<string, string>) => {
    const hasChanged = Object.keys(params).some(key => filterParams[key] !== params[key]) || 
                       Object.keys(filterParams).some(key => !params[key]);
                       
    if (hasChanged) {
      setFilterParams(params);
    }
  };

  // 헤더와 뷰 모드 선택기 공통 컴포넌트
  const HeaderAndViewSelector = ({ disabled = false }: { disabled?: boolean }) => (
    <div className="flex justify-between items-center mb-4">
      <PageHeader title="의료기관 조회" />
      
      {/* 보기 모드 전환 버튼 */}
      <div className="flex bg-gray-700 p-1 rounded-md">
        <button
          className={`py-1 px-4 rounded-md ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
          onClick={() => viewMode !== 'list' && setViewMode('list')}
          disabled={disabled}
        >
          리스트
        </button>
        <button
          className={`py-1 px-4 rounded-md ${viewMode === 'map' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
          onClick={() => viewMode !== 'map' && setViewMode('map')}
          disabled={disabled}
        >
          지도
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-4">
          <HeaderAndViewSelector disabled={true} />
          <SearchFilter
            institutions={[]}
            onFilterChange={handleFilterChange}
            onToggleFilters={handleToggleFilters}
            showFilters={showFilters}
          />
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <LoadingSpinnerStyles />
              <LoadingSpinner size="lg" message="의료기관 데이터를 불러오는 중" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-4">
          <HeaderAndViewSelector disabled={true} />
          <SearchFilter
            institutions={[]}
            onFilterChange={handleFilterChange}
            onToggleFilters={handleToggleFilters}
            showFilters={showFilters}
          />
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
        <HeaderAndViewSelector />
        
        <SearchFilter
          institutions={[]}
          onFilterChange={handleFilterChange}
          onToggleFilters={handleToggleFilters}
          showFilters={showFilters}
        />
        
        <div className="mt-4">          
          {viewMode === 'list' ? (
            <InstitutionsList 
              institutions={filteredInstitutions}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
          ) : (
            <InstitutionMap 
              institutions={filteredInstitutions} 
              isFilterVisible={showFilters} 
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

