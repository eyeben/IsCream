import { DetailActionsProps } from "./types";

const DetailActions = ({
  onLike,
  onCommentClick,
  isLiked,
  likeCount,
  commentCount
}: DetailActionsProps) => {
  return (
    <div className="flex items-center border-b border-[#BEBEBE] space-x-4 px-4 py-3 mb-3">
      {/* 좋아요 버튼 */}
      <button
        onClick={onLike}
        className={`flex items-center space-x-1 ${isLiked ? "text-red-500" : "text-gray-600"}`}
      >
        <svg
          className="w-6 h-6"
          fill={isLiked ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span>{likeCount} 좋아요</span>
      </button>

      {/* 댓글 버튼 */}
      <button
        onClick={onCommentClick}
        className="flex items-center space-x-1 text-gray-600"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span>{commentCount} 댓글</span>
      </button>

      {/* 메시지 보내기 버튼 */}
      {/* <button
        onClick={onMessage}
        className="flex items-center space-x-1 text-gray-600"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <span>채팅</span>
      </button> */}
    </div>
  );
};

export default DetailActions;
