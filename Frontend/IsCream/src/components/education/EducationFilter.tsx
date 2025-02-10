// components/education/EducationFilter.tsx
interface EducationFilterProps {
  isRecommended: boolean;
  onToggle: (value: boolean) => void;
}

const EducationFilter = ({ isRecommended, onToggle }: EducationFilterProps) => {
  return (
    <div className="max-w-2xl mx-auto mb-6 px-4">
      <label className="inline-flex items-center cursor-pointer gap-3">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={isRecommended}
            onChange={(e) => onToggle(e.target.checked)}
            className="appearance-none w-5 h-5 border-2 border-black rounded-full bg-white transition-colors cursor-pointer"
          />
          {isRecommended && (
            <svg
              className="absolute w-3 h-3 pointer-events-none"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className="text-sm">
          <span className="text-[#FEB200]">우리 아이</span>에게 추천하는 영상만
          보기
        </span>
      </label>
    </div>
  );
};

export default EducationFilter;
