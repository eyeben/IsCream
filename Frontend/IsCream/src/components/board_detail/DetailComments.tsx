import { useState } from "react";
import type { Comment, CommentRequest } from "../../types/board";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

interface DetailCommentsProps {
  postId: number;
  comments: Comment[];
  isCommentFormVisible: boolean;
  isAuthenticated: boolean;
  currentUserId?: string;
  onSubmit: (commentData: CommentRequest) => void;
  onDelete?: (commentId: number) => void;
  onEdit?: (commentId: number, content: string) => void;
  onChat?: (authorId: string) => void;
}

const DetailComments = ({
  postId,
  comments,
  isCommentFormVisible,
  isAuthenticated,
  currentUserId,
  onSubmit,
  onDelete,
  onEdit,
  onChat
}: DetailCommentsProps) => {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);

  const handleSubmit = (content: string, parentId?: number | null) => {
    if (!isAuthenticated || !content.trim()) return;

    const commentData: CommentRequest = {
      postId,
      content: content.trim(),
      commentId: parentId || null
    };

    onSubmit(commentData);
  };

  const getChildComments = (parentCommentId: number) =>
    comments.filter((comment) => comment.parentId === parentCommentId);

  const handleToggleReplies = (commentId: number) => {
    setExpandedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const mainComments = comments.filter((comment) => comment.parentId === null);

  return (
    <div className="pb-20">
      <div className="px-4 space-y-4">
        {mainComments.map((comment) => {
          const replies = getChildComments(comment.commentId);
          const isExpanded = expandedComments.includes(comment.commentId);

          return (
            <div key={comment.commentId}>
              <CommentItem
                comment={comment}
                currentUserId={currentUserId}
                onEdit={onEdit}
                onDelete={onDelete}
                onChat={onChat}
                onReply={() => setReplyingTo(comment.commentId)}
                onToggleReplies={
                  replies.length > 0
                    ? () => handleToggleReplies(comment.commentId)
                    : undefined
                }
                repliesCount={replies.length}
                isRepliesExpanded={isExpanded}
              >
                {isExpanded && replies.length > 0 && (
                  <div className="space-y-4">
                    {replies.map((reply) => (
                      <CommentItem
                        key={reply.commentId}
                        comment={reply}
                        currentUserId={currentUserId}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onChat={onChat}
                        isReply
                      />
                    ))}
                  </div>
                )}
              </CommentItem>

              {/* 답글 작성 폼 */}
              {replyingTo === comment.commentId && (
                <CommentForm
                  onSubmit={handleSubmit}
                  parentId={comment.commentId}
                  placeholder="답글을 입력하세요"
                  onCancel={() => setReplyingTo(null)}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 메인 댓글 입력 폼 */}
      <CommentForm
        onSubmit={handleSubmit}
        isVisible={isCommentFormVisible}
        placeholder="댓글을 입력하세요"
      />
    </div>
  );
};

export default DetailComments;
