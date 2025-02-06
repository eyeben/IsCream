import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Post {
  postId: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  authorName: string;
  likes: number;
  userLiked: boolean;
  hits: number;
}

const PostItem = ({ post }: { post: Post }) => {
  const navigate = useNavigate();
  const {
    postId,
    title,
    content,
    thumbnail,
    createdAt,
    authorName,
    likes,
    userLiked
  } = post;

  const handleClick = () => {
    navigate(`/board/detail/${postId}`);
  };

  return (
    <div
      className="py-3 px-1 cursor-pointer transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100"
      onClick={handleClick}
    >
      <div className="flex gap-4">
        <div>
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-30 h-20 object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <h3 className="text-base font-medium text-gray-900 truncate hover:text-blue-600">
            {title}
          </h3>
          <div className="min-w-0">
            <p className="text-sm text-gray-600 truncate">{content}</p>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <div className="w-30">
              <span>{createdAt}</span>
              <span className="mx-1"> | </span>
              <span>{authorName}</span>
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center gap-1 text-sm text-gray-500 w-16">
              <Heart
                size={16}
                className={
                  userLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                }
              />
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
