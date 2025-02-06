import { useState } from "react";

interface ResetPasswordFormProps {
  onSubmit: (password: string, confirmPassword: string) => void;
}

const ResetPasswordForm = ({ onSubmit }: ResetPasswordFormProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,15}$)/;
    return regex.test(password);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError("비밀번호는 8~15자리이며, 숫자 및 특수문자를 포함해야 합니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setPasswordError("비밀번호가 조건을 충족하지 않습니다.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }

    onSubmit(password, confirmPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <label className="block text-gray-700 font-semibold">새 비밀번호 *</label>
      <input
        type="password"
        placeholder="새 비밀번호 입력"
        value={password}
        onChange={handleChangePassword}
        className="border p-2 w-full rounded"
      />
      <p className="text-sm text-red-500">{passwordError}</p>

      <label className="block text-gray-700 font-semibold">비밀번호 확인 *</label>
      <input
        type="password"
        placeholder="비밀번호 다시 입력"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
      >
        비밀번호 재설정
      </button>
    </form>
  );
};

export default ResetPasswordForm;
