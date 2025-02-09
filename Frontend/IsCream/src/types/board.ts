export interface ApiResponse<T = void> {
  code: "S0000" | "E4001" | "E4002" | "E4003" | "E4006";
  message: string;
  data?: T;
}

export interface Post {
  postId: number;
  title: string;
  content: string;
  thumbnail: string;
  likes: number;
  userLiked: boolean;
  viewCount: number;
  createdAt: string;
  authorName: string;
}

export interface PostDetail extends Omit<Post, "thumbnail" | "authorName"> {
  images: string[];
  author: {
    nickname: string;
    imageUrl: string;
  };
  userImageUrl: string;
}

export interface Comment {
  commentId: number;
  content: string;
  parentId: number | null;
  createdAt: string;
  author: {
    nickname: string;
    imageUrl: string;
  };
}

export interface MainBoardResponse {
  hot: Post[];
  latest: Post[];
}

export interface BoardListRequest {
  lastId: number | null;
  lastLikeCount: number | null;
  size: number;
  sort: "create" | "like";
}

export interface BoardListResponse {
  lastId: number | null;
  lastLikeCount: number | null;
  size: number;
  hasNext: boolean;
  info: Post[];
}
