import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNavigation from "./components/nav/Nav";
import Header from "./components/header/Header";
// import LoginPage from "./pages/login/LoginPage"; // 경로 확인
// import SignUpPage from "./pages/login/SignupPage";
// import LoginPage from "./pages/login/LoginPage";

// pages/index.tsx 폴더에 경로를 지정하고, 여기서는 페이지 이름만 가져와서 사용하면 됩니다.
import {
  CalendarPage,
  MyPage,
  ChangeInfo,
  ChangePassword,
  MainPage,
  PDFDownload,
  BoardPage,
  BoardCreatePage,
  BoardEditPage,
  BoardDetailPage,
  LoginPage,
  SignUpPage
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="w-[95%] mx-auto pb-20 bg-white pt-15 min-h-screen">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          {/* 게시판 관련 라우트 */}
          <Route path="/board" element={<BoardPage />} />
          <Route path="/board/write" element={<BoardCreatePage />} />
          <Route path="/board/edit/:postId" element={<BoardEditPage />} />
          <Route path="/board/detail/:postId" element={<BoardDetailPage />} />
          <Route path="/chat" element={<div>채팅</div>} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/changeInfo" element={<ChangeInfo />} />
          <Route path="/mypage/changeInfo/password" element={<ChangePassword />} />
          <Route path="/mypage/PDFDownload" element={<PDFDownload />} />
          {/* <Route path="/mypage" element={<div>마이페이지</div>} /> */}
          {/* 메인 페이지 카드 라우터 추가 */}
          <Route path="/login" element={<LoginPage />} />{" "}
          <Route path="/signup" element={<SignUpPage />} />
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
