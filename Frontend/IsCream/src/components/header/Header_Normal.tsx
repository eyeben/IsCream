import { useState, useEffect } from "react";
import BackIcon from "../../assets/icons/header_back.png";
import NotifyIcon from "../../assets/icons/header_notify.png";

interface HeaderProps {
  onBackClick?: () => void;
  onNotificationClick?: () => void;
}

const Header = ({ onBackClick, onNotificationClick }: HeaderProps) => {
  const [hasUnreadNotification, setHasUnreadNotification] = useState(false);

  useEffect(() => {
    console.log("BackIcon 경로:", BackIcon);
    console.log("NotifyIcon 경로:", NotifyIcon);

    // 알림 상태를 가져오는 함수 (예제 로직, 실제 API 연동 필요)
    const checkNotifications = () => {
      setHasUnreadNotification(true); // 알림이 있을 때 true
    };

    checkNotifications();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full max-w-screen-sm bg-white border-b border-gray-200 z-50 rounded-b-[15px]">
      <div className="flex items-center justify-between h-[52px] px-4 w-full">
        {/* 뒤로가기 버튼 (아래 왼쪽 모서리 둥글게) */}
        <button
          type="button"
          onClick={onBackClick}
          className="p-2 w-[40px] h-[40px] rounded-bl-[10px] flex items-center justify-center"
          aria-label="뒤로가기"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* 제목 */}
        <h1 className="flex-1 text-center text-base font-medium text-gray-900">
          아이’s 그림
        </h1>

        {/* 알림 버튼 */}
        <button
          type="button"
          onClick={onNotificationClick}
          className="p-2 w-[40px] h-[40px] relative flex items-center justify-center"
          aria-label="알림"
        >
          <div className="relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            {hasUnreadNotification && (
              <span
                className="absolute right-[-10px] top-[-4px] h-2 w-2 rounded-full bg-red-500 border border-white"
                aria-label="읽지 않은 알림"
              />
            )}
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
