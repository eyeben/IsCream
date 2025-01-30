import React, { useState } from 'react';
import boardIcon from '../assets/icons/nav_board.png'
import calendarIcon from '../assets/icons/nav_calander.png';
import homeIcon from '../assets/icons/nav_home.png';
import chatIcon from '../assets/icons/nav_chat.png';
import mypageIcon from '../assets/icons/nav_mypage.png';
// import boardActiveIcon from '../assets/icons/nav_active_board.png';
// import calendarActiveIcon from '../assets/icons/nav_active_calander.png';
// import homeActiveIcon from '../assets/icons/nav_active_home.png';
// import chatActiveIcon from '../assets/icons/nav_active_chat.png';
// import mypageActiveIcon from '../assets/icons/nav_active_mypage.png';

interface NavItem {
  id: string;
  icon: string;
  label: string;
}

const BottomNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  const navItems: NavItem[] = [
    { 
      id: 'board', 
      icon: boardIcon,
      label: '게시판' 
    },
    { 
      id: 'calendar', 
      icon: calendarIcon,
      label: '일정' 
    },
    { 
      id: 'home', 
      icon: homeIcon,
      label: '홈' 
    },
    { 
      id: 'chat', 
      icon: chatIcon,
      label: '채팅' 
    },
    { 
      id: 'mypage', 
      icon: mypageIcon,
      label: '마이페이지' 
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full h-20 bg-white border-gray-200 shadow-[0_-4px_4px_0_rgba(0,0,0,0.05)] rounded-t-[15px]">
      <div className="max-w-screen-sm mx-auto h-full">
        <div className="flex justify-between items-center h-full px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center p-2
                ${activeTab === item.id 
                  ? 'bg-blue-50' 
                  : 'hover:bg-gray-50'
                }`}
              onClick={() => setActiveTab(item.id)}
              type="button"
            >
              <img 
                src={item.icon} 
                alt={item.label}
                className={`w-6 h-6 mb-1`}
              />
              <span className={`text-xs font-medium 
                ${activeTab === item.id 
                  ? 'text-blue-600' 
                  : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
);
}
export default BottomNavigation;