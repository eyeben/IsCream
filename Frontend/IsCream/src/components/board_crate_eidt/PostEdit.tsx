import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PostForm } from "./PostForm";
import { TitleInput } from "./TitleInput";
import { ContentTextarea } from "./ContentTextarea";
import { ImageUpload } from "./ImageUpload";
import LongButton from "../button/LongButton";
import Alert from "./Alert";
import type { PostDetail, UpdatePostRequest } from "../../types/board";
import { useUpdatePost } from "../../hooks/board/useUpdatePost";

interface PostEditProps {
  post: PostDetail;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}

const MAX_CONTENT_LENGTH = 1000;

const PostEdit: React.FC<PostEditProps> = ({ post }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(post.title);
  const [content, setContent] = useState<string>(post.content);
  const [images, setImages] = useState<File[]>([]);
  const [alert, setAlert] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const updatePost = useUpdatePost();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setAlert({ message: "제목을 입력해 주세요.", type: "error" });
      return;
    }

    if (!content.trim()) {
      setAlert({ message: "내용을 입력해 주세요.", type: "error" });
      return;
    }

    const postData: UpdatePostRequest = {
      post: {
        title: title.trim(),
        content: content.trim()
      },
      files: images.length > 0 ? images : undefined
    };

    try {
      await updatePost.mutateAsync({ postId: post.postId, data: postData });
      setAlert({ message: "게시글이 수정되었습니다.", type: "success" });
      setTimeout(() => {
        navigate(`/posts/${post.postId}`);
      }, 1000);
    } catch {
      setAlert({
        message: "게시글 수정 중 문제가 발생했습니다. 다시 시도해 주세요.",
        type: "error"
      });
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= MAX_CONTENT_LENGTH) {
      setContent(newContent);
    } else {
      setAlert({
        message: `최대 ${MAX_CONTENT_LENGTH}자까지 입력 가능합니다.`,
        type: "error"
      });
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto py-10">
          <PostForm onSubmit={handleSubmit}>
            <TitleInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="min-h-[300px] md:min-h-[400px]">
              <ContentTextarea
                value={content}
                onChange={handleContentChange}
                maxLength={MAX_CONTENT_LENGTH}
              />
            </div>
            <div className="mt-4">
              <ImageUpload
                onImagesChange={setImages}
                initialImages={post.images || []}
              />
            </div>
          </PostForm>
        </div>
      </div>

      <div className="sticky bottom-0 w-full bg-white py-4 px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-3xl mx-auto flex gap-4">
          <LongButton
            type="submit"
            onClick={() => navigate(`/board/detail/${post.postId}`)}
            disabled={updatePost.isPending || !title.trim() || !content.trim()}
            className="flex-1 bg-red-600"
          >
            {updatePost.isPending ? "취소 중..." : "취소"}
          </LongButton>
          <LongButton
            type="submit"
            disabled={updatePost.isPending || !title.trim() || !content.trim()}
            className="flex-1"
          >
            {updatePost.isPending ? "수정 중..." : "수정하기"}
          </LongButton>
        </div>
      </div>
    </div>
  );
};

export default PostEdit;
