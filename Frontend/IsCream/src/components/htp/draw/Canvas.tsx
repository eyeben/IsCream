import React, { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

interface CanvasProps {
  type: "house" | "tree" | "male" | "female";
  index: number;
  childId: number;
  onSaveComplete: () => void;
}

const HEADER_HEIGHT = 60; // 헤더 높이 (px)

const Canvas: React.FC<CanvasProps> = ({ type, index, childId, onSaveComplete }) => {
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const handleStartDrawing = () => {
    if (!startTime) setStartTime(Date.now());
  };

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
      {/* 🎨 그림판과 버튼을 같은 줄에 배치 */}
      <div className="flex w-[95%] h-[95%]">
        {/* 🎨 그림판 */}
        <div className="border-2 border-black rounded-[15px] overflow-hidden w-[92%] h-full">
          <ReactSketchCanvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%" }}
            strokeWidth={4}
            strokeColor="black"
            onStroke={handleStartDrawing}
          />
        </div>

        {/* 🔘 버튼 컨테이너 (Y축 정렬 제거, 오른쪽 정렬) */}
        <div className="flex flex-col justify-start gap-7 w-[8%] ml-2">
          <button
            onClick={handleClear}
            className="w-full h-[35px] bg-green-600 text-white font-semibold rounded-lg text-sm shadow-md"
          >
            다시
          </button>
          <button
            onClick={handleSave}
            className="w-full h-[35px] bg-green-600 text-white font-semibold rounded-lg text-sm shadow-md"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
