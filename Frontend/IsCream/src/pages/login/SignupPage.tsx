import { useState } from "react";
import Input from "../../components/input/input";
import LongButton from "../../components/button/LongButton";
import axios from "axios";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phone: "",
    relation: "",
    birthDate: "",
  });

  const [buttonText, setButtonText] = useState("회원가입 하기");

  // ✅ `onChange`에서 문자열 값만 받도록 변경
  const handleChange = (name: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setButtonText("처리 중...");
    try {
      const response = await axios.post("/users/join", formData);
      console.log("회원가입 성공!", response.data);
      setButtonText("가입 완료!");
    } catch (error) {
      console.error("회원가입 실패", error);
      setButtonText("회원가입 하기");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-6 pt-10">
      <h1 className="text-lg font-bold mb-6">아이’s 그림</h1>

      <div className="w-full max-w-md flex flex-col items-center">
        <label className="w-full text-gray-700 font-semibold text-left">이메일 아이디 *</label>
        <Input
          placeholder="example@naver.com"
          type="email"
          required={true}
          value={formData.email}
          onChange={handleChange("email")}
          withButton={true}
          onButtonClick={() => console.log("이메일 중복 확인")}
        />

        <label className="w-full text-gray-700 font-semibold text-left">닉네임 *</label>
        <Input
          placeholder="닉네임을 입력해주세요."
          type="text"
          required={true}
          value={formData.nickname}
          onChange={handleChange("nickname")}
          withButton={true}
          onButtonClick={() => console.log("닉네임 중복 확인")}
        />

        <label className="w-full text-gray-700 font-semibold text-left">비밀번호 입력 *</label>
        <Input
          placeholder="비밀번호를 입력해주세요."
          type="text"
          required={true}
          value={formData.password}
          onChange={handleChange("password")}
        />

        <label className="w-full text-gray-700 font-semibold text-left">비밀번호 확인 *</label>
        <Input
          placeholder="비밀번호를 확인해주세요."
          type="text"
          required={true}
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
        />

        <label className="w-full text-gray-700 font-semibold text-left">전화번호 *</label>
        <Input
          placeholder="010-1234-5668"
          type="tel"
          required={true}
          value={formData.phone}
          onChange={handleChange("phone")}
        />

        <label className="w-full text-gray-700 font-semibold text-left">생년월일 *</label>
        <Input
          placeholder="YYYY.MM.DD"
          type="calendar"
          required={true}
          value={formData.birthDate}
          onChange={handleChange("birthDate")}
        />
      </div>

      <LongButton onClick={handleSubmit} color="green" className="text-black mt-6 w-full max-w-md bg-green-100 border border-green-500 text-black font-semibold px-4 py-2">
        {buttonText}
      </LongButton>
    </div>
  );
};

export default SignUpPage;
