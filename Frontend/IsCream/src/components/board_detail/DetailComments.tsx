import { useState, useEffect, useRef } from "react";
import { DetailCommentsProps, CommentDropdownProps } from "./types";

const DetailComments = ({
  comments,
  onSubmit,
  isCommentFormVisible,
  currentUserId,
  onEdit,
  onDelete,
  onChat
}: DetailCommentsProps) => {
  const [content, setContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent, parentId?: number) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content, parentId);
      setContent("");
      setReplyingTo(null);
    }
  };

  const getChildComments = (parentId: number) =>
    comments.filter((comment) => comment.parentId === parentId);

  const toggleReplies = (commentId: number) => {
    setExpandedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const CommentDropdown = ({ comment }: CommentDropdownProps) => {
    const isAuthor = comment.author.id === currentUserId;

    return (
      <div className="relative">
        <button
          onClick={() =>
            setActiveDropdown(
              activeDropdown === comment.commentId ? null : comment.commentId
            )
          }
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4 12c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm7 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm7 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" />
          </svg>
        </button>

        {activeDropdown === comment.commentId && (
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            {isAuthor ? (
              <>
                <button
                  onClick={() => {
                    onEdit?.(comment.commentId);
                    setActiveDropdown(null);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-t-lg"
                >
                  수정하기
                </button>
                <button
                  onClick={() => {
                    onDelete?.(comment.commentId);
                    setActiveDropdown(null);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600 rounded-b-lg"
                >
                  삭제하기
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onChat?.(comment.author.id);
                  setActiveDropdown(null);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-lg"
              >
                채팅하기
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pb-20">
      <div className="px-4 space-y-4">
        {comments
          .filter((comment) => !comment.parentId)
          .map((comment) => {
            const replies = getChildComments(comment.commentId);
            const isExpanded = expandedComments.includes(comment.commentId);

            return (
              <div key={comment.commentId}>
                {/* 부모 댓글 */}
                <div className="mb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          src={comment.author.imageUrl}
                          alt={comment.author.nickname}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="text-sm font-medium">
                            {comment.author.nickname}
                          </span>
                          <span className="text-sm text-gray-500">
                            {comment.createdAt}
                          </span>
                        </div>
                        <p className="text-gray-800">{comment.content}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button
                            onClick={() => setReplyingTo(comment.commentId)}
                            className="text-sm text-gray-500 hover:text-gray-700"
                          >
                            답글달기
                          </button>
                          {replies.length > 0 && (
                            <button
                              onClick={() => toggleReplies(comment.commentId)}
                              className="text-sm text-gray-500 hover:text-gray-700"
                            >
                              {isExpanded
                                ? "답글 숨기기"
                                : `답글 ${replies.length}개`}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <CommentDropdown comment={comment} />
                  </div>
                </div>

                {/* 답글 입력 폼 */}
                {replyingTo === comment.commentId && (
                  <form
                    onSubmit={(e) => handleSubmit(e, comment.commentId)}
                    className="ml-8 mb-4"
                  >
                    <div className="flex items-center space-x-2 px-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          src="https://picsum.photos/seed/1/400/400"
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="답글을 입력하세요"
                        className="flex-1 px-4 py-2 border border-[#BEBEBE] rounded-full focus:outline-none focus:ring-1 focus:ring-green-600"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="bg-green-600 text-white py-2 px-4 rounded-[15px]"
                      >
                        작성
                      </button>
                      <button
                        type="button"
                        onClick={() => setReplyingTo(null)}
                        className="text-gray-500 hover:text-gray-700 py-2 px-2"
                      >
                        취소
                      </button>
                    </div>
                  </form>
                )}

                {/* 대댓글 목록 */}
                {isExpanded && replies.length > 0 && (
                  <div className="ml-8 space-y-4 border-l-2 border-[#BEBEBE] pl-4">
                    {replies.map((reply) => (
                      <div key={reply.commentId}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img
                                src={reply.author.imageUrl}
                                alt={reply.author.nickname}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-2">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium">
                                  {reply.author.nickname}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {reply.createdAt}
                                </span>
                              </div>
                              <p className="text-gray-800">{reply.content}</p>
                            </div>
                          </div>
                          <CommentDropdown comment={reply} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* 메인 댓글 입력 폼 */}
      <div
        className={`fixed left-0 right-0 bg-white rounded-t-[15px] border-t border-[#BEBEBE] p-2 transition-all duration-300 ${
          isCommentFormVisible ? "bottom-[80px]" : "-bottom-full"
        }`}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex items-center space-x-2 max-w-4xl mx-auto px-2 mt-1">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="https://picsum.photos/seed/1/400/400"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="text"
              value={replyingTo ? "" : content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="댓글을 입력하세요"
              className="flex-1 px-4 py-2 border border-[#BEBEBE] rounded-full focus:outline-none focus:ring-1 focus:ring-green-600"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-[15px]"
            >
              작성
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailComments;
