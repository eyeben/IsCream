import { useEffect } from "react";
import LoginForm from "../components/account/LoginForm";

const LoginPage: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // 🔥 스크롤 차단
    document.body.style.position = "relative";  // 🔥 fixed → relative로 변경

    return () => {
      document.body.style.overflow = "auto"; // 페이지 나갈 때 원상 복구
      document.body.style.position = "static";
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative">
      {/* 로그인 폼 */}
      <LoginForm onLoginSuccess={() => console.log("로그인 성공!")} />
    </div>
  );
};

export default LoginPage;
