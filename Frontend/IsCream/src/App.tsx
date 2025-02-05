import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNavigation from "./components/nav/Nav";
import Header from "./components/header/Header";
import LoginPage from "./pages/login/LoginPage"; // 경로 확인

// pages/index.tsx 폴더에 경로를 지정하고, 여기서는 페이지 이름만 가져와서 사용하면 됩니다.
import {
  CalendarPage,
  MyPage,
  ChangeInfo,
  MainPage,
  BoardMain,
  PDFDownload
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="w-[95%] mx-auto pb-20 bg-white mt-15">
        {/* 공통 스타일을 최상위 div에 적용 */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/board" element={<BoardMain />} />
          <Route path="/chat" element={<div>채팅</div>} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/ChangeInfo" element={<ChangeInfo />} />
          <Route path="/mypage/PDFDownload" element={<PDFDownload />} />
          {/* <Route path="/mypage" element={<div>마이페이지</div>} /> */}
          {/* 메인 페이지 카드 라우터 추가 */}
          <Route path="/login" element={<LoginPage />} />{" "}
          {/* 로그인 페이지 등록 */}
          <Route path="/ai-analysis" element={<div>AI HTP검사 페이지</div>} />
          <Route
            path="/parenting-test"
            element={<div>부모양육태도 검사</div>}
          />
          <Route path="/big5-test" element={<div>성격5요인 검사</div>} />
          <Route path="/find-center" element={<div>센터찾기</div>} />
          <Route path="/recommend" element={<div>추천교육</div>} />
        </Routes>
      </div>
      <BottomNavigation />
    </BrowserRouter>
  );
}

export default App;
