export type ApiResponseCode = "S0000" | "E4001" | "E4002" | "E4003" | "E4006";

export interface ApiResponse<T = void> {
  code: ApiResponseCode;
  message: string;
  data?: T;
}

export interface Author {
  id: string;
  nickname: string;
  imageUrl: string;
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

export interface PostDetail {
  postId: number;
  title: string;
  content: string;
  author: {
    id: string;
    nickname: string;
    imageUrl: string;
  };
  createdAt: string;
  images?: string[];
  userLiked: boolean;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  commentId: number;
  content: string;
  parentId: number | null;
  createdAt: string;
  author: Author;
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

export interface CreatePostRequest {
  post: {
    title: string;
    content: string;
  };
  files?: File[];
}

export interface UpdatePostRequest {
  post: {
    title: string;
    content: string;
    deleteFiles?: string[];
  };
  files?: File[];
}

export interface CommentRequest {
  postId?: number | null;
  commentId?: number | null;
  content: string;
}

export interface CommentsResponse {
  totalCount: number;
  comments: Comment[];
}
