import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import CustomerForm, { CustomerFormData } from '@/components/CustomerForm';
import CustomerExcelUpload from '@/components/CustomerExcelUpload';

// 고객 추가 폼 컴포넌트
type CustomerAddFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
  activeTab: 'individual' | 'excel';
};

export default function CustomerAddForm({ onCancel, onSuccess, activeTab }: CustomerAddFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<{success: number, failed: number} | null>(null);
  const { data: session } = useSession();

  const handleSubmit = async (formData: CustomerFormData) => {
    if (!formData.customer_name.trim()) {
      setError('고객명은 필수 항목입니다');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // 세션이 없는 경우 확인
      if (!session?.user) {
        throw new Error('로그인 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
      }

      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          registeredBy: {
            id: session.user.id || '',
            email: session.user.email || '',
            name: session.user.name || ''
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '고객 등록에 실패했습니다');
      }

      onSuccess();
    } catch (err) {
      console.error('Error adding customer:', err);
      setError(err instanceof Error ? err.message : '고객 등록에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 엑셀 업로드 성공 핸들러
  const handleExcelUploadSuccess = (result: {success: number, failed: number}) => {
    console.log('Excel upload success handler called with:', result);
    setUploadResult(result);
    setError(null);
    
    // 디버깅용: 상태 변경 후 확인
    setTimeout(() => {
      console.log('Current uploadResult state:', uploadResult);
    }, 100);
  };
  
  // 엑셀 업로드 오류 핸들러
  const handleExcelUploadError = (errorMessage: string) => {
    setError(errorMessage);
    setUploadResult(null);
  };

  return (
    <div className="space-y-6">
      {/* 탭 선택 버튼 제거 */}
      
      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}

      {/* 탭 콘텐츠 */}
      {activeTab === 'individual' ? (
        /* 개별 등록 폼 */
        <CustomerForm
          onCancel={onCancel}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          error={null} // 에러는 위에서 공통으로 처리
          title=""
          submitButtonText="저장하기"
        />
      ) : (
        /* 엑셀 업로드 탭 */
        <div className="bg-gray-800 p-4 rounded-md shadow-sm h-[calc(100vh-10rem)]">
          <div className="space-y-6">
            <div className="border-b border-gray-500">
              <h3 className="text-lg text-gray-200 font-medium mb-2">엑셀 파일로 고객 대량 등록</h3>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="bg-gray-700 py-8 px-4 rounded-md">
                <h4 className="text-lg font-bold text-gray-200 mb-4">1. Download Sample Excel</h4>
                <p className="text-sm text-gray-200 mb-0">
                  샘플 엑셀로 다운로드하여 형식을 확인하세요.
                </p>
                <p className="text-sm text-gray-200 mb-3">
                  엑셀의 칼럼 이름을 정확히 맞추어 업로드 해주세요.
                </p>
                <CustomerExcelUpload
                  onSuccess={handleExcelUploadSuccess}
                  onError={handleExcelUploadError}
                />
              </div>

              <div className="bg-gray-700 py-8 px-4 rounded-md">
                <h4 className="text-lg font-bold text-gray-200 mb-6">2. Upload Result</h4>
                {uploadResult ? (
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
                    <h4 className="font-medium mb-1">업로드 완료</h4>
                    <p>성공: {uploadResult.success}건, 실패: {uploadResult.failed}건</p>
                    {uploadResult.success > 0 && (
                      <div className="mt-3">
                        <button 
                          onClick={onSuccess} 
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          목록으로 돌아가기
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-200">
                    엑셀 파일을 업로드하면 여기에 결과가 표시됩니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 