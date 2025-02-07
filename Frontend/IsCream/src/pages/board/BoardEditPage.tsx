import { useNavigate, useLocation } from "react-router-dom";
import PostEdit from "../../components/board_crate_eidt/PostEdit";
import { Post } from "../../components/board_detail/types";

const BoardEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state?.post as Post;

  const handleSubmit = async (updatedPost: {
    title: string;
    content: string;
    images?: File[];
    existingImages?: string[];
  }) => {
    try {
      // FormData 객체 생성
      const formData = new FormData();

      // 기본 필드 추가
      formData.append("title", updatedPost.title);
      formData.append("content", updatedPost.content);

      // 새 이미지 파일 추가 (다중 파일 업로드 지원)
      if (updatedPost.images) {
        updatedPost.images.forEach((file) => {
          formData.append("images", file); // 서버측에서 배열로 수신
        });
      }

      // 기존 이미지 URL 추가 (JSON 문자열화)
      if (updatedPost.existingImages) {
        formData.append(
          "existingImages",
          JSON.stringify(updatedPost.existingImages)
        );
      }

      // API 요청 예시 (실제 엔드포인트로 변경 필요)
      const response = await fetch(`/api/posts/${post.postId}`, {
        method: "PUT",
        body: formData, // Content-Type 자동 설정
        headers: {
          // JWT 인증 예시 (필요시 추가)
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!response.ok) throw new Error("업데이트 실패");

      navigate(`/board/${post.postId}`);
    } catch (error) {
      console.error("게시글 수정 중 오류 발생:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <PostEdit post={post} onSubmit={handleSubmit} onCancel={handleCancel} />
  );
};

export default BoardEditPage;
