import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import houseImage from "../../assets/image/house.png";
import treeImage from "../../assets/image/tree.png";
import personImage from "../../assets/image/person.png";
import characterImage from "../../assets/image/character2.png";

// ✅ 단계별 기본 이미지
const DRAWING_IMAGES: Record<string, string> = {
  house: houseImage,
  tree: treeImage,
  personMale: personImage,
  personFemale: personImage,
};

// ✅ 단계별 가이드 텍스트
const DRAWING_GUIDE: Record<string, string[]> = {
  house: [
    "✅ 휴대폰을 <span class='text-green-600 font-bold'>가로</span>로 두고 촬영해주세요!",
    "✅ 그림이 화면 안에 가득 차도록 맞춰주세요.",
    "✅ 조명이 밝은 곳에서 촬영하세요.",
    "✅ 그림이 흔들리지 않도록 주의하세요.",
    "✅ 촬영 후 저장하기 버튼을 눌러주세요.",
  ],
  tree: [
    "✅ 휴대폰을 <span class='text-green-600 font-bold'>세로</span>로 두고 촬영해주세요!",
    "✅ 그림이 화면 안에 가득 차도록 맞춰주세요.",
    "✅ 조명이 밝은 곳에서 촬영하세요.",
    "✅ 그림이 흔들리지 않도록 주의하세요.",
    "✅ 촬영 후 저장하기 버튼을 눌러주세요.",
  ],
  person: [
    "✅ <span class='text-green-600 font-bold'>사람</span>을 떠올리며 촬영해주세요!",
    "✅ 그림이 화면 안에 가득 차도록 맞춰주세요.",
    "✅ 조명이 밝은 곳에서 촬영하세요.",
    "✅ 그림이 흔들리지 않도록 주의하세요.",
    "✅ 촬영 후 저장하기 버튼을 눌러주세요.",
  ],
};

const PhotoCapturePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 촬영된 이미지 상태 저장 (기본은 단계별 샘플 이미지)
  const [currentStep, setCurrentStep] = useState<"house" | "tree" | "personMale" | "personFemale">("house");
  const [capturedImage, setCapturedImage] = useState<string>(DRAWING_IMAGES[currentStep]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [childId] = useState<number>(123);

  // ✅ 촬영된 이미지가 있으면 업데이트
  useEffect(() => {
    if (location.state?.capturedImage) {
      setCapturedImage(location.state.capturedImage);
    }
  }, [location.state?.capturedImage]);

  // ✅ 저장하기 버튼 클릭 시 API 요청
  const handleSave = async () => {
    if (capturedImage === DRAWING_IMAGES[currentStep]) {
      alert("촬영된 사진이 없습니다. 사진을 촬영해주세요!");
      return;
    }

    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);

    const blob = await fetch(capturedImage).then(res => res.blob());
    const file = new File([blob], `drawing_${currentStep}.png`, { type: "image/png" });

    const formData = new FormData();
    formData.append("htp[time]", elapsedTime);
    formData.append("htp[chidiId]", String(childId));
    formData.append("htp[type]", currentStep.includes("person") ? (currentStep === "personMale" ? "male" : "female") : currentStep);
    formData.append("htp[index]", String(getStepIndex(currentStep)));
    formData.append("file", file);

    try {
      const response = await fetch("/htp-tests/img", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        moveToNextStep();
      } else {
        alert("저장 실패! 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("업로드 오류:", error);
      alert("네트워크 오류 발생! 다시 시도해주세요.");
    }
  };

  // ✅ 단계별 순서 지정
  const moveToNextStep = () => {
    if (currentStep === "house") {
      setCurrentStep("tree");
      setCapturedImage(DRAWING_IMAGES["tree"]);
      setStartTime(Date.now());
    } else if (currentStep === "tree") {
      setCurrentStep("personMale");
      setCapturedImage(DRAWING_IMAGES["personMale"]);
      setStartTime(Date.now());
    } else if (currentStep === "personMale") {
      setCurrentStep("personFemale");
      setCapturedImage(DRAWING_IMAGES["personFemale"]);
      setStartTime(Date.now());
    } else {
      navigate("/htp-results");
    }
  };

  // ✅ 단계별 인덱스 설정
  const getStepIndex = (step: "house" | "tree" | "personMale" | "personFemale") => {
    return step === "house" ? 1 : step === "tree" ? 2 : step === "personMale" ? 3 : 4;
  };

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-white px-4">
      {/* 🏷 제목 */}
      <h1 className="text-2xl font-bold text-green-700 mt-6 mb-4">
        {currentStep === "house"
          ? "집 (HOUSE)"
          : currentStep === "tree"
          ? "나무 (TREE)"
          : "사람 (PERSON)"}
      </h1>

      {/* 💡 내용 박스 */}
      <div className="w-full max-w-lg bg-[#EAF8E6] p-4 rounded-[15px] shadow-md flex flex-col items-center border border-green-300">
        {/* ✨ 촬영된 이미지 */}
        <img src={capturedImage} alt="촬영된 이미지" className="h-[250px] object-contain mb-4" />

        {/* 🔹 가이드 텍스트 */}
        <div className="text-md text-gray-700 text-left mb-6 w-full">
          {DRAWING_GUIDE[currentStep.includes("person") ? "person" : currentStep].map((guide, index) => (
            <p key={index} className="mb-1" dangerouslySetInnerHTML={{ __html: guide }}></p>
          ))}
        </div>
      </div>

      {/* 🎨 버튼 그룹 */}
      <div className="relative mt-4 flex justify-center w-full max-w-md">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-green-700"
          onClick={() => navigate("/camera", { state: { fromPhotoCapture: true } })}
        >
          촬영하기
        </button>
        <button
          className="ml-3 bg-green-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-green-700"
          onClick={handleSave}
        >
          저장하기
        </button>
        <img
          src={characterImage}
          alt="캐릭터"
          className="absolute right-[-10px] bottom-0 w-20 h-auto"
        />
      </div>
    </div>
  );
};

export default PhotoCapturePage;
