import { useState } from "react";
import BoardFilter from "./BoardFilter";
import PostItem from "./PostItem";

const BoardMain = () => {
  const [activeFilter, setActiveFilter] = useState("latest");

  // 더미 데이터 (API 응답 형식에 맞춤)
  const dummyResponse = {
    code: "S0000",
    message: "Success",
    data: {
      list1: [
        {
          postId: 1,
          title: "오늘의 날씨와 일상",
          content: "오늘은 날씨가 정말 좋네요! 여러분도 좋은 하루 보내세요",
          thumbnail: "https://picsum.photos/180/120​",
          likes: 15,
          userLiked: true,
          hits: 42,
          createdAt: "2024.02.05",
          authorName: "김멋사"
        },
        {
          postId: 2,
          title: "개발 일지",
          content: "새로운 프로젝트를 시작했어요! 열심히 개발 중입니다",
          thumbnail: "https://picsum.photos/120/120",
          likes: 8,
          userLiked: false,
          hits: 23,
          createdAt: "2024.02.04",
          authorName: "이코딩"
        },
        {
          postId: 3,
          title: "오늘의 강의",
          content: "오늘은 리액트 강의가 있어요! 재미있을 것 같아요",
          thumbnail: "https://picsum.photos/150/120",
          likes: 20,
          userLiked: false,
          hits: 35,
          createdAt: "2024.02.03",
          authorName: "박코딩"
        },
        {
          postId: 4,
          title: "오늘의 점심",
          content: "오늘은 치킨이네요! 맛있게 잘 먹었습니다",
          thumbnail: "https://picsum.photos/160/120",
          likes: 10,
          userLiked: true,
          hits: 28,
          createdAt: "2024.02.02",
          authorName: "홍개발"
        },
        {
          postId: 5,
          title: "오늘의 운동",
          content: "오늘은 헬스장에 갔어요! 몸이 너무 아파요",
          thumbnail: "https://picsum.photos/170/120",
          likes: 12,
          userLiked: false,
          hits: 30,
          createdAt: "2024.02.01",
          authorName: "박개발"
        },
        {
          postId: 6,
          title: "오늘의 저녁",
          content: "오늘은 라면을 먹었어요! 맛있게 잘 먹었습니다",
          thumbnail: "https://picsum.photos/180/120",
          likes: 15,
          userLiked: true,
          hits: 42,
          createdAt: "2024.01.31",
          authorName: "김개발"
        },
        {
          postId: 7,
          title: "오늘의 코딩",
          content: "오늘은 코딩을 열심히 했어요! 재미있을 것 같아요",
          thumbnail: "https://picsum.photos/190/120",
          likes: 20,
          userLiked: false,
          hits: 35,
          createdAt: "2024.01.30",
          authorName: "이개발"
        },
        {
          postId: 8,
          title: "오늘의 코딩",
          content: "오늘은 코딩을 열심히 했어요! 재미있을 것 같아요",
          thumbnail: "https://picsum.photos/200/120",
          likes: 20,
          userLiked: false,
          hits: 35,
          createdAt: "2024.01.29",
          authorName: "이개발"
        },
        {
          postId: 9,
          title: "오늘의 코딩",
          content: "오늘은 코딩을 열심히 했어요! 재미있을 것 같아요",
          thumbnail: "https://picsum.photos/210/120",
          likes: 20,
          userLiked: false,
          hits: 35,
          createdAt: "2024.01.28",
          authorName: "이개발"
        },
        {
          postId: 10,
          title: "오늘의 코딩",
          content: "오늘은 코딩을 열심히 했어요! 재미있을 것 같아요",
          thumbnail: "https://picsum.photos/220/120",
          likes: 20,
          userLiked: false,
          hits: 35,
          createdAt: "2024.01.27",
          authorName: "이개발"
        },
        {
          postId: 11,
          title: "오늘의 코딩",
          content: "오늘은 코딩을 열심히 했어요! 재미있을 것 같아요",
          thumbnail: "https://picsum.photos/230/120",
          likes: 20,
          userLiked: false,
          hits: 35,
          createdAt: "2024.01.26",
          authorName: "이개발"
        }
      ]
    }
  };

  const posts = dummyResponse.data.list1;

  return (
    <div className="max-w-[706px] mx-auto bg-white">
      {/* Filters */}
      <div className="flex justify-end px-1 py-1 border-b border-gray-200">
        <BoardFilter
          text="최신순"
          active={activeFilter === "latest"}
          onClick={() => setActiveFilter("latest")}
        />
        <BoardFilter
          text="좋아요"
          active={activeFilter === "likes"}
          onClick={() => setActiveFilter("likes")}
        />
      </div>

      {/* Posts List */}
      <div className="divide-y divide-gray-100">
        {posts.map((post) => (
          <PostItem key={post.postId} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BoardMain;
