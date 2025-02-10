import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailContent from "../../components/board_detail/DetailContent";
import DetailActions from "../../components/board_detail/DetailAction";
import DetailComments from "../../components/board_detail/DetailComments";
// import { boardData } from "../../mock/board"; // Mock 데이터
import { useAuth } from "../../hooks/useAuth"; // 인증 훅
import { PostDetail, Comment } from "../../types/board"; // 타입 import

const BoardDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // 실제 API 호출로 대체해야 합니다.
  //   setPost(boardData.currentPost as PostDetail);
  //   setComments(boardData.currentPost.comments as Comment[]);
  // }, [postId]);

  const isAuthor = user?.username === post?.author.nickname;

  const handleLike = () => {
    if (!isAuthenticated) {
      alert("좋아요를 누르려면 로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    if (post) {
      setPost({
        ...post,
        userLiked: !post.userLiked,
        likes: post.userLiked ? post.likes - 1 : post.likes + 1
      });
    }
  };

  const handleCommentSubmit = (content: string) => {
    if (!isAuthenticated) {
      alert("댓글을 작성하려면 로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    console.log("댓글 작성:", content);
    // 여기에 실제 댓글 추가 로직을 구현해야 합니다.
  };

  const handleDelete = () => {
    if (isAuthor) {
      console.log("게시글 삭제");
      navigate("/board");
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="flex flex-col bg-white">
      <DetailContent
        post={post}
        currentUserId={user?.id}
        onDelete={handleDelete}
      />
      <DetailActions
        onLike={handleLike}
        onCommentClick={() => setIsCommentFormVisible(!isCommentFormVisible)}
        isLiked={post.userLiked}
        likeCount={post.likes}
        commentCount={comments.length}
      />
      <DetailComments
        comments={comments}
        onSubmit={handleCommentSubmit}
        isCommentFormVisible={isCommentFormVisible}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

export default BoardDetailPage;
