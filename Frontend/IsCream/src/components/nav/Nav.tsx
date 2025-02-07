import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import boardIcon from "../../assets/icons/nav_board.png";
import calendarIcon from "../../assets/icons/nav_calander.png";
import homeIcon from "../../assets/icons/nav_home.png";
import chatIcon from "../../assets/icons/nav_chat.png";
import mypageIcon from "../../assets/icons/nav_mypage.png";
import boardActiveIcon from "../../assets/icons/nav_active_board.png";
import calendarActiveIcon from "../../assets/icons/nav_active_calander.png";
import homeActiveIcon from "../../assets/icons/nav_active_home.png";
import chatActiveIcon from "../../assets/icons/nav_active_chat.png";
import mypageActiveIcon from "../../assets/icons/nav_active_mypage.png";

interface NavItem {
  id: string;
  path: string;
  icon: string;
  activeIcon: string;
  label: string;
}

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Nav 바를 숨길 경로들을 지정
  // 예시: 로그인(/login), 회원가입(/signup) 페이지에서는 Nav 바를 숨기고 싶을 때
  // const excludePaths = ['/login', '/signup', '/register', '/forgot-password'];
  const excludePaths: string[] = ['/htp'];

  // 현재 경로가 제외 경로에 포함되어 있으면 Nav 바를 숨김
  if (excludePaths.includes(currentPath)) return null;

  const navItems: NavItem[] = [
    {
      id: "board",
      path: "/board",
      icon: boardIcon,
      activeIcon: boardActiveIcon,
      label: "게시판"
    },
    {
      id: "calendar",
      path: "/calendar",
      icon: calendarIcon,
      activeIcon: calendarActiveIcon,
      label: "일정"
    },
    {
      id: "home",
      path: "/",
      icon: homeIcon,
      activeIcon: homeActiveIcon,
      label: "홈"
    },
    {
      id: "chat",
      path: "/chat",
      icon: chatIcon,
      activeIcon: chatActiveIcon,
      label: "채팅"
    },
    {
      id: "mypage",
      path: "/mypage",
      icon: mypageIcon,
      activeIcon: mypageActiveIcon,
      label: "마이페이지"
    }
  ];

  return (
    <nav className="fixed bottom-0 pt-1rem left-0 w-full h-20 bg-white border-gray-200 shadow-[0_-4px_4px_0_rgba(0,0,0,0.05)] rounded-t-[15px]">
      <div className="max-w-screen-sm mx-auto h-full">
        <div className="flex justify-between items-center h-full px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center p-2
               ${currentPath === item.path ? "bg-white" : "hover:bg-white cursor-pointer"}`}
              onClick={() => navigate(item.path)}
              type="button"
            >
              <img
                src={currentPath === item.path ? item.activeIcon : item.icon}
                alt={item.label}
                className={`w-6 h-6 mb-1`}
              />
              <span
                className={`text-xs font-medium 
               ${currentPath === item.path ? "text-[#009E28]" : "text-gray-500"}`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
