import { useState } from "react";
import { CommentFormProps } from "../../types/board";
import defaultImage from "../../assets/image/챗봇_곰.png";

const CommentForm = ({
  onSubmit,
  isEditing = false,
  initialContent = "",
  isVisible = true,
  parentId,
  onCancel,
  placeholder = "댓글을 입력하세요",
  imageUrl = defaultImage,
  userImageUrl
}: CommentFormProps) => {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content, parentId);
      if (!isEditing) {
        setContent("");
      }
      onCancel?.();
    }
  };

  const formClasses = isEditing
    ? "px-2" // 수정 폼일 때는 인라인으로
    : parentId
      ? "ml-8 mb-4" // 답글일 때
      : "fixed left-0 right-0 bottom-[62px] bg-white rounded-t-[15px] border-t border-[#BEBEBE] p-2"; // 일반 댓글 작성

  if (!isVisible && !parentId) return null;

  return (
    <div className={formClasses}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-2 max-w-4xl mx-auto px-2 mt-1">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={userImageUrl || imageUrl}
              alt="profile"
              className="w-[95%] h-full object-cover mx-auto"
            />
          </div>
          <div className="flex-1 min-w-0 flex items-center gap-2"> {/* 입력창과 버튼을 감싸는 컨테이너 */}
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-2 border border-[#BEBEBE] rounded-full focus:outline-none focus:ring-1 focus:ring-green-600"
              autoFocus={!!parentId || isEditing}
            />
            <div className="flex shrink-0 gap-1"> {/* 버튼들을 감싸는 컨테이너 */}
              <button
                type="submit"
                disabled={!content.trim()}
                className={`px-2 py-2 rounded-[12px] text-xs ${
                  content.trim()
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isEditing ? "수정" : "작성"}
              </button>
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="text-gray-500 hover:text-gray-700 py-2 px-2 text-xs bg-gray-300 rounded-[12px]"
                >
                  취소
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
