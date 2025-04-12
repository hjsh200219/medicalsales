'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type UserInfo = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  company: string | null;
  address: string | null;
  last_login: string;
  created_at: string;
  updated_at: string;
};

export default function MyPage() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // 사용자 정보 가져오기
  useEffect(() => {
    async function fetchUserInfo() {
      if (status === 'loading') return;
      
      if (!session) {
        router.push('/auth/signin?callbackUrl=/mypage');
        return;
      }

      try {
        const response = await fetch(`/api/user?email=${encodeURIComponent(session.user.email!)}`);
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
          setName(data.name || '');
          setCompany(data.company || '');
          setAddress(data.address || '');
        } else {
          console.error('사용자 정보를 가져오는 데 실패했습니다');
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserInfo();
  }, [session, status, router]);

  // 사용자 정보 업데이트 함수
  const handleUpdateUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateMessage('');

    try {
      const response = await fetch('/api/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user.email,
          name,
          company,
          address,
        }),
      });

      if (response.ok) {
        setUpdateMessage('프로필이 성공적으로 업데이트되었습니다.');
        setIsEditing(false);
        
        // 업데이트된 정보 다시 가져오기
        const updatedData = await response.json();
        setUserInfo(updatedData);

        // 세션 정보 갱신 (새로고침 시 적용)
        router.refresh();
      } else {
        setUpdateMessage('프로필 업데이트 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      setUpdateMessage('프로필 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  // 회원 탈퇴 함수
  const handleDeleteAccount = async () => {
    if (!session?.user?.email) return;
    
    setIsDeleting(true);
    
    try {
      const response = await fetch('/api/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
        }),
      });

      if (response.ok) {
        // 세션 종료 후 홈페이지로 리다이렉트
        await signOut({ redirect: false });
        router.push('/');
        // 성공 알림을 표시하기 위해 잠시 대기
        setTimeout(() => {
          alert('회원 탈퇴가 완료되었습니다.');
        }, 500);
      } else {
        const errorData = await response.json();
        alert(`오류가 발생했습니다: ${errorData.error || '알 수 없는 오류'}`);
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      alert('회원 탈퇴 처리 중 오류가 발생했습니다.');
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-2 py-8">
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <PageHeader 
            title="마이페이지" 
          />
          </div>
        {userInfo && (
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <div className="mb-6 flex items-center">
              <div className="mr-4">
                {userInfo.image ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={userInfo.image}
                      alt={userInfo.name || '사용자'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                    {userInfo.name?.charAt(0) || '?'}
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-semibold">{userInfo.name || '이름 없음'}</h2>
                <p className="text-gray-500">{userInfo.email}</p>
              </div>
            </div>

            {updateMessage && (
              <div className={`p-3 mb-4 rounded ${updateMessage.includes('성공') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {updateMessage}
              </div>
            )}
            
            {isEditing ? (
              <form onSubmit={handleUpdateUserInfo} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                    회사명
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                    회사 주소
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isUpdating ? '업데이트 중...' : '저장'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setName(userInfo.name || '');
                      setCompany(userInfo.company || '');
                      setAddress(userInfo.address || '');
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    취소
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium mb-3">계정 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">이메일</p>
                      <p>{userInfo.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">이름</p>
                      <p>{userInfo.name || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">회사명</p>
                      <p>{userInfo.company || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">회사 주소</p>
                      <p>{userInfo.address || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">마지막 로그인</p>
                      <p>{new Date(userInfo.last_login).toLocaleString('ko-KR')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">가입일</p>
                      <p>{new Date(userInfo.created_at).toLocaleString('ko-KR')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center items-center space-x-4 mt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    프로필 수정
                  </button>
                  
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    회원 탈퇴
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* 회원 탈퇴 확인 모달 */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">회원 탈퇴 확인</h3>
              <p className="mb-0">정말로 탈퇴하시겠습니까?</p>
              <p className="mb-6">이 작업은 되돌릴 수 없으며, 모든 계정 정보가 삭제됩니다.</p>
              
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                  disabled={isDeleting}
                >
                  취소하기
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  disabled={isDeleting}
                >
                  {isDeleting ? '처리 중...' : '탈퇴하기'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 