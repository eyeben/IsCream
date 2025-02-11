// CommentForm.tsx
import { useState } from "react";
import { CommentFormProps } from "../../types/board";
import defaultImage from "../../assets/image/챗봇_곰.png";

const CommentForm = ({
  onSubmit,
  isVisible = true,
  parentId,
  onCancel,
  placeholder = "댓글을 입력하세요",
  imageUrl = defaultImage // 기본 이미지
}: CommentFormProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content, parentId);
      setContent("");
      onCancel?.();
    }
  };

  const formClasses = parentId
    ? "ml-8 mb-4"
    : "fixed left-0 right-0 bottom-[80px] bg-white rounded-t-[15px] border-t border-[#BEBEBE] p-2";

  if (!isVisible && !parentId) return null;

  return (
    <div className={formClasses}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-2 max-w-4xl mx-auto px-2 mt-1">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={imageUrl}
              alt="profile"
              className="w-[95%] h-full object-cover mx-auto"
            />
          </div>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-2 border border-[#BEBEBE] rounded-full focus:outline-none focus:ring-1 focus:ring-green-600"
            autoFocus={!!parentId}
          />
          <button
            type="submit"
            disabled={!content.trim()}
            className={`px-4 py-2 rounded-[15px] ${
              content.trim()
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            작성
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 py-2 px-2"
            >
              취소
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
