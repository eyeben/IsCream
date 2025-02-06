export interface Author {
  id: string; // 작성자 식별을 위한 id 추가
  nickname: string;
  imageUrl: string;
}

export interface Post {
  postId: number;
  title: string;
  content: string;
  likes: number;
  userLiked: boolean;
  viewCount: number;
  images: string[];
  createAt: string;
  author: Author;
}

export interface Comment {
  commentId: number;
  content: string;
  author: Author;
  parentId: number | null;
  createdAt: string;
  updatedAt?: string;
}

export interface CommentDropdownProps {
  comment: Comment;
}

export interface DetailActionsProps {
  onLike?: () => void;
  onCommentClick: () => void;
  onMessage?: () => void; // 메시지 보내기 기능 추가
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
}

export interface DetailCommentsProps {
  comments: Comment[];
  onSubmit: (content: string, parentId?: number) => void;
  isCommentFormVisible: boolean;
  currentUserId?: string; // 현재 로그인한 사용자 ID 추가
  onEdit?: (commentId: number) => void; // 댓글 수정 기능
  onDelete?: (commentId: number) => void; // 댓글 삭제 기능
  onChat?: (userId: string) => void; // 채팅 기능
}

export interface DetailContentProps {
  post: Post;
  currentUserId?: string; // 현재 로그인한 사용자 ID 추가
  onEdit?: () => void;
  onDelete?: () => void;
  onChat?: () => void; // 채팅 기능 추가
}
