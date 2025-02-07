import React, { useState, FormEvent } from "react";
import { PostForm } from "./PostForm";
import { TitleInput } from "./TitleInput";
import { ContentTextarea } from "./ContentTextarea";
import { ImageUpload } from "./ImageUpload";
import LongButton from "../button/LongButton";

interface PostCreateProps {
  onSubmit?: (post: {
    title: string;
    content: string;
    images?: File[];
  }) => void;
}

const MAX_CONTENT_LENGTH = 1000;

const PostCreate: React.FC<PostCreateProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<File[]>([]); // 이미지 상태 추가

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        title,
        content,
        images: images.length > 0 ? images : undefined // 이미지가 있을 때만 전송
      });
    }
    console.log({ title, content, images });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= MAX_CONTENT_LENGTH) {
      setContent(newContent);
    }
  };

  return (
    <div className=" flex flex-col bg-white">
      {/* 메인 콘텐츠 영역 */}
      <div className=" px-4 md:px-6 lg:px-8">
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
                onImagesChange={setImages} // 이미지 변경 핸들러 추가
              />
            </div>
          </PostForm>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="sticky bottom-0 w-full bg-white py-4 px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-3xl mx-auto">
          <LongButton type="submit">작성하기</LongButton>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
