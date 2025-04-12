import React, { useState } from 'react';
import CustomerForm, { CustomerFormData } from '@/components/CustomerForm';
import CustomerExcelUpload from '@/components/CustomerExcelUpload';

// 고객 추가 폼 컴포넌트
type CustomerAddFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
};

type TabType = 'individual' | 'excel';

export default function CustomerAddForm({ onCancel, onSuccess }: CustomerAddFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<{success: number, failed: number} | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('individual');

  const handleSubmit = async (formData: CustomerFormData) => {
    if (!formData.customer_name.trim()) {
      setError('고객명은 필수 항목입니다');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
    setUploadResult(result);
    setError(null);
  };
  
  // 엑셀 업로드 오류 핸들러
  const handleExcelUploadError = (errorMessage: string) => {
    setError(errorMessage);
    setUploadResult(null);
  };

  return (
    <div className="space-y-6">

      {/* 탭 인터페이스 */}
      <div className="border-b border-gray-700 mb-4">
        <div className="flex">
          <button
            className={`py-2 px-4 rounded-t-md mr-2 ${
              activeTab === 'individual'
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('individual')}
          >
            개별 등록
          </button>
          <button
            className={`py-2 px-4 rounded-t-md ${
              activeTab === 'excel'
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('excel')}
          >
            엑셀 업로드
          </button>
        </div>
      </div>

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
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-lg text-gray-700 font-medium mb-2">엑셀 파일로 고객 대량 등록</h3>
              <p className="text-gray-600 text-sm">
                엑셀 파일을 통해 여러 고객 정보를 한 번에 등록할 수 있습니다. 
                샘플 엑셀 파일을 다운로드하여 형식을 확인하세요.
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-700 mb-2">1. 샘플 파일 다운로드</h4>
                <p className="text-sm text-gray-600 mb-3">
                  아래 버튼을 클릭하여 엑셀 템플릿을 다운로드하세요.
                </p>
                <button
                  onClick={() => {
                    const uploadComponent = document.getElementById('excelUploadComponent') as HTMLElement;
                    const downloadButton = uploadComponent?.querySelector('button') as HTMLButtonElement;
                    downloadButton?.click();
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  샘플 엑셀 다운로드
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-700 mb-2">2. 작성 완료된 엑셀 파일 업로드</h4>
                <p className="text-sm text-gray-600 mb-3">
                  작성이 완료된 엑셀 파일을 업로드하세요. 시스템에서 주소를 위경도로 자동 변환합니다.
                </p>
                
                {/* 숨겨진 원래 컴포넌트 (트리거용) */}
                <div id="excelUploadComponent" className="hidden">
                  <CustomerExcelUpload
                    onSuccess={handleExcelUploadSuccess}
                    onError={handleExcelUploadError}
                  />
                </div>
                
                {/* 스타일링된 버튼 */}
                <button
                  onClick={() => {
                    const uploadComponent = document.getElementById('excelUploadComponent') as HTMLElement;
                    const fileInput = uploadComponent?.querySelector('input[type="file"]') as HTMLInputElement;
                    fileInput?.click();
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  엑셀 파일 업로드
                </button>
              </div>
              
              {/* 엑셀 업로드 결과 메시지 */}
              {uploadResult && (
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 