// CalendarGrid.tsx
import React from 'react';
import { CalendarGridProps } from './types';

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  calendarData,
  onSelectDay,
  selectedDay
}) => {
  // 요일 배열 정의
  const weekDays = [
    { day: '일', className: 'text-red-500' },
    { day: '월', className: '' },
    { day: '화', className: '' },
    { day: '수', className: '' },
    { day: '목', className: '' },
    { day: '금', className: '' },
    { day: '토', className: 'text-blue-500' },
  ];

  // 해당 월의 날짜 배열을 생성하는 함수
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    // 첫 주의 시작 전 빈 칸 채우기
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    // 해당 월의 날짜 채우기
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i);
    }
    return days;
  };

  // 일요일 체크
  const isSunday = (index: number) => {
    return index % 7 === 0;
  };
  
  // 토요일 체크
  const isSaturday = (index: number) => {
    return index % 7 === 6;
  };

  return (
    <>
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-4 mb-4">
        {weekDays.map(({ day, className }) => (
          <div key={day} className={`text-center font-medium ${className}`}>
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-2">
        {getDaysInMonth().map((day, index) => {
          const dayData = day ? calendarData[day] : null;
          
          return (
            <div
              key={index}
              className={`
                aspect-square border rounded-lg p-2 
                ${!day ? 'bg-gray-50' : 'hover:bg-gray-50 cursor-pointer'}
                ${isSunday(index) ? 'text-red-500' : ''}
                ${isSaturday(index) ? 'text-blue-500' : ''}
                ${selectedDay === day ? 'bg-blue-50 border-blue-300' : ''}
                relative
              `}
              onClick={() => day && onSelectDay(day)}
            >
              {/* 날짜 표시 */}
              <span className="absolute top-1 left-1 text-xs">{day}</span>

              {/* 이모지 표시 */}
              {dayData?.emoji && (
                <div className="absolute top-3/4 left-6 transform -translate-x-1/2 -translate-y-1/2 ">
                  {dayData.emoji}
                </div>
              )}

              {/* 메모/HTP 표시 */}
              <div className="absolute top-1.5 right-1 flex gap-1">
                {dayData?.isMemo && (
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CalendarGrid;