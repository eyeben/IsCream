import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNavigation from "./components/nav/Nav";
import Header from "./components/header/Header_Normal";
// pages/index.tsx 폴더에 경로를 지정하고, 여기서는 페이지 이름만 가져와서 사용하면 됩니다.
import { 
  CalendarPage, 
  MyReport,
  ChangeInfo
} from './pages';


function App() { 
  return (
    <BrowserRouter>
      <Header />
      <div className="w-[95%] mx-auto pb-20">
        {/* 공통 스타일을 최상위 div에 적용 */}
        <Routes>
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/" element={<div>메인페이지</div>} />
          <Route path="/board" element={<div>게시판</div>} />
          <Route path="/chat" element={<div>채팅</div>} />
          <Route path="/mypage" element={<MyReport />} />
          <Route path="/mypage/ChangeInfo" element={<ChangeInfo />} />
        </Routes>
      </div>
      <BottomNavigation />
    </BrowserRouter>
  );
}

export default App;
