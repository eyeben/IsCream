import Input from "../input/input";
import LongButton from "../button/LongButton";
import ProfileFormLabel from "./ProfileFormLabel";
import RelationButtons from "../../components/profile/RelationButtons";
import { useState } from "react";

interface ProfileFormProps {
  birthDate: string;
  setBirthDate: (date: string) => void;
}

const ProfileForm = ({ birthDate, setBirthDate }: ProfileFormProps) => {
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedRelation, setSelectedRelation] = useState<string>(''); 
  
  const handleSubmit = () => {
    const formData = {
      nickname,
      phoneNumber,
      birthDate,
      relation: selectedRelation
    };

    console.log("입력된 폼데이터 제출:", formData);

  }
  return (
    <div className="w-full max-w-[706px]">
    <div className="space-y-4 w-full">
      <div>
        {/* 닉네임 필드 */}
        <ProfileFormLabel
          label="닉네임"
          required
        >
          <Input
            placeholder="닉네임"
            type="text"
            required={true}
            withButton={true}
            value={nickname}
            onChange={(value) => setNickname(value)}
            onButtonClick={() => console.log('중복확인 클릭')}
          />
        </ProfileFormLabel>
      </div>
      {/* 전화번호 필드 */}
      <ProfileFormLabel
        label="전화번호"
        required
      >
        <Input
          placeholder="010-1234-5678"
          type="tel"
          required={true}
          value={phoneNumber}
          onChange={(value) => setPhoneNumber(value)}
        />
      </ProfileFormLabel>

      {/* 생년월일 필드 */}
      <ProfileFormLabel
        label="생년월일"
        required
      >
        <Input
          type="calendar"
          placeholder="생년월일을 선택하세요"
          required={true}
          value={birthDate}
          onChange={setBirthDate}
        />
      </ProfileFormLabel>

      {/* 관계 선택 필드 */}
      <ProfileFormLabel
        label="아이와의 관계"
        required
      >
        <RelationButtons 
          selectedRelation={selectedRelation}
          onChange={setSelectedRelation}
        />
      </ProfileFormLabel>

      {/* 비밀번호 변경 버튼 */}
      <div className="flex justify-center">
        <div className="w-[95%] flex justify-end">
          <button
            className="w-1/3 bg-[#009E28] rounded text-white p-1 my-5"
            onClick={() => console.log("비밀번호 변경하기 버튼 클릭")}
          >
            비밀번호 변경하기 &gt;
          </button>
        </div>
      </div>

      {/* 정보 수정 버튼 */}
      <div className="flex justify-center sticky mt-20 mb-10">
          <LongButton color="green" onClick={handleSubmit}>정보 수정</LongButton>
      </div>
    </div>
    </div>
  );
};

export default ProfileForm;