import React from "react";
import { CalendarGridProps } from "./types";

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  calendarData,
  onSelectDay,
  selectedDay
}) => {
  // 오늘 날짜 체크 함수
  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  // 요일 배열 정의
  const weekDays = [
    { day: "일", className: "text-red-500" },
    { day: "월", className: "" },
    { day: "화", className: "" },
    { day: "수", className: "" },
    { day: "목", className: "" },
    { day: "금", className: "" },
    { day: "토", className: "text-blue-500" }
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
              ${!day ? "bg-white" : " cursor-pointer"}
              aspect-square border rounded-lg p-2 
              ${isSunday(index) ? "text-red-500" : ""}
              ${isSaturday(index) ? "text-blue-500" : ""}
              relative
            `}
              onClick={() => day && onSelectDay(day)}
            >
              <div className="relative">
                {/* 날짜 표시 */}
                <span className="absolute text-xs ">{day}</span>
                {/* 선택된 날짜 표시 */}
                {selectedDay === day && (
                  <div className="absolute w-3 h-3 bg-yellow-200 rounded-full -z-10" />
                )}
                {/* 오늘 날짜 표시 */}
                {isToday(day) && (
                  <div className="absolute top-1 left-1 w-4 h-4 rounded-full -z-10" />
                )}
              </div>

              {/* HTP 검사가 있을 때만 이모지 표시 */}
              {dayData?.isHtp && (
                <div className="absolute top-3/4 left-6 transform -translate-x-1/2 -translate-y-1/2">
                  {dayData.emoji}
                </div>
              )}

              {/* 메모가 있을 때만 빨간 점 표시 */}
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
