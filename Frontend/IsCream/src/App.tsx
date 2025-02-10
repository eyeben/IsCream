// import { QueryClientProvider } from '@tanstack/react-query';
// import { queryClient } from '@/utils/common/queryClient';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNavigation from "./components/nav/Nav";
import Header from "./components/header/Header";

// pages 폴더에서 필요한 컴포넌트들을 가져옴
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
  SignUpPage,
  FindPasswordPage,
  VerifyEmailPage,
  ResetPasswordPage,
  ChatPage,
  ChatRoomPage,
  CenterPage,
  CanvasPage,
  AiAnalysisPage,
  CameraPage,
  PhotoCapturePage,
  HTPResultsPage,
  Education
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="w-[95%] mx-auto pb-20 bg-white pt-15 min-h-screen">
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<MainPage />} />

          {/* 캘린더 */}
          <Route path="/calendar" element={<CalendarPage />} />

          {/* 게시판 관련 라우트 */}
          <Route path="/board" element={<BoardPage />} />
          <Route path="/board/write" element={<BoardCreatePage />} />
          <Route path="/board/edit/:postId" element={<BoardEditPage />} />
          <Route path="/board/detail/:postId" element={<BoardDetailPage />} />

          {/* 채팅 */}
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/room/:roomId" element={<ChatRoomPage />} />

          {/* 마이페이지 관련 라우트 */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/changeInfo" element={<ChangeInfo />} />
          <Route
            path="/mypage/changeInfo/password"
            element={<ChangePassword />}
          />
          <Route path="/mypage/PDFDownload" element={<PDFDownload />} />

          {/* 로그인 및 회원가입 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* 비밀번호 찾기 관련 라우트 */}
          <Route path="/find-password" element={<FindPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* ✅ HTP 검사 (그림판) 추가 */}
          <Route path="/htp" element={<CanvasPage />} />
          
          {/* ✅ 새롭게 추가된 HTP 촬영 흐름 */}
          <Route path="/ai-analysis" element={<AiAnalysisPage />} />
          <Route path="/photo-capture" element={<PhotoCapturePage />} /> {/* 📌 추가 */}
          <Route path="/camera" element={<CameraPage />} /> {/* 기존과 동일 */}
          <Route path="/htp-results" element={<HTPResultsPage />} />
          
          {/* 기타 기능 */}
          <Route path="/ai-analysis" element={<div>AI HTP검사 페이지</div>} />
          <Route
            path="/parenting-test"
            element={<div>부모양육태도 검사</div>}
          />
          <Route path="/big5-test" element={<div>성격5요인 검사</div>} />
          <Route path="/find-center" element={<CenterPage />} />
          <Route path="/recommend" element={<Education />} />
        </Routes>
      </div>
      <BottomNavigation />
    </BrowserRouter>
  );
}

export default App;
