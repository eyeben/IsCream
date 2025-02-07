// DetailComments.tsx
import { useState } from "react";
import { DetailCommentsProps } from "./types";
import CommentItem from "./CommentItem";
import { Comment } from "./types";

const DetailComments = ({
  comments,
  onSubmit,
  isCommentFormVisible,
  currentUserId,
  onEdit,
  onDelete,
  onChat
}: DetailCommentsProps) => {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState("");

  const getChildComments = (parentId: number) =>
    comments.filter((comment) => comment.parentId === parentId);

  const toggleReplies = (commentId: number) => {
    setExpandedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleReplySubmit = (parentId: number) => {
    if (replyContent.trim()) {
      onSubmit(replyContent, parentId);
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  const handleEditStart = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditContent(content);
  };

  const handleEditSubmit = (commentId: number) => {
    if (editContent.trim() && onEdit) {
      onEdit(commentId, editContent); // onEdit 함수의 타입을 수정해야 합니다
      setEditingCommentId(null);
      setEditContent("");
    }
  };

  // 인라인 답글 폼 컴포넌트
  const ReplyForm = ({ parentId }: { parentId: number }) => (
    <div className="flex items-center space-x-2 mt-2 mb-3 pl-10">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img
          src="https://picsum.photos/seed/1/400/400"
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>
      <input
        type="text"
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="답글을 입력하세요"
        className="flex-1 px-4 py-2 border border-[#BEBEBE] rounded-full focus:outline-none focus:ring-1 focus:ring-green-600"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleReplySubmit(parentId);
          }
        }}
        autoFocus
      />
      <button
        onClick={() => handleReplySubmit(parentId)}
        className="bg-green-600 text-white px-4 py-2 rounded-[15px]"
        disabled={!replyContent.trim()}
      >
        작성
      </button>
      <button
        onClick={() => {
          setReplyingTo(null);
          setReplyContent("");
        }}
        className="text-gray-500 hover:text-gray-700 py-2 px-4"
      >
        취소
      </button>
    </div>
  );

  // 수정 폼 컴포넌트
  const EditForm = ({ commentId }: { commentId: number }) => (
    <div className="flex items-center space-x-2 mt-2">
      <input
        type="text"
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        className="flex-1 px-4 py-2 border border-[#BEBEBE] rounded-full focus:outline-none focus:ring-1 focus:ring-green-600"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleEditSubmit(commentId);
          }
        }}
        autoFocus
      />
      <button
        onClick={() => handleEditSubmit(commentId)}
        className="bg-green-600 text-white px-4 py-2 rounded-[15px]"
        disabled={!editContent.trim()}
      >
        수정
      </button>
      <button
        onClick={() => {
          setEditingCommentId(null);
          setEditContent("");
        }}
        className="text-gray-500 hover:text-gray-700 py-2 px-4"
      >
        취소
      </button>
    </div>
  );

  const renderComment = (comment: Comment, isReply = false) => {
    if (editingCommentId === comment.commentId) {
      return <EditForm commentId={comment.commentId} />;
    }

    return (
      <CommentItem
        comment={comment}
        currentUserId={currentUserId}
        onEdit={() => handleEditStart(comment.commentId, comment.content)}
        onDelete={onDelete}
        onChat={onChat}
        onReply={() => setReplyingTo(comment.commentId)}
        onToggleReplies={
          !isReply ? () => toggleReplies(comment.commentId) : undefined
        }
        repliesCount={
          !isReply ? getChildComments(comment.commentId).length : undefined
        }
        isRepliesExpanded={
          !isReply ? expandedComments.includes(comment.commentId) : undefined
        }
        isReply={isReply}
      />
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
                {renderComment(comment)}

                {replyingTo === comment.commentId && (
                  <ReplyForm parentId={comment.commentId} />
                )}

                {isExpanded && replies.length > 0 && (
                  <div className="ml-8 border-l-2 border-[#BEBEBE] pl-4 space-y-4 mt-4">
                    {replies.map((reply) => (
                      <div key={reply.commentId}>
                        {renderComment(reply, true)}
                        {replyingTo === reply.commentId && (
                          <ReplyForm parentId={comment.commentId} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* 하단 고정 댓글 입력 폼 */}
      <div
        className={`fixed left-0 right-0 bg-white rounded-t-[15px] border-t border-[#BEBEBE] p-2 transition-all duration-300 ${
          isCommentFormVisible ? "bottom-[80px]" : "-bottom-full"
        }`}
      >
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
            placeholder="댓글을 입력하세요"
            className="flex-1 px-4 py-2 border border-[#BEBEBE] rounded-full focus:outline-none focus:ring-1 focus:ring-green-600"
            onKeyPress={(e) => {
              if (
                e.key === "Enter" &&
                (e.target as HTMLInputElement).value.trim()
              ) {
                onSubmit((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <button
            onClick={(e) => {
              const input = (
                e.target as HTMLElement
              ).parentElement?.querySelector("input");
              if (input && input.value.trim()) {
                onSubmit(input.value);
                input.value = "";
              }
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-[15px]"
          >
            작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailComments;
