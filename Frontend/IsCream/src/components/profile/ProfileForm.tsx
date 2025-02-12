import Input from "../input/input";
import LongButton from "../button/LongButton";
import ProfileFormLabel from "./ProfileFormLabel";
import RelationButtons from "../../components/profile/RelationButtons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserInfoAPI } from "../../api/userAPI"

interface ProfileFormProps {
  birthDate: string;
  setBirthDate: (date: string) => void;
  initialData?: {
    nickname?: string;
    phone?: string;
    birthDate?: string;
    relation?: string;
  }
  onSubmit: (formData: {
    nickname: string;
    phone: string;
    birthDate: string;
    relation: string;
  }) => void;
}

  const ProfileForm: React.FC<ProfileFormProps> = ({ birthDate, setBirthDate, initialData }: ProfileFormProps) => {

    console.log('전달받은 initialData:', initialData);
    console.log('nickname:', initialData?.nickname);        // "test수정"
    console.log('phone:', initialData?.phone);  // undefined
    console.log('birthDate:', initialData?.birthDate);      // undefined
    console.log('relation:', initialData?.relation);

    const [nickname, setNickname] = useState(initialData?.nickname || "");
    const [phone, setPhone] = useState(initialData?.phone || "");
    const [selectedRelation, setSelectedRelation] = useState<string>(initialData?.relation || ''); 

    const navigate = useNavigate();

    const handleSubmit = async () => {
      const formData = {
        nickname,
        phone,
        birthDate,
        relation: selectedRelation
      };
      console.log("입력된 폼데이터 제출:", formData);
      
      try{
        const response = await updateUserInfoAPI(formData);

        if(response.code == 'S0000'){
          console.log('사용자 정보 업데이트 성공');
          navigate('/mypage');
        }else{
          console.log("업데이트 실패: ", response.message);
        }
      }catch (error) {
        console.log("업데이트 에러: ", error);
        
      }

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
          value={phone}
          onChange={(value) => setPhone(value)}
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
            className="w-1/3 bg-[#009E28] rounded-[15px] text-white p-1 my-5"
            onClick={() => {
              console.log("비밀번호 변경하기 버튼 클릭")
              navigate('/mypage/changeinfo/password')
            }}
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