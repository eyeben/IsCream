import { useState, useRef, useEffect } from "react";

interface ImageUploadProps {
  maxImages?: number;
  onImagesChange?: (images: File[]) => void;
  initialImages?: string[]; // 기존 이미지 URL 배열
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  maxImages = 10,
  onImagesChange,
  initialImages = []
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(initialImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 초기 이미지가 변경될 때 previews 업데이트
  useEffect(() => {
    setPreviews(initialImages);
  }, [initialImages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentImageCount = previews.length;

    if (files.length + currentImageCount > maxImages) {
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
    // initialImages 길이보다 큰 인덱스는 새로 추가된 이미지
    if (index >= initialImages.length) {
      const adjustedIndex = index - initialImages.length;
      setImages((prev) => prev.filter((_, i) => i !== adjustedIndex));
      if (onImagesChange) {
        onImagesChange(images.filter((_, i) => i !== adjustedIndex));
      }
    }
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
          {/* 업로드 버튼 */}
          {previews.length < maxImages ? (
            <div className="flex-shrink-0">
              <button
                onClick={handleUploadClick}
                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
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
          ) : (
            <div className="flex-shrink-0 w-24 h-24 border-2 border-gray-100 rounded-lg flex items-center justify-center bg-gray-50">
              <span className="text-sm text-gray-400">최대 개수</span>
            </div>
          )}

          {/* 이미지 미리보기 */}
          {previews.map((preview, index) => (
            <div key={preview} className="relative flex-shrink-0 w-24 h-24">
              <img
                src={preview}
                alt={`업로드 이미지 ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
              >
                <svg
                  className="w-4 h-4 text-white"
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
        {previews.length} / {maxImages} 장
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
