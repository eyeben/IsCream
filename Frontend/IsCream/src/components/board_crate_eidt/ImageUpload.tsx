import { useState, useRef, useEffect } from "react";

interface ImageUploadProps {
  maxImages?: number;
  onImagesChange?: (newImages: File[], deletedUrls: string[]) => void;
  existingImages?: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  maxImages = 10,
  onImagesChange,
  existingImages = []
}) => {
  const [newImages, setNewImages] = useState<File[]>([]);
  const [deletedImageUrls, setDeletedImageUrls] = useState<string[]>([]);
  const [allPreviews, setAllPreviews] = useState<
    Array<{
      url: string;
      isExisting: boolean;
      originalUrl?: string;
    }>
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 기존 이미지를 previews에 추가
    setAllPreviews(
      existingImages.map((url) => ({
        url,
        isExisting: true,
        originalUrl: url
      }))
    );
  }, [existingImages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImageCount = allPreviews.length + files.length;

    if (totalImageCount > maxImages) {
      alert(`이미지는 최대 ${maxImages}장까지 업로드 가능합니다.`);
      return;
    }

    const updatedNewImages = [...newImages, ...files];
    setNewImages(updatedNewImages);

    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      isExisting: false
    }));
    setAllPreviews((prev) => [...prev, ...newPreviews]);

    if (onImagesChange) {
      onImagesChange(updatedNewImages, deletedImageUrls);
    }
  };

  const handleDeleteImage = (index: number) => {
    const targetPreview = allPreviews[index];

    if (targetPreview.isExisting && targetPreview.originalUrl) {
      // 기존 이미지 삭제 시 URL 저장
      setDeletedImageUrls((prev) => [...prev, targetPreview.originalUrl!]);
    } else {
      // 새로 추가된 이미지 삭제
      const newImageIndex = allPreviews
        .slice(0, index)
        .filter((p) => !p.isExisting).length;
      setNewImages((prev) => prev.filter((_, i) => i !== newImageIndex));
    }

    setAllPreviews((prev) => prev.filter((_, i) => i !== index));

    if (onImagesChange) {
      if (targetPreview.isExisting && targetPreview.originalUrl) {
        onImagesChange(newImages, [
          ...deletedImageUrls,
          targetPreview.originalUrl
        ]);
      } else {
        const updatedNewImages = newImages.filter((_, i) => {
          const newImageIndex = allPreviews
            .slice(0, index)
            .filter((p) => !p.isExisting).length;
          return i !== newImageIndex;
        });
        onImagesChange(updatedNewImages, deletedImageUrls);
      }
    }
  };

  const handleUploadClick = () => {
    if (allPreviews.length >= maxImages) {
      alert(`이미지는 최대 ${maxImages}장까지 업로드 가능합니다.`);
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
          {/* 업로드 버튼 */}
          <div className="flex-shrink-0">
            <button
              type="button"
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
          {allPreviews.map((preview, index) => (
            <div
              key={`${preview.url}-${index}`}
              className="relative flex-shrink-0 w-30 h-30"
            >
              <img
                src={preview.url}
                alt={`업로드 이미지 ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(index)}
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

      {/* 이미지 개수 표시 */}
      <div className="mt-2 text-right text-sm text-gray-500">
        {allPreviews.length} / {maxImages} 장
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
