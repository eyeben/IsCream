import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { chatApi } from "../../api/chat";
import defaultImage from "../../assets/image/챗봇_곰.png";

interface DetailContentProps {
  post: {
    postId: number;
    title: string;
    content: string;
    author: {
      nickname: string;
      imageUrl: string | null;
    };
    createdAt: string;
    images?: string[];
    userId?: number;
  };
  onDelete: () => void;
  onChat?: (userId: string) => void;
}

const DetailContent: React.FC<DetailContentProps> = ({
  post,
  onDelete,
  onChat
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  // 컴포넌트 마운트 시 토큰에서 사용자 ID 추출
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const payload = atob(base64Payload);
        const parsedPayload = JSON.parse(payload);
        setCurrentUserId(parsedPayload.userId);
      } catch (error) {
        console.error("토큰 파싱 오류:", error);
      }
    }
  }, []);
  
  const handleEditClick = () => {
    navigate(`/board/edit/${post.postId}`, { state: { post } });
    setShowDropdown(false);
  };

  const handleChatClick = async () => {
    if (isCreatingChat || !post.userId) return;

    try {
      setIsCreatingChat(true);

      const token = localStorage.getItem("accessToken");
      if(!token){
        alert('로그인이 필요합니다.');
        navigate("/login");
        return;
      }

      const response = await chatApi.createChatroom(post.userId.toString());
      console.log("채팅방 생성하기 버튼 눌렀을 때의 응답: ",response);
      console.log("게시글에서의 receiver: ", post.userId);
      
      if (response.code === "S0000") {
        // 채팅방 생성 성공시 채팅방으로 이동
        if (response.data?.id) {
          onChat?.(post.userId?.toString());
          navigate(`/chat/room/${response.data.id}`, {
            state: { 
              roomData: {
                receiver: post.userId.toString() 
              }
            } 
          });
        }
      } else {
        throw new Error(response.message || "채팅방 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("채팅방 생성 중 오류 발생:", error);
      alert("채팅방 생성에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsCreatingChat(false);
      setShowDropdown(false);
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-50 overflow-hidden">
            <img
              src={!post.author.imageUrl ? defaultImage : post.author.imageUrl}
              alt={post.author.nickname}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = defaultImage;
              }}
            />
          </div>
          <div>
            <div className="font-medium">{post.author.nickname}</div>
            <div className="text-sm text-gray-500">{post.createdAt}</div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 12c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm7 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm7 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              {currentUserId !== post.userId ? (
                onChat && (
                  <button
                    onClick={handleChatClick}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-b-lg"
                  >
                    채팅하기
                  </button>
                )) : (
                  <>
                  <button
                    onClick={handleEditClick}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-t-lg"
                  >
                    수정하기
                  </button>
                  <button
                    onClick={() => {
                      onDelete();
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600"
                  >
                    삭제하기
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">{post.title}</h2>
      <p className="text-gray-800 whitespace-pre-line mb-15 break-words">
        {post.content}
      </p>
      {post.images && post.images.length > 0 && (
        <div className="overflow-x-auto">
          <div className="grid grid-flow-col auto-cols-max gap-2">
            {post.images.map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden w-50"
              >
                <img
                  src={image}
                  alt={`게시글 이미지 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailContent;
