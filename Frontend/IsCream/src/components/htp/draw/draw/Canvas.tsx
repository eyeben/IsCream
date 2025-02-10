import React, { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import characterImage from "../../../assets/image/character2.png"; // 이미지 파일 import

interface CanvasProps {
  type: "house" | "tree" | "person";
  gender?: "male" | "female"; // 선택적 성별 값 추가
  index: number;
  childId: number;
  onSaveComplete: () => void;
}

const HEADER_HEIGHT = 60; // 헤더 높이 (px)

const Canvas: React.FC<CanvasProps> = ({ type, gender, index, childId, onSaveComplete }) => {
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleClear = () => {
    canvasRef.current?.clearCanvas();
  };

  const handleSave = async () => {
    if (!canvasRef.current || !startTime) return;

    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    const dataUrl = await canvasRef.current.exportImage("png");
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], `drawing_${type}_${index}.png`, { type: "image/png" });

    await uploadDrawing(file, timeTaken);
  };

  const uploadDrawing = async (file: File, time: string) => {
    const formData = new FormData();
    formData.append("htp[time]", time);
    formData.append("htp[chidiId]", String(childId));
    formData.append("htp[type]", type);
    formData.append("htp[index]", String(index));
    if (type === "person" && gender) {
      formData.append("htp[gender]", gender); // 성별 값 추가
    }
    formData.append("file", file);

    try {
      const res = await fetch("/htp-tests/img", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        onSaveComplete();
      } else {
        alert("저장 실패! 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("업로드 오류:", error);
    }
  };

  return (
    <div
      className="fixed inset-x-0 top-[60px] flex justify-center items-center bg-[#EAF8E6] overflow-hidden"
      style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      <div className={`flex w-[95%] h-[95%] ${type === "house" ? "flex-row" : "flex-col"} justify-between items-center relative`}>
        {/* 🎨 그림판 */}
        <div className="border-[1.5px] border-gray-400 border-opacity-50 rounded-[15px] overflow-hidden w-[88%] h-full">
          <ReactSketchCanvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%" }}
            strokeWidth={4}
            strokeColor="black"
          />
        </div>

        {/* 🛠 버튼 + 캐릭터 컨테이너 */}
        <div className="flex flex-col items-center justify-between h-full w-[12%] ml-4">
          {/* 버튼 그룹 */}
          <div className="flex flex-col gap-4 w-full">
            <button
              onClick={handleClear}
              className="w-full h-[40px] bg-green-600 text-white font-semibold rounded-lg text-sm shadow-md"
            >
              다시
            </button>
            <button
              onClick={handleSave}
              className="w-full h-[40px] bg-green-600 text-white font-semibold rounded-lg text-sm shadow-md"
            >
              저장
            </button>
          </div>

          {/* 🐻 캐릭터 (하단 정렬) */}
          <div className="flex justify-center w-full">
            <img
              src={characterImage}
              alt="캐릭터"
              className="w-[160px] h-auto mb-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
