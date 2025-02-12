import React, { useState } from "react";
import DrawingIntro from "../../components/htp/draw/DrawingIntro";
import Canvas from "../../components/htp/draw/Canvas"; // 기존 그림판 (가로형)
import Canvas2 from "../../components/htp/draw/Canvas2"; // 새로운 그림판 (세로형)
import GenderSelectionModal from "../../components/htp/draw/GenderSelectionModal";

const CanvasPage: React.FC = () => {
  const [step, setStep] = useState<"intro" | "drawing" | "gender">("intro");
  const [currentType, setCurrentType] = useState<"tree" | "house" | "person">("house");
  const [gender, setGender] = useState<"male" | "female" | null>(null);

  const handleStartDrawing = () => {
    if (currentType === "person") {
      setStep("gender"); // 성별 선택 모달 표시
    } else {
      setStep("drawing");
    }
  };

  const handleSelectGender = (selectedGender: "male" | "female") => {
    setGender(selectedGender);
    setStep("drawing");
  };

  const handleSaveComplete = () => {
    if (currentType === "tree") {
      setCurrentType("house"); // 나무 -> 집
      setStep("intro");
    } else if (currentType === "house") {
      setCurrentType("person"); // 집 -> 사람
      setStep("intro");
    } else {
      console.log("모든 그림 완료!");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100 overflow-hidden fixed top-0 left-0">
      {/* 🚀 첫 화면 - DrawingIntro */}
      {step === "intro" && <DrawingIntro type={currentType} onStart={handleStartDrawing} />}

      {/* 🎨 그림판 선택 (House → Canvas / Tree, Person → Canvas2) */}
      {step === "drawing" && (
        currentType === "house" ? (
          <Canvas
            type={currentType}
            gender={gender || undefined}
            index={1}
            childId={123}
            onSaveComplete={handleSaveComplete}
          />
        ) : (
          <Canvas2
            type={currentType}
            gender={gender || undefined}
            index={1}
            childId={123}
            onSaveComplete={handleSaveComplete}
          />
        )
      )}

      {/* 👥 성별 선택 모달 */}
      {step === "gender" && (
        <GenderSelectionModal
          onSelectGender={handleSelectGender}
          onClose={() => setStep("intro")}
        />
      )}
    </div>
  );
};

export default CanvasPage;
