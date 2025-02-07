import React, { useState } from "react";
import LongButton from "../../button/LongButton";

interface GenderSelectionModalProps {
  onSelect: (gender: string) => void;
}

const GenderSelectionModal: React.FC<GenderSelectionModalProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg text-center">
        <p>아이가 그린 사람 그림의 성별을 선택하세요.</p>
        <select className="border p-2 mt-4 w-full" onChange={(e) => setSelected(e.target.value)}>
          <option value="">선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
        <LongButton color="green" onClick={() => onSelect(selected)} disabled={!selected}>
          확인
        </LongButton>
      </div>
    </div>
  );
};

export default GenderSelectionModal;