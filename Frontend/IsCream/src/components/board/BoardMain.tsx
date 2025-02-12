import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useBoardList } from "../../hooks/board/useBoardList";
import type { Post as APIPost } from "../../types/board";
import BoardFilter from "./BoardFilter";
import PostItem from "./PostItem";
import Bear from "../../assets/image/챗봇_곰.png";

const BoardMain = () => {
  const [sort, setSort] = useState<"create" | "like">("create");
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useBoardList({
      lastId: null,
      lastLikeCount: null,
      size: 10,
      sort
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const transformPost = (apiPost: APIPost) => {
    const formattedDate = new Date(apiPost.createdAt)
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })
      .replace(/\. /g, ".")
      .slice(0, -1);

    return {
      postId: apiPost.postId,
      title: apiPost.title,
      content: apiPost.content,
      thumbnail: apiPost.thumbnail || "",
      createdAt: formattedDate,
      authorName: apiPost.authorName, // author.nickname 대신 authorName 사용
      likes: apiPost.likes || 0,
      userLiked: apiPost.userLiked,
      hits: apiPost.viewCount || 0
    };
  };

  const handleFilter = (newSort: "create" | "like") => {
    setSort(newSort);
  };

  if (isLoading) {
    return (
      <div className="max-w-[706px] mx-auto bg-white p-4">
        <img src={Bear} alt="로딩 중" className="mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-[706px] mx-auto bg-white">
      <div className="flex justify-end px-1 py-1">
        <BoardFilter
          text="최신순"
          active={sort === "create"}
          onClick={() => handleFilter("create")}
        />
        <BoardFilter
          text="좋아요"
          active={sort === "like"}
          onClick={() => handleFilter("like")}
        />
      </div>

      <div className="divide-y divide-gray-100">
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.data?.data?.info?.map((apiPost) => (
              <PostItem key={apiPost.postId} post={transformPost(apiPost)} />
            ))}
          </div>
        ))}
      </div>

      <div ref={ref} className="h-4" />
      {isFetchingNextPage && (
        <div className="p-4 text-center">
          <img src={Bear} alt="로딩 중..." className="mx-auto" />
        </div>
      )}
    </div>
  );
};

export default BoardMain;
