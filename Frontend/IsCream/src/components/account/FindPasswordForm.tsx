import { useState } from "react";

interface FindPasswordFormProps {
  onSubmit: (formData: { email: string; name: string; phone: string }) => void;
}

const FindPasswordForm = ({ onSubmit }: FindPasswordFormProps) => {
  const [formData, setFormData] = useState({ email: "", name: "", phone: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-4">
      <input type="text" name="name" placeholder="이름" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
      <input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} className="border p-2 w-full" />
      <input type="tel" name="phone" placeholder="전화번호" value={formData.phone} onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">다음</button>
    </form>
  );
};

export default FindPasswordForm;
