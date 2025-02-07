import React, { useState, FormEvent, useEffect } from "react";
import { Post } from "../board_detail/types";
import { PostForm } from "./PostForm";
import { TitleInput } from "./TitleInput";
import { ContentTextarea } from "./ContentTextarea";
import { ImageUpload } from "./ImageUpload";
import LongButton from "../button/LongButton";

interface PostEditProps {
  post: Post;
  onSubmit?: (formData: FormData) => Promise<void>;
  onCancel?: () => void;
}

const MAX_CONTENT_LENGTH = 1000;

const PostEdit: React.FC<PostEditProps> = ({ post, onSubmit, onCancel }) => {
  const [title, setTitle] = useState<string>(post.title);
  const [content, setContent] = useState<string>(post.content);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    post.images || []
  );
  const [isDirty, setIsDirty] = useState(false);

  // 변경사항 체크
  useEffect(() => {
    const isChanged =
      title !== post.title ||
      content !== post.content ||
      newImages.length > 0 ||
      existingImages.length !== (post.images || []).length;

    setIsDirty(isChanged);
  }, [title, content, newImages, existingImages, post]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      const formData = new FormData();

      // 기본 필드 추가
      formData.append("title", title.trim());
      formData.append("content", content.trim());

      // 새 이미지 파일 추가
      newImages.forEach((file) => {
        formData.append("images", file);
      });

      // 기존 이미지 URL 추가
      formData.append("existingImages", JSON.stringify(existingImages));

      // 삭제된 이미지 URL 계산
      const deletedImages =
        post.images?.filter((img) => !existingImages.includes(img)) || [];
      formData.append("deletedImages", JSON.stringify(deletedImages));

      onSubmit(formData);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= MAX_CONTENT_LENGTH) {
      setContent(newContent);
    }
  };

  const handleImagesChange = (images: File[]) => {
    setNewImages(images);
  };

  const handleExistingImageDelete = (indexToDelete: number) => {
    setExistingImages(
      existingImages.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className="px-4 md:px-6 lg:px-8 flex-1">
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

            {existingImages.length > 0 && (
              <div className="mb-4">
                <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
                  {existingImages.map((imageUrl, index) => (
                    <div
                      key={imageUrl}
                      className="relative flex-shrink-0 w-30 h-30"
                    >
                      <img
                        src={imageUrl}
                        alt={`기존 이미지 ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleExistingImageDelete(index)}
                        className="absolute top-1 right-1 bg-opacity-50 border border-[#333333] rounded-full"
                      >
                        <svg
                          className="w-5 h-5 rounded-full text-[#33333] hover:bg-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4">
              <ImageUpload onImagesChange={handleImagesChange} />
            </div>
          </PostForm>
        </div>
      </div>

      <div className="sticky bottom-0 w-full bg-white py-4 px-4 md:px-6 lg:px-8 border-t border-gray-200">
        <div className="w-full max-w-3xl mx-auto flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            취소
          </button>
          <LongButton
            type="submit"
            disabled={!isDirty}
            className={isDirty ? "" : "opacity-50 cursor-not-allowed"}
          >
            수정하기
          </LongButton>
        </div>
      </div>
    </div>
  );
};

export default PostEdit;
