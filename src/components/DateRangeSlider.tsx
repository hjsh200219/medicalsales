'use client';

import React, { useState, useEffect } from 'react';

interface DateRangeSliderProps {
  onRangeChange: (range: { start: Date, end: Date }) => void;
  initialRange?: { start: Date, end: Date };
}

export function DateRangeSlider({ 
  onRangeChange,
  initialRange
}: DateRangeSliderProps) {
  // 날짜 범위를 1900.01.01부터 오늘까지로 고정
  const minDate = new Date(1900, 0, 1); // 1900년 1월 1일
  const maxDate = new Date(); // 오늘 날짜
  
  // 기준 날짜들 계산
  const currentYear = maxDate.getFullYear();
  const currentMonth = maxDate.getMonth();
  const lastYearEnd = new Date(currentYear - 1, 11, 31); // 작년 12월 31일
  const year2000Start = new Date(2000, 0, 1); // 2000년 1월 1일
  const century1900End = new Date(1999, 11, 31); // 1999년 12월 31일
  
  // 올해 시작
  const thisYearStart = new Date(currentYear, 0, 1);
  
  // 지난달 마지막 날
  const lastMonthEnd = new Date(currentYear, currentMonth, 0);
  
  // 이번달 시작
  const thisMonthStart = new Date(currentYear, currentMonth, 1);
  
  // 날짜 구간을 정의하는 배열 생성
  const dateSegments = [
    { start: minDate, end: century1900End, label: '10년 단위', unit: 'decade' },
    { start: year2000Start, end: lastYearEnd, label: '1년 단위', unit: 'year' },
    { start: thisYearStart, end: lastMonthEnd, label: '1개월 단위', unit: 'month' },
    { start: thisMonthStart, end: maxDate, label: '1주일 단위', unit: 'week' },
  ];
  
  // 각 구간의 타임스탬프 범위
  const segmentTimestamps = dateSegments.map(segment => ({
    start: segment.start.getTime(),
    end: segment.end.getTime(),
    range: segment.end.getTime() - segment.start.getTime(),
    unit: segment.unit
  }));
  
  // 전체 타임스탬프 범위
  const minTimestamp = minDate.getTime();
  const maxTimestamp = maxDate.getTime();
  const totalRange = maxTimestamp - minTimestamp;
  
  // 초기 범위 설정 (기본값은 사용자 지정 범위 또는 전체 범위)
  const [range, setRange] = useState<[number, number]>([
    initialRange?.start.getTime() || minTimestamp,
    initialRange?.end.getTime() || maxTimestamp
  ]);

  // 날짜 포맷 함수
  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  // 슬라이더의 두 손잡이 값을 퍼센트로 계산
  const startPercent = ((range[0] - minTimestamp) / totalRange) * 100;
  const endPercent = ((range[1] - minTimestamp) / totalRange) * 100;
  
  // 타임스탬프를 퍼센트로 변환
  const timestampToPercent = (timestamp: number): number => {
    return ((timestamp - minTimestamp) / totalRange) * 100;
  };

  // 날짜 단위에 따른 스냅 기능
  const snapToUnit = (timestamp: number, unit: string): number => {
    const date = new Date(timestamp);
    switch(unit) {
      case 'decade':
        // 10년 단위로 스냅
        const year = date.getFullYear();
        const decadeStart = Math.floor(year / 10) * 10;
        return new Date(decadeStart, 0, 1).getTime();
      case 'year':
        // 1년 단위로 스냅
        return new Date(date.getFullYear(), 0, 1).getTime();
      case 'month':
        // 1개월 단위로 스냅
        return new Date(date.getFullYear(), date.getMonth(), 1).getTime();
      case 'week':
        // 1주일 단위로 스냅
        const day = date.getDay(); // 0-6 (일-토)
        const diff = date.getDate() - day;
        return new Date(date.getFullYear(), date.getMonth(), diff).getTime();
      default:
        return timestamp;
    }
  };

  // 위치에 따른 단위 결정
  const getUnitForPosition = (position: number): string => {
    const timestamp = minTimestamp + position * totalRange;
    
    for (const segment of segmentTimestamps) {
      if (timestamp >= segment.start && timestamp <= segment.end) {
        return segment.unit;
      }
    }
    
    return 'day'; // 기본값
  };

  // 슬라이더 이동 시 범위 업데이트
  const handleDrag = (e: React.MouseEvent | React.TouchEvent, handle: 'start' | 'end') => {
    e.preventDefault();

    // 마우스 움직임 추적 함수
    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const slider = document.getElementById('date-range-slider');
      if (!slider) return;

      const rect = slider.getBoundingClientRect();
      const sliderWidth = rect.width;
      
      // 마우스/터치 위치 계산
      let clientX: number;
      if ('touches' in moveEvent) {
        clientX = moveEvent.touches[0].clientX;
      } else {
        clientX = moveEvent.clientX;
      }

      // 슬라이더 위치에 대한 상대적 위치 계산 (0-1 사이 값)
      const position = Math.max(0, Math.min(1, (clientX - rect.left) / sliderWidth));
      
      // 현재 위치에 대한 날짜 단위 결정
      const unit = getUnitForPosition(position);
      
      // 타임스탬프로 변환
      let timestamp = minTimestamp + position * totalRange;
      
      // 날짜 단위에 맞게 스냅
      timestamp = snapToUnit(timestamp, unit);
      
      // 시작 또는 끝 핸들에 따라 범위 업데이트
      if (handle === 'start') {
        // 시작이 끝보다 뒤로 가지 않도록 제한
        const newStart = Math.min(timestamp, range[1] - 86400000); // 최소 1일 간격
        setRange([newStart, range[1]]);
      } else {
        // 끝이 시작보다 앞으로 가지 않도록 제한
        const newEnd = Math.max(timestamp, range[0] + 86400000); // 최소 1일 간격
        setRange([range[0], newEnd]);
      }
    };

    // 마우스/터치 종료 함수
    const handleEnd = () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
      
      // 범위 변경 콜백 호출
      onRangeChange({
        start: new Date(range[0]),
        end: new Date(range[1])
      });
    };

    // 이벤트 리스너 등록
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
  };

  // 범위가 변경될 때 콜백 호출
  useEffect(() => {
    onRangeChange({
      start: new Date(range[0]),
      end: new Date(range[1])
    });
  }, []);

  // 마크 생성 - 구간별로 다른 간격의 마크를 표시
  const renderMarks = () => {
    const marks = [];
    
    // 1900-1999: 10년 단위 마크
    for (let year = 1900; year < 2000; year += 10) {
      const date = new Date(year, 0, 1);
      const percent = timestampToPercent(date.getTime());
      marks.push(
        <div 
          key={`mark-${year}`}
          className="absolute w-0.5 h-1.5 bg-gray-500 -mt-0.5" 
          style={{ left: `${percent}%` }}
          title={`${year}`}
        />
      );
    }
    
    // 2000-작년: 1년 단위 마크
    for (let year = 2000; year <= lastYearEnd.getFullYear(); year += 5) { // 5년마다 표시하여 너무 많이 나오지 않게
      const date = new Date(year, 0, 1);
      const percent = timestampToPercent(date.getTime());
      marks.push(
        <div 
          key={`mark-${year}`}
          className="absolute w-0.5 h-1.5 bg-gray-500 -mt-0.5" 
          style={{ left: `${percent}%` }}
          title={`${year}`}
        />
      );
    }
    
    // 올해-지난달: 월 단위 마크
    for (let month = 0; month < lastMonthEnd.getMonth() + 1; month++) {
      const date = new Date(currentYear, month, 1);
      const percent = timestampToPercent(date.getTime());
      marks.push(
        <div 
          key={`mark-${currentYear}-${month}`}
          className="absolute w-0.5 h-1 bg-gray-600 -mt-0.25" 
          style={{ left: `${percent}%` }}
          title={`${currentYear}.${String(month + 1).padStart(2, '0')}`}
        />
      );
    }
    
    // 이번달-오늘: 주 단위 마크
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const today = new Date();
    // 이번달 동안의 각 주의 시작일(일요일)을 찾아서 마크 추가
    for (let day = new Date(firstDayOfMonth); day <= today; day = new Date(day.getTime() + 86400000)) {
      const dayOfWeek = day.getDay();
      if (dayOfWeek === 0) { // 일요일이면 마크 추가
        const percent = timestampToPercent(day.getTime());
        marks.push(
          <div 
            key={`mark-week-${day.getTime()}`}
            className="absolute w-0.5 h-0.75 bg-gray-600 -mt-0.25" 
            style={{ left: `${percent}%` }}
            title={formatDate(day)}
          />
        );
      }
    }
    
    return marks;
  };

  return (
    <div className="w-full px-2 py-3">
      <div className="mb-4 flex justify-between text-gray-300 text-sm">
        <span>개업일 범위: </span>
        <span>
          {formatDate(new Date(range[0]))} - 
          {formatDate(new Date(range[1] - 1))}
        </span>
      </div>
      
      <div 
        id="date-range-slider"
        className="relative h-2 bg-gray-700 rounded-full w-full"
      >
        {/* 구간 표시 */}
        {dateSegments.map((segment, index) => {
          const startPercent = timestampToPercent(segment.start.getTime());
          const endPercent = timestampToPercent(segment.end.getTime());
          const width = endPercent - startPercent;
          return (
            <div 
              key={`segment-${index}`}
              className="absolute h-full bg-gray-600 opacity-50"
              style={{ 
                left: `${startPercent}%`, 
                width: `${width}%`,
                borderRight: index < dateSegments.length - 1 ? '1px solid #4B5563' : 'none'
              }}
              title={segment.label}
            />
          );
        })}
      
        {/* 마크 표시 */}
        {renderMarks()}
        
        {/* 선택된 범위 표시 */}
        <div 
          className="absolute h-full bg-blue-600 rounded-full"
          style={{ 
            left: `${startPercent}%`, 
            width: `${endPercent - startPercent}%` 
          }}
        />
        
        {/* 시작 핸들 */}
        <div 
          className="absolute w-4 h-4 bg-white rounded-full -mt-1 -ml-2 cursor-pointer shadow-lg z-10"
          style={{ left: `${startPercent}%` }}
          onMouseDown={(e) => handleDrag(e, 'start')}
          onTouchStart={(e) => handleDrag(e, 'start')}
        />
        
        {/* 끝 핸들 */}
        <div 
          className="absolute w-4 h-4 bg-white rounded-full -mt-1 -ml-2 cursor-pointer shadow-lg z-10"
          style={{ left: `${endPercent}%` }}
          onMouseDown={(e) => handleDrag(e, 'end')}
          onTouchStart={(e) => handleDrag(e, 'end')}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>1900.01.01</span>
        <span>{formatDate(maxDate)}</span>
      </div>
    </div>
  );
} 