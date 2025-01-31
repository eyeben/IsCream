// Calendar.tsx
import React, { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import DetailView from './DetailView';
import { CalendarProps, CalendarData, DetailResponse } from './types';

const Calendar: React.FC<CalendarProps> = ({ /*childId*/ className }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [calendarData, setCalendarData] = useState<{[key: string]: CalendarData}>({});
  const [selectedDetail, setSelectedDetail] = useState<DetailResponse['data'] | null>(null);

  // 더미 캘린더 데이터
  const dummyCalendarData: {[key: string]: CalendarData} = {
    '15': {
      emoji: '😊',
      isMemo: true,
      isHtp: true
    },
    '16': {
      emoji: '😄',
      isMemo: true,
      isHtp: false
    },
    '20': {
      emoji: '😡',
      isMemo: true,
      isHtp: true
    }
  };

  // 더미 상세 데이터
  const dummyDetailData: { [key: string]: DetailResponse['data'] } = {
    '15': {
      isMemo: true,
      isHtp: true,
      houseUrl: '/sample-house.jpg',
      treeUrl: '/sample-tree.jpg',
      personUrl: '/sample-person.jpg',
      report: "HTP 검사 결과입니다...",
      memoId: "1",
      memo: "오늘은 정말 좋은 하루였습니다."
    },
    '16': {
      isMemo: true,
      isHtp: false,
      memo: "재미있는 일이 많았던 하루!"
    },
    '20': {
      isMemo: true,
      isHtp: true,
      houseUrl: '/sample-house.jpg',
      treeUrl: '/sample-tree.jpg',
      personUrl: '/sample-person.jpg',
      report: "다른 HTP 검사 결과...",
      memoId: "3",
      memo: "힘든 하루였습니다."
    }
  };

  // 달력 데이터 설정
  useEffect(() => {
    setCalendarData(dummyCalendarData);
  }, [currentDate]);

  // 날짜 선택 핸들러
  const handleDayClick = (day: number | null) => {
    setSelectedDay(day);
    if (!day) {
      setSelectedDetail(null);
      return;
    }
    
    if (day !== null) {
      setSelectedDetail(dummyDetailData[day.toString()] || null);
    } else {
      setSelectedDetail(null);
    }
  };

  // 이전/다음 월 이동
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    setSelectedDay(null);
    setSelectedDetail(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    setSelectedDay(null);
    setSelectedDetail(null);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto p-4 ${className}`}>
      <CalendarHeader 
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      <CalendarGrid 
        currentDate={currentDate}
        calendarData={calendarData}
        onSelectDay={handleDayClick}
        selectedDay={selectedDay}
      />

      <div className="border-t mt-4 min-h-[200px] p-4 bg-gray-50">
        <DetailView 
          detail={selectedDetail}
          selectedDate={{
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            day: selectedDay
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;