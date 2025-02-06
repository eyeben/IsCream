import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FindPasswordForm from "../../components/account/FindPasswordForm";
import axios from "axios";

const FindPasswordPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleFindPassword = async (formData: { email: string; name: string; phone: string }) => {
    try {
      const response = await axios.post("/users/find-password", formData);

      if (response.data.success) {
        navigate("/verify-email", { state: { email: formData.email } }); // 이메일 인증 단계로 이동
      } else {
        setErrorMessage("입력한 정보가 일치하지 않습니다.");
      }
    } catch (error: unknown) { // ✅ error의 타입을 unknown으로 설정
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "비밀번호 찾기 요청 중 오류가 발생했습니다.");
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("비밀번호 찾기 요청 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-6 py-10">
      <h1 className="text-lg font-bold mb-6">비밀번호 찾기</h1>
      
      {/* 🔹 여기서 `onSubmit`을 전달하도록 수정 */}
      <FindPasswordForm onSubmit={handleFindPassword} />
      
      {errorMessage && <p className="mt-4 text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default FindPasswordPage;
