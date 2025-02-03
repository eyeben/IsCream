import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import BottomNavigation from "./components/nav/Nav";
import Header from "./components/header/Header"

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
          <Route path="/mypage" element={<div>마이페이지</div>} />
        </Routes>
      </div>
      <BottomNavigation />
    </BrowserRouter>
  );
}

export default App;
