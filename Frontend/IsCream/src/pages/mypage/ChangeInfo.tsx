import ProfileImage from "../../components/profile/ProfileImage";
import ProfileForm from "../../components/profile/ProfileForm";
import React, {useState} from 'react';

const ChangeInfo: React.FC = () => {
    const [birthDate, setBirthDate] = useState('');

  return (
    <div className="flex flex-col h-full">


      {/* 프로필 이미지 */}
        <ProfileImage />

      {/* 입력 폼 */}
        <ProfileForm
            birthDate={birthDate}
            setBirthDate={setBirthDate}
        />
    </div>
  );
};

export default ChangeInfo;