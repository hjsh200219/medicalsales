'use client';

import { useState } from 'react';
import { ApiResult } from "./types";

interface ApiDataDisplayProps {
  title: string;
  data: ApiResult;
  lastupdate: string;
  lastupdateTimestamp: number;
}

export function ApiDataDisplay({ title, data, lastupdate, lastupdateTimestamp }: ApiDataDisplayProps) {
  const [isJsonExpanded, setIsJsonExpanded] = useState(false);
  
  // 에러가 있는 경우 에러 메시지 표시
  if (data.error) {
    return (
      <div className="bg-red-900/30 border border-red-800 p-4 rounded-md mb-6 mt-4">
        <h3 className="text-xl text-white font-semibold mb-2">{title} - 오류</h3>
        <p className="text-red-300">{data.error}</p>
      </div>
    );
  }
  
  // 응답 데이터가 없는 경우
  if (!data.response) {
    return (
      <div className="bg-gray-700 p-4 rounded-md mb-6 mt-4">
        <h3 className="text-xl text-white font-semibold mb-2">{title}</h3>
        <p className="text-gray-300">데이터가 없습니다.</p>
      </div>
    );
  }
  
  // 응답 바디 정보
  const body = data.response.body || {};
  const totalCount = body.totalCount || 0;
  
  // 아이템 목록
  const items = body.items?.item || [];
  const itemList = Array.isArray(items) ? items : [items];
  
  // YYYYMMDD 형식의 문자열을 타임스탬프로 변환하는 함수
  const getTimestampFromYYYYMMDD = (dateStr: string): number => {
    if (!dateStr || dateStr.length !== 8) return 0;
    
    try {
      const year = parseInt(dateStr.substring(0, 4));
      const month = parseInt(dateStr.substring(4, 6)) - 1; // 0-11 기준
      const day = parseInt(dateStr.substring(6, 8));
      return new Date(year, month, day).getTime();
    } catch {
      return 0;
    }
  };
  
  // lastupdateTimestamp 이후의 데이터만 필터링
  const filteredItems = itemList.filter(item => {
    if (!item.estbDd) return false;
    const itemTimestamp = getTimestampFromYYYYMMDD(item.estbDd.toString());
    return itemTimestamp > lastupdateTimestamp;
  });
  
  // 데이터 요약 정보 계산
  const summary = {
    totalItems: itemList.length,
    filteredItems: filteredItems.length,
    regions: {} as Record<string, number>,
    types: {} as Record<string, number>
  };
  
  // 지역 및 타입별 분포 계산 (필터링된 아이템 기준)
  filteredItems.forEach(item => {
    // 지역별 카운트
    if (item.sidoCdNm) {
      const region = item.sidoCdNm.toString();
      summary.regions[region] = (summary.regions[region] || 0) + 1;
    }
    
    // 타입별 카운트
    if (item.clCdNm) {
      const type = item.clCdNm.toString();
      summary.types[type] = (summary.types[type] || 0) + 1;
    }
  });
  
  // 지역 및 타입별 상위 항목
  const topRegions = Object.entries(summary.regions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
    
  const topTypes = Object.entries(summary.types)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  const toggleJsonExpand = () => {
    setIsJsonExpanded(!isJsonExpanded);
  };
  
  return (
    <div className="bg-gray-700 p-4 rounded-md mb-6 mt-4">
      <h3 className="text-xl text-white font-semibold mb-3">{title}</h3>
      
      {/* 데이터 요약 섹션 */}
      <div className="bg-gray-800 p-3 rounded-md mb-4">
        <h4 className="text-white font-medium mb-2">데이터 요약</h4>
        <p className="text-gray-300">총 데이터 수: <span className="font-semibold">{totalCount.toLocaleString()}</span></p>
        <p className="text-gray-300">가져온 데이터 수: <span className="font-semibold">{summary.totalItems.toLocaleString()}</span></p>
        <p className="text-gray-300">최종 업데이트({lastupdate}) 이후 데이터: <span className="font-semibold">{summary.filteredItems.toLocaleString()}</span></p>
        
        {/* 지역별 분포 */}
        {topRegions.length > 0 && (
          <div className="mt-3">
            <p className="text-gray-300 font-medium">지역별 분포 (상위 5개)</p>
            <ul className="text-gray-300 text-sm mt-1">
              {topRegions.map(([region, count], index) => (
                <li key={index}>
                  {region}: {count.toLocaleString()}건 
                  {summary.filteredItems > 0 && ` (${Math.round(count / summary.filteredItems * 100)}%)`}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* 기관유형별 분포 */}
        {topTypes.length > 0 && (
          <div className="mt-3">
            <p className="text-gray-300 font-medium">기관유형별 분포 (상위 5개)</p>
            <ul className="text-gray-300 text-sm mt-1">
              {topTypes.map(([type, count], index) => (
                <li key={index}>
                  {type}: {count.toLocaleString()}건
                  {summary.filteredItems > 0 && ` (${Math.round(count / summary.filteredItems * 100)}%)`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* 최신 데이터 표시 (최종 업데이트 이후) */}
      {filteredItems.length > 0 ? (
        <div className="bg-gray-800 p-3 rounded-md overflow-auto">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-white font-medium">
              {lastupdate} 이후 업데이트된 데이터 ({filteredItems.length}개)
            </h4>
            <button
              onClick={toggleJsonExpand}
              className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
            >
              {isJsonExpanded ? '접기' : '펼치기'}
            </button>
          </div>
          
          {isJsonExpanded && (
            <pre className="text-gray-300 text-sm overflow-x-auto mt-2">
              {JSON.stringify(filteredItems, null, 2)}
            </pre>
          )}
          
          {!isJsonExpanded && (
            <div className="text-gray-400 text-sm border border-gray-600 rounded p-2 cursor-pointer" onClick={toggleJsonExpand}>
              JSON 데이터를 보려면 클릭하세요 (총 {filteredItems.length}개 항목)
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-800 p-3 rounded-md">
          <h4 className="text-white font-medium mb-2">최신 데이터</h4>
          <p className="text-gray-300">{lastupdate} 이후에 업데이트된 데이터가 없습니다.</p>
        </div>
      )}
    </div>
  );
} 