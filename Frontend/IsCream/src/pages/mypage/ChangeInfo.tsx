import ProfileImage from "../../components/profile/ProfileImage";
import ProfileForm from "../../components/profile/ProfileForm";
import React, {useState} from 'react';
import { useLocation } from "react-router-dom";

const ChangeInfo: React.FC = () => {

  const location = useLocation();
  const userData = location.state;

  const [birthDate, setBirthDate] = useState('');

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
              intialData = {userData}
          />
      </div>
    </div>
  );
};

export default ChangeInfo;