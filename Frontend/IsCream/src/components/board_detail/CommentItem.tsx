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
  isReply = false
}: CommentItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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
            </div>
            <p className="text-gray-800 mt-1 break-words">{comment.content}</p>
            <div className="flex items-center space-x-4 mt-2">
              {/* 답글달기 버튼 - 대댓글이 아닐 때만 표시 */}
              {!isReply && onReply && (
                <button
                  type="button"
                  onClick={onReply}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  답글달기
                </button>
              )}
              {/* 답글 토글 버튼 - 대댓글이 있을 때만 표시 */}
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

        {/* 드롭다운 메뉴 - hover시에만 표시 */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <CommentDropdown
            comment={comment}
            currentUserId={currentUserId}
            onEdit={onEdit}
            onDelete={onDelete}
            onChat={onChat}
            isOpen={isDropdownOpen}
            onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
          />
        </div>
      </div>

      {/* 대댓글 영역 */}
      {!isReply && children && (
        <div className="ml-8 mt-2 space-y-4 border-l-2 border-[#BEBEBE]">
          {children}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
