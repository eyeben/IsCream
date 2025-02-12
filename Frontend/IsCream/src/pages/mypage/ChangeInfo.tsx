import ProfileImage from "../../components/profile/ProfileImage";
import ProfileForm from "../../components/profile/ProfileForm";
import React, {useState, useRef} from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const ChangeInfo: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state;
  const profileImageRef = useRef<any>(null);

  const [birthDate, setBirthDate] = useState(userData?.birthDate || '');

  const handleSubmit = async (formData: {
    nickname: string;
    phone: string;
    birthDate: string;
    relation: string;
  }) => {
    try {
      // 이미지 파일 가져오기
      const imageFile = await profileImageRef.current.uploadImage();

      // file
      // API 호출
      const request = await updateUserInfoAPI(
        {
          nickname: formData.nickname,
          birthDate: formData.birthDate,
          phone: formData.phone,
          relation: formData.relation
        },
        imageFile
      );

      // 성공 시 처리
      alert('프로필이 성공적으로 업데이트되었습니다.');
      navigate('/profile'); // 프로필 페이지로 이동
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생:', error);
      alert('프로필 업데이트에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col mt-20">

      <div>
        {/* 프로필 이미지 */}
          <ProfileImage />
      </div>
      <div className="flex justify-center">
        {/* 입력 폼 */}
          <ProfileForm
              birthDate={birthDate}
              setBirthDate={setBirthDate}
              initialData = {{
                nickname: userData?.nickname,
                phone: userData?.phone,
                birthDate: userData?.birthDate,
                relation: userData?.relation
              }}
              onSubmit={handleSubmit}
          />
      </div>
    </div>
  );
};

export default ChangeInfo;