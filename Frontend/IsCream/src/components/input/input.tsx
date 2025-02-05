interface InputProps {
  placeholder?: string;
  type?: "email" | "tel" | "text" | "password" | "calendar" | "password"; // ✅ password 추가
  required?: boolean;
  className?: string;
  withButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  value?: string;
  onChange?: (value: string) => void;
}

const Input = ({
  placeholder = "",
  type = "email",
  required = false,
  className = "",
  withButton = false,
  buttonText = "중복 확인",
  onButtonClick,
  value,
  onChange,
}: InputProps) => {
  const inputType = type === "calendar" ? "date" : type; // ✅ password 타입 지원

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="w-[95%]">
      <div className="w-full max-w-[706px] p-3 bg-white border border-gray-300 rounded flex items-center">
        <input
          type={inputType} // ✅ type="password" 지원됨
          placeholder={placeholder}
          required={required}
          className={`flex-1 outline-none ${className}`}
          value={value}
          onChange={handleInputChange}
        />
        {withButton && (
          <button
            onClick={onButtonClick}
            className="px-2 py-0 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
