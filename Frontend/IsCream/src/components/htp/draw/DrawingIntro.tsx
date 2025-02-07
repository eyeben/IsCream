import React from "react";
import LongButton from "../../button/LongButton";

interface DrawingIntroProps {
  title: string;
  description: string[];
  imageUrl: string;
  onStart: () => void;
}

const DrawingIntro: React.FC<DrawingIntroProps> = ({ title, description, imageUrl, onStart }) => {
  return (
    <div className="bg-[#EAF8E6] min-h-screen flex flex-col items-center justify-center">
      {/* ✅ 제목 */}
      <h1 className="text-3xl font-bold text-green-700 mb-4">{title}</h1>

      {/* ✅ 흰 배경 안의 콘텐츠 */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl flex flex-col items-center">
        
        {/* ✅ 이미지 */}
        <img src={imageUrl} alt="Drawing Example" className="w-full max-h-60 object-contain mb-6" />

        {/* ✅ 설명 텍스트 */}
        <div className="text-lg text-gray-700 text-center space-y-2">
          {description.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>

      {/* ✅ 버튼 (흰 배경 아래에 위치) */}
      <div className="mt-6 w-full flex justify-center">
        <LongButton color="green" onClick={onStart} className="w-[90%] max-w-md">
          그림 시작하기
        </LongButton>
      </div>
    </div>
  );
};

export default DrawingIntro;
