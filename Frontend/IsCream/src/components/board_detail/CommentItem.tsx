import { useState } from "react";
import type { CommentItemProps } from "../../types/board";
import CommentDropdown from "./CommentDropdown";

const CommentItem = ({
  comment,
  currentUserId,
  onEdit,
  onDelete,
  onChat,
  onReply,
  onToggleReplies,
  repliesCount = 0,
  isRepliesExpanded,
  children,
  isReply = false,
  isEditing = false
  // userImageUrl
}: CommentItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleEditSubmit = () => {
    if (onEdit && editContent.trim()) {
      onEdit(comment.commentId, editContent.trim());
    }
  };

  if (isEditing) {
    return (
      <div className="bg-gray-50 p-3 rounded-md">
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
          rows={3}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onEdit?.(comment.commentId, comment.content)}
            className="text-gray-500 hover:bg-gray-100 px-2 py-1 rounded"
          >
            취소
          </button>
          <button
            onClick={handleEditSubmit}
            className="bg-green-600 text-white px-2 py-1 rounded"
          >
            저장
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isReply ? "pl-4" : ""}`}>
      <div className="flex items-start justify-between group">
        <div className="flex items-start flex-1">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={comment.author.imageUrl}
              alt={comment.author.nickname}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-2 flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                {comment.author.nickname}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-800 mt-1 break-words">{comment.content}</p>
            <div className="flex items-center space-x-4 mt-2">
              {!isReply && onReply && (
                <button
                  type="button"
                  onClick={onReply}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  답글달기
                </button>
              )}
              {!isReply && repliesCount > 0 && onToggleReplies && (
                <button
                  type="button"
                  onClick={onToggleReplies}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {isRepliesExpanded ? "답글 숨기기" : `답글 ${repliesCount}개`}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <CommentDropdown
            comment={comment}
            currentUserId={currentUserId}
            onEdit={() => onEdit?.(comment.commentId, comment.content)}
            onDelete={() => onDelete?.(comment.commentId)}
            onChat={() => onChat?.(comment.author.id)}
            isOpen={isDropdownOpen}
            onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
          />
        </div>
      </div>

      {!isReply && children && (
        <div className="ml-8 mt-2 space-y-4 border-l-2 border-[#BEBEBE]">
          {children}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
