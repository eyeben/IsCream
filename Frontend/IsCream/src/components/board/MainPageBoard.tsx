import { useState } from "react";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  type: "recent" | "popular"; // 인기글 or 최신글 구분
}

const MainPageBoard = () => {
  const [activeTab, setActiveTab] = useState<"recent" | "popular">("recent");

  // 하드코딩된 게시글 데이터
  const posts: Post[] = [
    {
      id: 1,
      title: "우리 아이의 그림 속 숨겨진 메시지, 어떻게 해석할까?",
      type: "recent"
    },
    {
      id: 2,
      title: "아이가 그린 그림에서 특이점을 발견했어요",
      type: "recent"
    },
    { id: 3, title: "그림 심리검사 후기입니다", type: "recent" },
    { id: 4, title: "HTP 검사 결과 공유해요", type: "recent" },
    { id: 5, title: "아이의 그림이 달라졌어요", type: "recent" },
    { id: 6, title: "그림으로 보는 우리 아이 마음", type: "popular" },
    { id: 7, title: "매일 그림 그리기의 효과", type: "popular" },
    { id: 8, title: "AI 그림 분석이 도움이 되었어요", type: "popular" },
    { id: 9, title: "그림 테스트 꾸준히 하신 분들 후기", type: "popular" },
    { id: 10, title: "아이와 함께하는 그림 시간", type: "popular" }
  ];

  const filteredPosts = posts
    .filter((post) => post.type === activeTab)
    .slice(0, 5);

  return (
    <div className="w-full bg-white mt-4">
      <div className="mx-auto max-w-[706px] relative">
        <div className="relative">
          {/* 탭 버튼 영역 */}
          <div className="relative top-0 flex">
            <button
              className={`px-8 py-3 ${
                activeTab === "recent"
                  ? "bg-white rounded-t-[25px] border border-[#E6E6E6] border-b-0"
                  : "bg-[#F9F9F9] rounded-t-[25px] border border-[#E6E6E6] cursor-pointer hover:bg-[#E6E6E6]"
              }`}
              onClick={() => setActiveTab("recent")}
            >
              최신글
            </button>
            <button
              className={`px-8 py-3 ${
                activeTab === "popular"
                  ? "bg-white rounded-t-[25px] border border-[#E6E6E6] border-b-0"
                  : "bg-[#F9F9F9] rounded-t-[25px] border border-[#E6E6E6] cursor-pointer hover:bg-[#E6E6E6]"
              }`}
              onClick={() => setActiveTab("popular")}
            >
              인기글
            </button>
          </div>

          {/* 게시글 목록 영역 */}
          <div className="border border-[#E6E6E6] bg-white -mt-[1px] rounded-b-[25px] rounded-r-[25px]">
            <div className="p-4">
              {filteredPosts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/board/${post.id}`}
                  className="block no-underline"
                >
                  <div className="flex items-center py-3 px-4 border-b-1 border-[#E6E6E6] hover:bg-gray-50  transition-colors">
                    <div className="w-8 h-8 bg-[#009E28] text-white rounded-full flex items-center justify-center mr-4">
                      {index + 1}
                    </div>
                    <p className="text-gray-800 flex-1 truncate">
                      {post.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageBoard;
