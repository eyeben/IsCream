import React, { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import characterImage from "../../../assets/image/character2.png"; // 캐릭터 이미지 import

interface NewCanvasProps {
  type: "tree" | "person"; // 세로형 그림판은 나무/사람 전용
  gender?: "male" | "female";
  index: number;
  childId: number;
  onSaveComplete: () => void;
}

const Canvas2: React.FC<NewCanvasProps> = ({ type, gender, index, childId, onSaveComplete }) => {
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
    <div className="fixed inset-0 flex flex-col items-center bg-[#EAF8E6] overflow-hidden">
      {/* 🔷 헤더 */}
      <div className="w-full h-[60px] flex items-center justify-center bg-white border-b shadow-md">
        <h1 className="text-lg font-bold">심리검사</h1>
      </div>

      {/* 🎨 그림판 */}
      <div className="flex-grow w-[90%] bg-white border-[1.5px] border-gray-400 border-opacity-50 rounded-lg mt-4 p-2">
        <ReactSketchCanvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%" }}
          strokeWidth={4}
          strokeColor="black"
        />
      </div>

      {/* 🛠 버튼 + 캐릭터 컨테이너 */}
      <div className="w-full max-w-lg flex justify-between items-center mt-4 p-4">
        <button
          onClick={handleClear}
          className="w-[45%] h-[50px] bg-green-600 text-white font-semibold rounded-lg text-lg shadow-md"
        >
          다시그리기
        </button>
        <button
          onClick={handleSave}
          className="w-[45%] h-[50px] bg-green-600 text-white font-semibold rounded-lg text-lg shadow-md"
        >
          저장하기
        </button>
      </div>

      {/* 🐻 캐릭터 아이콘 (우측 하단 고정) */}
      <img
        src={characterImage}
        alt="캐릭터"
        className="absolute right-4 bottom-15 w-24 h-auto"
      />
    </div>
  );
};

export default Canvas2;
