import { useState } from "react";
import axios, { AxiosError } from "axios";
import GoogleIcon from "../../assets/icons/google_logo.png";
import LoginLogo from "../../assets/icons/login_logo.png";

interface LoginFormProps {
  onLoginSuccess: () => void; // 로그인 성공 시 실행할 함수 (예: 리디렉션)
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ 일반 로그인 API 연결
  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", { username, password });
      localStorage.setItem("token", response.data.token);
      alert("로그인 성공!");
      onLoginSuccess();
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ message: string }>)?.response?.data?.message ||
        "로그인 실패! 아이디와 비밀번호를 확인하세요.";
      setError(errorMessage);
    }
  };

  // ✅ 구글 로그인 API 연결
  const handleGoogleLogin = async () => {
    try {
      const googleLoginURL = "https://accounts.google.com/o/oauth2/auth";
      const clientId = "YOUR_GOOGLE_CLIENT_ID"; // 🔥 구글 클라이언트 ID
      const redirectUri = "http://localhost:5173/auth/callback"; // 🔥 로그인 후 리디렉션할 URL
      const scope = "email profile"; // 🔥 사용자 이메일 & 프로필 권한 요청

      // 구글 로그인 URL 생성
      const authURL = `${googleLoginURL}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

      // 구글 로그인 페이지로 이동
      window.location.href = authURL;
    } catch (err) {
      console.error("구글 로그인 오류:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-6">
      {/* 로고 */}
      <img src={LoginLogo} alt="로고" className="w-40 h-40 sm:w-48 sm:h-48 mb-6 rounded-lg" />

      {/* 입력 필드 */}
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="아이디"
          className="w-full p-3 mb-4 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full p-3 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ✅ 로그인 버튼 크기 수정 → 항상 아이디/비밀번호 입력 필드와 동일한 너비 유지 */}
        <button
          className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleLogin}
        >
          로그인
        </button>
      </div>

      {/* 오류 메시지 */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* 소셜 로그인 */}
      <div className="mt-6 flex items-center justify-center">
        <button onClick={handleGoogleLogin}>
          <img src={GoogleIcon} alt="Google 로그인" className="w-12 h-12 cursor-pointer" />
        </button>
      </div>

      {/* 비밀번호 찾기 & 회원가입 */}
      <p className="mt-4 text-gray-600">비밀번호 찾기 | 회원가입</p>
    </div>
  );
};

export default LoginForm;
