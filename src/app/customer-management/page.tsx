'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import CustomerFilterForm from '@/components/CustomerFilterForm';
import CustomerList from '@/app/customer-management/CustomerList';
import CustomerAddForm from '@/components/CustomerAddForm';
import CustomerEditForm from '@/components/CustomerEditForm';
import CustomerMap from '@/app/customer-management/CustomerMap';
import { Customer } from '@/types/customer';
import { LoadingSpinner, LoadingSpinnerStyles } from '@/components/LoadingSpinner';

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
  const [registrationMode, setRegistrationMode] = useState<'individual' | 'excel'>('individual');
  
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  
  // 화면 크기에 따라 페이지당 표시 아이템 수 조정
  useEffect(() => {
    function handleResize() {
      // 모바일 화면 (sm)
      if (window.innerWidth < 768) {
        setPageSize(6);
      } 
      // 태블릿 화면 (md)
      else if (window.innerWidth < 1024) {
        setPageSize(8);
      } 
      // 데스크탑 화면 (lg)
      else {
        setPageSize(12);
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
    setRegistrationMode('individual'); // 기본값으로 개별 등록 모드 설정
  };
  
  // 고객 수정 폼 열기
  const openEditForm = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowAddForm(false);
  };
  
  // 등록 모드 변경 핸들러
  const handleRegistrationModeChange = (mode: 'individual' | 'excel') => {
    setRegistrationMode(mode);
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
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <PageHeader 
              title="고객 관리"
            />
            
            {/* 돌아가기 버튼 (고객 등록/수정 중일 때만 표시) */}
            {(showAddForm || editingCustomer) && (
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingCustomer(null);
                }}
                className="px-1 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label="돌아가기"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
            )}
            
            {/* 고객 등록 버튼 */}
            {!showAddForm && !editingCustomer && (
              <button
                onClick={toggleAddForm}
                className="px-1 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="고객 등록"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            )}
          </div>
          
          {/* 보기 모드 전환 버튼 (고객 등록/수정 중이 아닐 때만 표시) */}
          {!showAddForm && !editingCustomer && (
            <div className="flex bg-gray-700 p-1 rounded-md">
              <button
                className={`py-1 px-4 rounded-md ${activeTab === 'list' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                onClick={() => handleTabChange('list')}
              >
                목록
              </button>
              <button
                className={`py-1 px-4 rounded-md ${activeTab === 'map' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                onClick={() => handleTabChange('map')}
              >
                지도
              </button>
            </div>
          )}
          
          {/* 등록 모드 전환 버튼 (고객 등록 중일 때만 표시) */}
          {showAddForm && (
            <div className="flex bg-gray-700 p-1 rounded-md">
              <button
                className={`py-1 px-4 rounded-md ${registrationMode === 'individual' ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                onClick={() => handleRegistrationModeChange('individual')}
              >
                개별
              </button>
              <button
                className={`py-1 px-4 rounded-md ${registrationMode === 'excel' ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                onClick={() => handleRegistrationModeChange('excel')}
              >
                엑셀
              </button>
            </div>
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
            {/* 탭 메뉴 제거 */}
            
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
            
            {/* 고객 등록 버튼 제거 */}
            
            {/* 선택된 탭에 따라 고객 목록 또는 지도 표시 */}
            {activeTab === 'list' ? (
              isLoading ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                  <div className="text-center">
                    <LoadingSpinnerStyles />
                    <LoadingSpinner size="lg" message="고객 데이터를 불러오는 중" />
                  </div>
                </div>
              ) : (
                <CustomerList
                  customers={customers}
                  isLoading={false}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalCustomers={totalCustomers}
                  pageSize={pageSize}
                  handlePageChange={handlePageChange}
                  openEditForm={openEditForm}
                  deleteCustomer={deleteCustomer}
                />
              )
            ) : (
              isLoading ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                  <div className="text-center">
                    <LoadingSpinnerStyles />
                    <LoadingSpinner size="lg" message="지도 데이터를 불러오는 중" />
                  </div>
                </div>
              ) : (
                <CustomerMap 
                  customers={customers} 
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''} 
                />
              )
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
            activeTab={registrationMode}
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