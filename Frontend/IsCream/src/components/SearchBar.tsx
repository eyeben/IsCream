import React from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string; // placeholder prop 추가
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  className,
  placeholder = "무슨 일이 있었나요?" // 기본값 설정
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className={`relative w-[95%] h-[75px] mx-auto ${className}`}>
      <div className="relative w-full h-full flex items-center">
        <input
          type="text"
          placeholder={placeholder} // props로 받은 placeholder 사용
          className="w-full h-[45px] pl-4 pr-12 rounded-lg border border-gray-200 focus:outline-none text-gray-700"
          onChange={handleSearch}
        />
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-gray-500"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path
              d="M21 21L16.65 16.65"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
