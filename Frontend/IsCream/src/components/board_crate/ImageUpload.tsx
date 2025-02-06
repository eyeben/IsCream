import { useState, useRef } from "react";

interface ImageUploadProps {
  maxImages?: number;
  onImagesChange?: (images: File[]) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  maxImages = 10,
  onImagesChange
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > maxImages) {
      alert(`최대 ${maxImages}장까지 업로드 가능합니다.`);
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);
    if (onImagesChange) {
      onImagesChange(newImages);
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    if (onImagesChange) {
      onImagesChange(images.filter((_, i) => i !== index));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
          {/* 업로드 버튼 */}
          <div className="flex-shrink-0">
            <button
              onClick={handleUploadClick}
              className="w-30 h-30 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
            >
              <div className="text-gray-400">
                <svg
                  className="w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </button>
          </div>

          {/* 이미지 미리보기 */}
          {previews.map((preview, index) => (
            <div key={preview} className="relative flex-shrink-0 w-30 h-30">
              <img
                src={preview}
                alt={`업로드 이미지 ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute top-1 right-1 bg-opacity-50 border border-[#B3B3B3] rounded-full p-1"
              >
                <svg
                  className="w-4 h-4 text-[#B3B3B3]"
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

      {/* 이미지 개수 표시 */}
      <div className="mt-2 text-right text-sm text-gray-500">
        {images.length} / {maxImages} 장
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />
    </div>
  );
};
