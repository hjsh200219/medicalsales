'use client';

import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { useSession } from 'next-auth/react';
import { LoadingSpinner, LoadingSpinnerStyles } from '@/components/UI/LoadingSpinner';

interface CustomerExcelUploadProps {
  onSuccess?: (result: { success: number, failed: number }) => void;
  onError?: (error: string) => void;
  onUploadSummary?: (summary: { success: number, failed: number, errors: string[] }) => void;
}

const CustomerExcelUpload: React.FC<CustomerExcelUploadProps> = ({
  onSuccess,
  onError,
  onUploadSummary
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSummary, setUploadSummary] = useState<{ success: number, failed: number, errors: string[] } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 엑셀 샘플 다운로드
  const downloadSampleExcel = () => {
    try {
      // 샘플 데이터 생성
      const sampleData = [
        {
          customer_name: '홍길동', 
          phone: '010-1234-5678',
          mobile: '010-1234-5678',
          email: 'sample@example.com',
          tier: 'VIP',
          address: '서울시 강남구 삼성동', 
          company: '샘플회사', 
          address_company: '서울시 강남구 대치동',
          position: '구매담당자',
          comment: '메모 샘플'
        },
        {
          customer_name: '김철수', 
          phone: '02-123-4567',
          mobile: '010-9876-5432',
          email: 'test@example.com',
          address: '경기도 성남시', 
          tier: '법인고객',
          company: '테스트병원', 
          address_company: '강원도 홍천군',
          position: '원장',
          comment: '주요 고객, 인공관절 관심'
        }
      ];

      // 워크시트 생성
      const ws = XLSX.utils.json_to_sheet(sampleData);
      
      // 칼럼 너비 설정
      const wscols = [
        {wch: 10},  // customer_name
        {wch: 15},  // company
        {wch: 15},  // phone
        {wch: 15},  // mobile
        {wch: 20},  // email
        {wch: 30},  // address
        {wch: 30},  // address_company
        {wch: 5},   // tier
        {wch: 15},  // position
        {wch: 25}   // comment
      ];
      ws['!cols'] = wscols;
      
      // 워크북 생성 및 워크시트 추가
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, '고객 샘플');
      
      // 파일 다운로드
      XLSX.writeFile(wb, '고객등록_샘플.xlsx');
    } catch {
      if (onError) onError('샘플 파일 다운로드 중 오류가 발생했습니다');
    }
  };
  
  // 엑셀 파일 처리
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    const files = e.target.files;
    
    if (!files || !files[0]) {
      return;
    }
    
    if (!session || !session.user) {
      if (onError) onError('로그인 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
      return;
    }
    
    try {
      setIsUploading(true);
      setUploadSummary(null);
      const file = files[0];
      setSelectedFile(file);
      
      // xlsx 또는 xls 파일만 허용
      if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        if (onError) onError('xlsx 또는 xls 형식의 파일만 업로드 가능합니다.');
        setIsUploading(false);
        return;
      }
      
      // 파일 읽기
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          if (!event.target || !event.target.result) {
            throw new Error('파일 읽기에 실패했습니다');
          }
          
          // xlsx 모듈 사용하여 엑셀 파일 파싱
          try {
            const data = new Uint8Array(event.target.result as ArrayBuffer);
            
            const workbook = XLSX.read(data, { type: 'array' });
            
            if (workbook.SheetNames.length === 0) {
              throw new Error('엑셀 파일에 시트가 없습니다');
            }
            
            // 첫 번째 시트의 데이터 가져오기
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            if (jsonData.length === 0) {
              if (onError) onError('엑셀 파일에 데이터가 없습니다');
              setIsUploading(false);
              setSelectedFile(null);
              return;
            }
            
            // API 호출
            const requestBody = {
              customers: jsonData,
              registeredBy: {
                id: session.user.id || '',
                email: session.user.email || '',
                name: session.user.name || ''
              }
            };
            
            try {
              const response = await fetch('/api/customers/bulk-upload', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
              });
              
              if (!response.ok) {
                let errorMsg = `서버 오류: HTTP ${response.status}`;
                try {
                  const errorDetail = await response.text();
                  errorMsg += ` - ${errorDetail.substring(0, 100)}${errorDetail.length > 100 ? '...' : ''}`;
                } catch {
                  // 응답 텍스트 읽기 실패
                }
                throw new Error(errorMsg);
              }
              
              // 응답 본문 읽기
              let responseText = '';
              try {
                responseText = await response.text();
                
                if (!responseText || responseText.trim() === '') {
                  throw new Error('서버에서 빈 응답이 반환되었습니다');
                }
              } catch {
                throw new Error('서버 응답을 읽는 중 오류가 발생했습니다');
              }
              
              // JSON 파싱
              let result;
              try {
                result = JSON.parse(responseText);
              } catch {
                throw new Error('서버 응답을 JSON으로 파싱할 수 없습니다. 응답 형식을 확인해주세요.');
              }
              
              // 결과 검증
              if (!result) {
                throw new Error('서버에서 응답을 받았지만 결과가 없습니다');
              }
              
              // 성공과 실패 속성 확인
              if (typeof result.success !== 'number' || typeof result.failed !== 'number') {
                throw new Error('서버 응답에 필요한 정보(success, failed)가 누락되었습니다');
              }
              
              // 업로드 요약 상태 업데이트
              const summary = {
                success: result.success || 0,
                failed: result.failed || 0,
                errors: result.errors || []
              };
              
              setUploadSummary(summary);
              
              if (onUploadSummary) {
                onUploadSummary(summary);
              }
              
              // 파일 업로드 완료 처리
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
              setSelectedFile(null);
              
              // 성공 콜백 호출
              if (onSuccess) {
                try {
                  onSuccess({
                    success: result.success,
                    failed: result.failed
                  });
                } catch {
                  // 콜백 실행 중 오류
                }
              }
              
            } catch (fetchError) {
              if (onError) {
                const errorMessage = fetchError instanceof Error 
                  ? fetchError.message 
                  : '고객 데이터 업로드 중 알 수 없는 오류가 발생했습니다';
                
                onError(errorMessage);
              }
            }
          } catch {
            if (onError) {
              onError('엑셀 파일 파싱 중 오류가 발생했습니다. 파일 형식을 확인해주세요.');
            }
          }
        } catch (err) {
          if (onError) {
            onError(err instanceof Error ? err.message : '파일 처리 중 오류가 발생했습니다');
          }
        } finally {
          setIsUploading(false);
        }
      };
      
      reader.onerror = () => {
        if (onError) {
          onError('파일 읽기 실패');
        }
        setIsUploading(false);
        setSelectedFile(null);
      };
      
      reader.readAsArrayBuffer(file);
    } catch (err) {
      if (onError) {
        onError(err instanceof Error ? err.message : '파일 업로드 중 오류가 발생했습니다');
      }
      setIsUploading(false);
      setSelectedFile(null);
    }
  };
  
  // 폼 제출 핸들러 (추가)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files.length > 0) {
      handleFileUpload({ target: { files: fileInputRef.current.files } } as React.ChangeEvent<HTMLInputElement>);
    } else {
      if (onError) onError('선택된 파일이 없습니다');
    }
  };
  
  return (
    <div className="flex flex-col items-center md:items-start space-y-4 ">
      <LoadingSpinnerStyles />
      <div className="flex space-x-2">
        {/* 샘플 엑셀 다운로드 버튼 */}
        <button
          type="button"
          onClick={downloadSampleExcel}
          className="px-2 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-32"
        >
          Sample Excel
        </button>
        
        {/* 엑셀 업로드 폼으로 변경 */}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="file"
            ref={fileInputRef}
            id="excelUpload"
            name="excelFile"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isUploading}
          />
          <label
            htmlFor="excelUpload"
            className={`px-2 py-2 ${
              isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 cursor-pointer'
            } text-white rounded-md inline-block focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 w-32 text-center`}
          >
            {isUploading ? 'Uploading...' : 'Upload Excel'}
          </label>
        </form>
      </div>
      
      {/* 로딩 스피너 */}
      {isUploading && (
        <div className="mt-4 flex justify-center">
          <LoadingSpinner 
            size="md" 
            message={`${selectedFile?.name || '고객 데이터'} 처리 중입니다.`} 
          />
        </div>
      )}
      
      {/* 업로드 결과 요약 (옵션) */}
      {uploadSummary && !isUploading && (
        <div className="mt-2 text-sm">
          <div className={uploadSummary.failed > 0 ? "text-yellow-600" : "text-green-600"}>
            처리 결과: 총 {uploadSummary.success + uploadSummary.failed}건 중
            {uploadSummary.success > 0 && <span className="text-green-600"> {uploadSummary.success}건 성공</span>}
            {uploadSummary.failed > 0 && <span className="text-red-600"> {uploadSummary.failed}건 실패</span>}
          </div>
          {uploadSummary.errors && uploadSummary.errors.length > 0 && (
            <details className="mt-1">
              <summary className="cursor-pointer text-xs text-red-600">오류 상세 ({uploadSummary.errors.length}건)</summary>
              <ul className="ml-2 mt-1 text-xs text-red-500">
                {uploadSummary.errors.slice(0, 5).map((error, index) => (
                  <li key={index}>· {error}</li>
                ))}
                {uploadSummary.errors.length > 5 && (
                  <li className="italic">외 {uploadSummary.errors.length - 5}건 더...</li>
                )}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerExcelUpload; 