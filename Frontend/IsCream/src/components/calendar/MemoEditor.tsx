// MemoEditor.tsx
import React, { useState, useEffect } from "react";

interface MemoEditorProps {
  initialMemo?: string;
  selectedDate: {
    year: number;
    month: number;
    day: number;
  };
  onSave: (memo: string) => void;
  onCancel: () => void;
}

const MemoEditor: React.FC<MemoEditorProps> = ({
  initialMemo = "",
  selectedDate,
  onSave,
  onCancel
}) => {
  const [memoText, setMemoText] = useState(initialMemo);

  // initialMemo가 변경될 때 memoText 업데이트
  useEffect(() => {
    setMemoText(initialMemo);
  }, [initialMemo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(memoText);
  };

  return (
    <div className="w-full">
      <h3 className="font-medium mb-4">
        {selectedDate.year}년 {selectedDate.month}월 {selectedDate.day}일의 메모
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={memoText}
          onChange={(e) => setMemoText(e.target.value)}
          className="w-full h-45 p-3 border rounded-lg resize-none focus:outline-none focus:border-blue-500"
          placeholder="메모를 입력하세요..."
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemoEditor;
