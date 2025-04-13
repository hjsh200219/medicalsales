'use client';

import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

interface DatePickerInputProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  minDate?: Date;
  placeholderText: string;
  className?: string;
  showMonthYearPicker?: boolean;
  showYearPicker?: boolean;
  dateFormat?: string;
}

interface PopperProps {
  strategy: "absolute" | "fixed";
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  selected,
  onChange,
  selectsStart,
  selectsEnd,
  startDate,
  endDate,
  minDate,
  placeholderText,
  className = "w-full h-10 px-2 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center",
  showMonthYearPicker = false,
  showYearPicker = false,
  dateFormat = "yyyy.MM.dd"
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후에만 window에 접근
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 초기 체크
    checkMobile();
    
    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkMobile);
    
    // 클린업
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <ReactDatePicker
      selected={selected}
      onChange={onChange}
      selectsStart={selectsStart}
      selectsEnd={selectsEnd}
      startDate={startDate}
      endDate={endDate}
      minDate={minDate}
      locale={ko}
      dateFormat={dateFormat}
      className={className}
      placeholderText={placeholderText}
      showMonthYearPicker={showMonthYearPicker}
      showYearPicker={showYearPicker}
      withPortal={isMobile}
      popperProps={{
        strategy: "fixed"
      } as PopperProps}
    />
  );
};

export default DatePickerInput; 