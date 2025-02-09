import { useState } from "react";
import DetailContent from "../../components/board_detail/DetailContent";
import DetailActions from "../../components/board_detail/DetailAction";
import DetailComments from "../../components/board_detail/DetailComments";
import { boardData } from "../../mock/board";

// 타입 정의
interface Author {
  id: number;
  nickname: string;
  imageUrl: string;
}

interface Comment {
  commentId: number;
  parentId?: number;
  content: string;
  createdAt: string;
  author: Author;
}

interface Post {
  postId: number;
  title: string;
  content: string;
  likes: number;
  userLiked: boolean;
  viewCount: number;
  images: string[];
  createAt: string;
  author: Author;
  comments: Comment[];
}

const BoardDetailPage = () => {
  const [post, setPost] = useState<Post>(boardData.currentPost); // 타입 명시
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  const handleLike = () => {
    setPost((prev) => ({
      ...prev,
      userLiked: !prev.userLiked,
      likes: prev.userLiked ? prev.likes - 1 : prev.likes + 1,
    }));
  };

  const handleMessage = () => {
    // 메시지 보내기 로직
    console.log("메시지 보내기 클릭");
  };

  const handleCommentSubmit = (content: string, parentId?: number) => {
    // 댓글 작성 처리 로직
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
