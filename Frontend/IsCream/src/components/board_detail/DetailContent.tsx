import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DetailContentProps } from "./types";

const DetailContent = ({
  post,
  currentUserId,
  // onEdit,
  onDelete,
  onChat
}: DetailContentProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAuthor = currentUserId === post.author.id;

  const handleEditClick = () => {
    navigate(`/board/edit/${post.postId}`, {
      state: { post }
    });
    setShowDropdown(false);
  };

  return (
    <div className="px-4 py-6">
      {/* 작성자 정보 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={post.author.imageUrl}
              alt={post.author.nickname}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{post.author.nickname}</div>
            <div className="text-sm text-gray-500">{post.createAt}</div>
          </div>
        </div>

        {/* 더보기 메뉴 */}
        <div className="relative" ref={dropdownRef}>
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
              {isAuthor ? (
                <>
                  <button
                    onClick={handleEditClick}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-t-lg"
                  >
                    수정하기
                  </button>
                  <button
                    onClick={() => {
                      onDelete?.();
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600 rounded-b-lg"
                  >
                    삭제하기
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onChat?.(post.author.id);
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-lg"
                >
                  채팅하기
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 게시글 내용 */}
      <h2 className="text-xl font-bold mb-4">{post.title}</h2>
      <p className="text-gray-800 whitespace-pre-line mb-15">{post.content}</p>

      {/* 이미지 */}
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
