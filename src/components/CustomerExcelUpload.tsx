'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';

interface CustomerExcelUploadProps {
  onSuccess?: (result: { success: number, failed: number }) => void;
  onError?: (error: string) => void;
}

const CustomerExcelUpload: React.FC<CustomerExcelUploadProps> = ({
  onSuccess,
  onError
}) => {
  const [isUploading, setIsUploading] = useState(false);
  
  // 엑셀 샘플 다운로드
  const downloadSampleExcel = () => {
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
        address: '부산시 해운대구', 
        tier: '법인고객',
        company: '테스트병원', 
        address_company: '부산시 기장군',
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
  };
  
  // 엑셀 파일 처리
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    
    try {
      setIsUploading(true);
      
      const file = files[0];
      
      // 파일 읽기
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          if (!event.target || !event.target.result) {
            throw new Error('파일 읽기에 실패했습니다');
          }
          
          const data = new Uint8Array(event.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // 첫 번째 시트의 데이터 가져오기
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          // API 호출하여 데이터 저장
          const response = await fetch('/api/customers/bulk-upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customers: jsonData })
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '업로드 중 오류가 발생했습니다');
          }
          
          const result = await response.json();
          
          // 성공 콜백 호출
          if (onSuccess) {
            onSuccess({
              success: result.success,
              failed: result.failed
            });
          }
          
          // 파일 입력 필드 초기화
          const fileInput = document.getElementById('excelUpload') as HTMLInputElement;
          if (fileInput) {
            fileInput.value = '';
          }
        } catch (err) {
          console.error('Error processing file:', err);
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
      };
      
      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error('Error handling file upload:', err);
      if (onError) {
        onError(err instanceof Error ? err.message : '파일 업로드 중 오류가 발생했습니다');
      }
      setIsUploading(false);
    }
  };
  
  return (
    <div className="flex space-x-2">
      {/* 샘플 엑셀 다운로드 버튼 */}
      <button
        onClick={downloadSampleExcel}
        className="px-2 py-1 bg-green-500 text-sm text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        샘플 엑셀
      </button>
      
      {/* 엑셀 업로드 버튼 */}
      <div className="relative">
        <input
          type="file"
          id="excelUpload"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        <button
          className={`px-2 py-1 ${
            isUploading ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600'
          } text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2`}
          disabled={isUploading}
        >
          {isUploading ? '업로드 중...' : '엑셀 업로드'}
        </button>
      </div>
    </div>
  );
};

export default CustomerExcelUpload; 