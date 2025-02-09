import { Education } from "@/types/education";
import EducationCard from "./EducationCard";

interface EducationListProps {
  educations: Education[];
  onVideoClick?: (videoUrl: string) => void;
}

const EducationList = ({ educations, onVideoClick }: EducationListProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      {educations.map((education, index) => (
        <EducationCard key={index} {...education} onVideoClick={onVideoClick} />
      ))}
    </div>
  );
};

export default EducationList;
