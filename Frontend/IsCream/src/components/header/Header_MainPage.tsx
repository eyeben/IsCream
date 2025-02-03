import { useState, useEffect } from "react";

interface Child {
  id: number;
  nickname: string;
}

interface HeaderProps {
  onBackClick?: () => void;
  onNotificationClick?: () => void;
  onChildSelect: (childName: string) => void;
}

const Header = ({ onBackClick, onNotificationClick, onChildSelect }: HeaderProps) => {
  const [hasUnreadNotification, setHasUnreadNotification] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch("/api/children", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("자녀 목록을 불러오는 데 실패했습니다.");
        }

        const data = await response.json();
        if (data.code === "S0000" && data.data.length > 0) {
          setChildren(data.data);
          setSelectedChild(data.data[0].nickname);
          onChildSelect(data.data[0].nickname);
        }
      } catch (error) {
        console.error("자녀 목록 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications/unread", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("알림 데이터를 불러오는 데 실패했습니다.");
        }

        const data = await response.json();
        setHasUnreadNotification(data.hasUnread);
      } catch (error) {
        console.error("알림 조회 실패:", error);
      }
    };

    fetchChildren();
    fetchNotifications();
  }, [onChildSelect]);

  return (
    <header className="fixed top-0 left-0 w-full max-w-screen-sm bg-white border-b border-gray-200 z-50 rounded-b-[15px]">
      <div className="flex items-center justify-between h-[52px] px-4 w-full">
        {/* 뒤로가기 버튼 */}
        <button
          type="button"
          onClick={onBackClick}
          className="p-2 w-[40px] h-[40px] rounded-bl-[10px]"
          aria-label="뒤로가기"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* 중앙 자녀 선택 드롭다운 */}
        <div className="relative flex justify-center items-center ml-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-[16px] font-medium text-gray-900 relative z-10"
          >
            {loading ? "로딩 중..." : selectedChild || "자녀 선택"}
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-full mt-1 w-[200px] rounded-lg bg-white py-2 shadow-lg border border-gray-200">
              {children.length > 0 ? (
                children.map((child) => (
                  <button
                    key={child.id}
                    className="w-full px-4 py-2 text-left text-[14px] hover:bg-gray-50"
                    onClick={() => {
                      setSelectedChild(child.nickname);
                      setIsOpen(false);
                      onChildSelect(child.nickname);
                    }}
                  >
                    {child.nickname}
                  </button>
                ))
              ) : (
                <p className="text-center p-2 text-gray-500">자녀 없음</p>
              )}
            </div>
          )}
        </div>

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
