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

export interface CommentItemProps {
  comment: Comment;
  currentUserId?: string;
  onEdit?: (commentId: number) => void;
  onDelete?: (commentId: number) => void;
  onChat?: (userId: string) => void;
  onReply: () => void;
  onToggleReplies?: () => void;
  repliesCount?: number;
  isRepliesExpanded?: boolean;
  children?: React.ReactNode;
  isReply?: boolean;
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
  currentUserId?: string;
  onEdit?: (commentId: number) => void;
  onDelete?: (commentId: number) => void;
  onChat?: (userId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
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
  currentUserId?: string;
  onEdit?: (commentId: number, content: string) => void; // 여기를 수정
  onDelete?: (commentId: number) => void;
  onChat?: (userId: string) => void;
}

export interface DetailContentProps {
  post: Post;
  currentUserId?: string; // 추가
  onEdit?: () => void;
  onDelete?: () => void;
  onChat?: (userId: string) => void; // 추가
}

export interface CommentFormProps {
  onSubmit: (content: string, parentId?: number) => void;
  isVisible?: boolean;
  parentId?: number;
  onCancel?: () => void;
  placeholder?: string;
  imageUrl?: string; // 프로필 이미지 URL
}
