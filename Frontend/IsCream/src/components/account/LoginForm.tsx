import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios, { AxiosError } from "axios";
import LoginLogo from "../../assets/icons/login_logo.png";
import GoogleLogo from "../../assets/icons/google_logo.png";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.classList.add("no-navbar");
    return () => {
      document.body.classList.remove("no-navbar");
    };
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", { username, password });
      localStorage.setItem("token", response.data.token);
      onLoginSuccess();
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || "로그인 실패!");
    }
  };

  // 구글 로그인 핸들러 (useGoogleLogin 활용)
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;
        // 구글 유저 정보 가져오기
        const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        // 백엔드에 사용자 정보 전송
        const response = await axios.post("/users/join/oauth2", {
          email: userInfo.data.email,
          name: userInfo.data.name,
          googleToken: access_token,
        });

        // 토큰 저장 및 로그인 성공 처리
        localStorage.setItem("token", response.data.token);
        onLoginSuccess();
      } catch (error) {
        console.error("Google 로그인 오류:", error);
        setError("Google 로그인에 실패했습니다.");
      }
    },
    onError: () => {
      setError("Google 로그인에 실패했습니다.");
    },
    flow: "implicit", // 토큰을 직접 받아오는 방식
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-6 pt-16 overflow-hidden">
      <img src={LoginLogo} alt="로고" className="w-60 h-60 sm:w-48 sm:h-48 mb-6 rounded-lg" />

      <div className="w-full max-w-md mt-4">
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
        <button
          className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleLogin}
        >
          로그인
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* 구글 로그인 버튼 */}
      <div className="w-full flex flex-col items-center mt-8">
        <button onClick={() => googleLogin()} className="flex items-center justify-center">
          <img src={GoogleLogo} alt="Google 로그인" className="w-12 h-12" />
        </button>

        {/* 비밀번호 찾기 & 회원가입 */}
        <div className="mt-4 flex items-center w-full justify-center">
          <a href="/forgot-password" className="hover:underline mr-2">비밀번호 찾기</a>
          <span className="mx-2">|</span>
          <a href="/signup" className="hover:underline ml-2">회원가입</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
