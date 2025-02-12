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
  authorName: string; // author 객체 대신 authorName 문자열
}

export interface PostItemProps {
  post: {
    postId: number;
    title: string;
    content: string;
    thumbnail: string;
    createdAt: string;
    authorName: string;
    likes: number;
    userLiked: boolean;
    hits: number;
  };
}

export interface PostDetail {
  postId: number;
  title: string;
  content: string;
  likes: number;
  userLiked: boolean;
  viewCount: number;
  images?: string[];
  createdAt: string;
  author: Author;
  userImageUrl?: string; // 로그인 유저의 프로필 이미지
}

export interface Comment {
  commentId: number;
  content: string;
  parentId: number | null;
  createdAt: string;
  author: Author;
}

export interface CommentsResponse {
  totalCount: number;
  comments: Comment[];
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

export interface CreatePostResponse {
  postId: number;
}

export interface UpdatePostRequest {
  post: {
    title: string;
    content: string;
    deleteFiles?: string[];
  };
  files?: File[];
}

export interface LikePostResponse {
  code: ApiResponseCode;
  message: string;
}

export interface CommentRequest {
  postId?: number | null;
  commentId?: number | null;
  content: string;
}

export interface CommentsListResponse {
  totalCount: number;
  comments: Comment[];
}
