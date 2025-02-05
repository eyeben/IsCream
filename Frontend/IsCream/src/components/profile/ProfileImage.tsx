const ProfileImage = () => {
  return (
    <div className="w-11/12 flex justify-center mb-6">
      <div className="relative">
        {/* 프로필 이미지 */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src="/profile-placeholder.jpg"
            alt="프로필"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 카메라 버튼 */}
        <button
          className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full border border-gray-300 shadow-sm hover:bg-gray-50"
          onClick={() => console.log("이미지 업로드 클릭")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;
