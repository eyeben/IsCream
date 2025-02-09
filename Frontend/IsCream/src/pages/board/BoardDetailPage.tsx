// pages/board/BoardDetail.tsx
import { useState } from "react";
import DetailContent from "../../components/board_detail/DetailContent";
import DetailActions from "../../components/board_detail/DetailAction";
import DetailComments from "../../components/board_detail/DetailComments";
import { boardData } from "../../mock/board";
import { Post } from "@/components/board_detail/types";


const BoardDetailPage = () => {
  // 🔹 useState의 초기값을 `Post` 타입으로 설정
  const [post, setPost] = useState<Post>(boardData.currentPost);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  const handleLike = () => {
    setPost((prev: Post) => ({
      ...prev,
      userLiked: !prev.userLiked,
      likes: prev.userLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleMessage = () => {
    console.log("메시지 보내기 클릭");
  };

  const handleCommentSubmit = (content: string, parentId?: number) => {
    console.log("댓글 작성:", content, "부모 댓글 ID:", parentId);
  };

  return (
    <div className="flex flex-col bg-white">
      <DetailContent post={post} />
      <DetailActions
        onLike={handleLike}
        onCommentClick={() => setIsCommentFormVisible(!isCommentFormVisible)}
        onMessage={handleMessage}
        isLiked={post.userLiked}
        likeCount={post.likes}
        commentCount={post.comments.length}
      />
      <DetailComments
        comments={post.comments}
        onSubmit={handleCommentSubmit}
        isCommentFormVisible={isCommentFormVisible}
      />
    </div>
  );
};

export default BoardDetailPage;
