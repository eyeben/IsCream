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
  const [selectedRelation, setSelectedRelation] = useState<string>(''); 
  
  return (
    <div className="space-y-4 w-full">
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
          onButtonClick={() => console.log('중복확인 클릭')}
        />
      </ProfileFormLabel>

      {/* 전화번호 필드 */}
      <ProfileFormLabel
        label="전화번호"
        required
      >
        <Input
          placeholder="010-1234-5678"
          type="tel"
          required={true}
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
      <div className="flex justify-center fixed bottom-20 left-0 right-0 py-4">
          <LongButton color="green">정보 수정</LongButton>
      </div>
    </div>
  );
};

export default ProfileForm;