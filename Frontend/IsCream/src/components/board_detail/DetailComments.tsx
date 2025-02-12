import { useState } from "react";
import type { Comment, CommentRequest } from "../../types/board";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

interface DetailCommentsProps {
  postId: number;
  comments: Comment[];
  onSubmit: (commentData: CommentRequest) => void;
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
  isCommentFormVisible: boolean;
  isAuthenticated: boolean;
  currentUserId?: string;
  userImageUrl?: string;
}

const DetailComments = ({
  // postId,
  comments,
  onSubmit,
  onEdit,
  onDelete,
  isCommentFormVisible,
  isAuthenticated,
  currentUserId,
  userImageUrl
}: DetailCommentsProps) => {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const handleSubmit = (content: string, commentId?: number | null) => {
    if (!isAuthenticated || !content.trim()) return;

    const commentData: CommentRequest = {
      content: content.trim(),
      commentId: commentId || undefined // null 대신 undefined로 변경
    };

    onSubmit(commentData);
    setReplyingTo(null);
  };

  const handleEdit = (commentId: number, content: string) => {
    onEdit(commentId, content);
    setEditingCommentId(null);
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
                onEdit={(commentId) => {
                  setEditingCommentId(commentId);
                }}
                onDelete={onDelete}
                onReply={() => setReplyingTo(comment.commentId)}
                onToggleReplies={
                  replies.length > 0
                    ? () => handleToggleReplies(comment.commentId)
                    : undefined
                }
                repliesCount={replies.length}
                isRepliesExpanded={isExpanded}
                isEditing={editingCommentId === comment.commentId}
              >
                {isExpanded && replies.length > 0 && (
                  <div className="space-y-4">
                    {replies.map((reply) => (
                      <CommentItem
                        key={reply.commentId}
                        comment={reply}
                        currentUserId={currentUserId}
                        onEdit={handleEdit}
                        onDelete={onDelete}
                        isReply
                      />
                    ))}
                  </div>
                )}
              </CommentItem>

              {replyingTo === comment.commentId && (
                <CommentForm
                  onSubmit={handleSubmit}
                  parentId={comment.commentId}
                  placeholder="답글을 입력하세요"
                  onCancel={() => setReplyingTo(null)}
                  userImageUrl={userImageUrl}
                />
              )}
            </div>
          );
        })}
      </div>

      <CommentForm
        onSubmit={handleSubmit}
        isVisible={isCommentFormVisible}
        placeholder="댓글을 입력하세요"
        userImageUrl={userImageUrl}
      />
    </div>
  );
};

export default DetailComments;
