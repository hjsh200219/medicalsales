'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import CustomerFilterForm from '@/components/CustomerFilterForm';
import CustomerList from '@/components/CustomerList';
import CustomerAddForm from '@/components/CustomerAddForm';
import CustomerEditForm from '@/components/CustomerEditForm';
import CustomerMap from '@/components/CustomerMap';
import { Customer } from '@/types/customer';

export default function CustomerManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [tierFilter, setTierFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'map'>('list');
  
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [pageSize] = useState(10);
  
  // 로딩 상태일 때 로그인 확인
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin?callbackUrl=/customer-management');
    }
  }, [session, status, router]);
  
  // 고객 목록 가져오기
  const fetchCustomers = useCallback(async (page = 1, searchQuery = '', tier = '') => {
    if (!session) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
      
      if (searchQuery) {
        queryParams.append('search', searchQuery);
      }
      
      if (tier) {
        queryParams.append('tier', tier);
      }
      
      const response = await fetch(`/api/customers?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('고객 데이터를 가져오는데 실패했습니다');
      }
      
      const data = await response.json();
      setCustomers(data.customers);
      setCurrentPage(data.pagination.page);
      setTotalPages(data.pagination.totalPages);
      setTotalCustomers(data.pagination.total);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err instanceof Error ? err.message : '고객 데이터를 가져오는데 실패했습니다');
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  }, [session, pageSize]);
  
  // 지도 보기에서는 모든 고객 데이터가 필요하므로 별도의 함수로 가져오기
  const fetchAllCustomers = useCallback(async () => {
    if (!session) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/customers?pageSize=1000`); // 충분히 큰 숫자로 설정
      
      if (!response.ok) {
        throw new Error('고객 데이터를 가져오는데 실패했습니다');
      }
      
      const data = await response.json();
      setCustomers(data.customers);
    } catch (err) {
      console.error('Error fetching all customers:', err);
      setError(err instanceof Error ? err.message : '고객 데이터를 가져오는데 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  }, [session]);
  
  // 초기 데이터 로드
  useEffect(() => {
    if (session) {
      if (activeTab === 'list') {
        fetchCustomers(currentPage, search, tierFilter);
      } else if (activeTab === 'map') {
        fetchAllCustomers();
      }
    }
  }, [session, currentPage, tierFilter, activeTab, fetchCustomers, fetchAllCustomers]);
  
  // 검색 처리
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setCurrentPage(1);
    fetchCustomers(1, search, tierFilter);
  }, [fetchCustomers, search, tierFilter]);
  
  // 필터 초기화
  const resetFilters = useCallback(() => {
    setSearch('');
    setTierFilter('');
    setCurrentPage(1);
    fetchCustomers(1, '', '');
  }, [fetchCustomers]);
  
  // 새로운 고객 추가 폼 보이기/숨기기 토글
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setEditingCustomer(null);
  };
  
  // 고객 수정 폼 열기
  const openEditForm = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowAddForm(false);
  };
  
  // 고객 정보 삭제
  const deleteCustomer = useCallback(async (id: string) => {
    if (!confirm('정말 이 고객을 삭제하시겠습니까?')) return;
    
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('고객 삭제에 실패했습니다');
      }
      
      // 성공적으로 삭제됐으면 목록 갱신
      if (activeTab === 'list') {
        fetchCustomers(currentPage, search, tierFilter);
      } else {
        fetchAllCustomers();
      }
    } catch (err) {
      console.error('Error deleting customer:', err);
      alert(err instanceof Error ? err.message : '고객 삭제에 실패했습니다');
    }
  }, [activeTab, currentPage, fetchAllCustomers, fetchCustomers, search, tierFilter]);
  
  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  
  // 탭 변경 핸들러
  const handleTabChange = (tab: 'list' | 'map') => {
    setActiveTab(tab);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <PageHeader 
            title="고객 관리"
          />
          {!showAddForm && !editingCustomer && (
            <button
              onClick={toggleAddForm}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              고객등록
            </button>
          )}
          {(showAddForm || editingCustomer) && (
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingCustomer(null);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              돌아가기
            </button>
          )}
        </div>
        
        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            {error}
          </div>
        )}
        
        {/* 고객 목록 테이블 또는 지도 */}
        {!showAddForm && !editingCustomer && (
          <>
            {/* 탭 메뉴 */}
            <div className="flex border-b border-gray-700 mb-4">
              <button
                className={`px-4 py-2 mr-2 ${
                  activeTab === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } rounded-t-md font-medium`}
                onClick={() => handleTabChange('list')}
              >
                고객 목록
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === 'map'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } rounded-t-md font-medium`}
                onClick={() => handleTabChange('map')}
              >
                고객 지도
              </button>
            </div>
            
            {/* 검색 필터 컴포넌트 (목록 탭에서만 표시) */}
            {activeTab === 'list' && (
              <CustomerFilterForm
                search={search}
                setSearch={setSearch}
                tierFilter={tierFilter}
                setTierFilter={setTierFilter}
                handleSearch={handleSearch}
                resetFilters={resetFilters}
                isSearching={isSearching}
              />
            )}
            
            {/* 선택된 탭에 따라 고객 목록 또는 지도 표시 */}
            {activeTab === 'list' ? (
              <CustomerList
                customers={customers}
                isLoading={isLoading}
                currentPage={currentPage}
                totalPages={totalPages}
                totalCustomers={totalCustomers}
                pageSize={pageSize}
                handlePageChange={handlePageChange}
                openEditForm={openEditForm}
                deleteCustomer={deleteCustomer}
              />
            ) : (
              <CustomerMap 
                customers={customers} 
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''} 
              />
            )}
          </>
        )}
        
        {/* 고객 추가 폼 컴포넌트 */}
        {showAddForm && (
          <CustomerAddForm 
            onCancel={toggleAddForm} 
            onSuccess={() => {
              setShowAddForm(false);
              if (activeTab === 'list') {
                fetchCustomers(currentPage, search, tierFilter);
              } else {
                fetchAllCustomers();
              }
            }} 
          />
        )}
        
        {/* 고객 수정 폼 컴포넌트 */}
        {editingCustomer && (
          <CustomerEditForm 
            customer={editingCustomer} 
            onCancel={() => setEditingCustomer(null)} 
            onSuccess={() => {
              setEditingCustomer(null);
              if (activeTab === 'list') {
                fetchCustomers(currentPage, search, tierFilter);
              } else {
                fetchAllCustomers();
              }
            }} 
          />
        )}
      </div>
    </Layout>
  );
} 