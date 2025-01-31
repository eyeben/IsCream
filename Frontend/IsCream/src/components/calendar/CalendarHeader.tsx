// CalendarHeader.tsx
import React from 'react';
import { CalendarHeaderProps } from './types';

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {/* 이전 달로 이동하는 버튼 */}
      <button 
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        onClick={onPrevMonth}
        aria-label="이전 달"
      >
        ◀
      </button>

      {/* 현재 년월 표시 */}
      <h2 className="text-2xl font-bold">
        {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
      </h2>

      {/* 다음 달로 이동하는 버튼 */}
      <button 
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        onClick={onNextMonth}
        aria-label="다음 달"
      >
        ▶
      </button>
    </div>
  );
};

export default CalendarHeader;