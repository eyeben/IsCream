import { useState, useEffect } from "react";
import DrawingIntro from "../components/htp/draw/DrawingIntro";
import Canvas from "../components/htp/draw/Canvas";

const DRAWING_STEPS = [
  { type: "house", title: "집 (HOUSE)", imageUrl: "/images/house.png" },
  { type: "tree", title: "나무 (TREE)", imageUrl: "/images/tree.png" },
  { type: "male", title: "사람 (PERSON)", imageUrl: "/images/person.png" },
  { type: "female", title: "반대 성별 (PERSON)", imageUrl: "/images/person.png" },
];

const CanvasPage = () => {
  const [step, setStep] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const childId = 123;

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-[#EAF8E6] overflow-hidden">
      {!isDrawing ? (
        <DrawingIntro
          title={DRAWING_STEPS[step].title}
          description={[
            "휴대폰을 세로로 두고 그림을 그려주세요!",
            "도구를 이용하지 않고 손가락만 사용해주세요!",
            "검은색만 사용할 거예요!",
            "그림 실력을 검사하는 것이 아니에요!",
            "즐거운 마음으로 그림을 그려 주세요!",
          ]}
          imageUrl={DRAWING_STEPS[step].imageUrl}
          onStart={() => setIsDrawing(true)}
        />
      ) : (
        <Canvas
          type={DRAWING_STEPS[step].type as "house" | "tree" | "male" | "female"}
          index={step}
          childId={childId}
          onSaveComplete={() => {
            setIsDrawing(false);
            setStep(step + 1);
          }}
        />
      )}
    </div>
  );
};

export default CanvasPage;
