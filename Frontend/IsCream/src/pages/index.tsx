// 🌟 메인 및 공통 페이지
export { default as MainPage } from "./MainPage";
export { default as CalendarPage } from "./CalendarPage";
export { default as MyPage } from "./MyPage";

// 🌟 로그인 및 회원가입 관련
export { default as LoginPage } from "./login/LoginPage";
export { default as SignUpPage } from "./login/SignupPage";

// 🌟 비밀번호 관련 (비밀번호 찾기, 이메일 인증, 비밀번호 재설정)
export { default as FindPasswordPage } from "./account/FindPasswordPage";
export { default as VerifyEmailPage } from "./account/VerifyEmailPage";
export { default as ResetPasswordPage } from "./account/ResetPasswordPage";
export { default as ChangePassword } from "./mypage/ChangePassword";

// 🌟 마이페이지 관련
export { default as ChangeInfo } from "./mypage/ChangeInfo";
export { default as PDFDownload } from "./mypage/PDFDownload";

// 🌟 게시판 관련
export { default as BoardPage } from "./baord/BoardPage";
export { default as BoardCreatePage } from "./baord/BoardCreatePage";
export { default as BoardEditPage } from "./baord/BoardEditPage";
export { default as BoardDetailPage } from "./baord/BoardDetailPage";

// 🌟 채팅 관련
export { default as ChatPage } from "./ChatPage"