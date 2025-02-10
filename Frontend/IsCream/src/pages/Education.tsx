// pages/education/index.tsx
import { useState } from "react";
import type { Education } from "@/types/education";
import EducationList from "../components/education/EducationList";
import EducationFilter from "../components/education/EducationFilter";

const EducationPage = () => {
  const [isRecommended, setIsRecommended] = useState(true);

  const sampleEducations: Education[] = [
    {
      imageUrl: "https://picsum.photos/seed/1/640/360",
      title: "수아 심리 상담센터",
      videoUrl: "https://youtube.com/watch?v=1",
      description: "우리 아이의 심리를 이해하고 건강한 성장을 돕는 가이드"
    },
    {
      imageUrl: "https://picsum.photos/seed/2/640/360",
      title: "아이의 불안을 해결하는 법!",
      videoUrl: "https://youtube.com/watch?v=2",
      description: "아이의 불안 증세를 이해하고 해결하는 방법"
    },
    {
      imageUrl: "https://picsum.photos/seed/3/640/360",
      title: "부모의 권위를 한 순간에 잃는 말들",
      videoUrl: "https://youtube.com/watch?v=3",
      description: "효과적인 의사소통으로 아이와 신뢰 관계 형성하기"
    }
  ];

  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, "_blank");
  };

  const displayEducations = isRecommended
    ? sampleEducations.slice(0, 2)
    : sampleEducations;

  return (
    <div className="min-h-screen bg-white">
      {/* 필터 */}
      <div className="mt-4">
        <EducationFilter
          isRecommended={isRecommended}
          onToggle={setIsRecommended}
        />
      </div>

      {/* 교육 목록 */}
      <div className="px-4 pb-20">
        <EducationList
          educations={displayEducations}
          onVideoClick={handleVideoClick}
        />
      </div>
    </div>
  );
};

export default EducationPage;
