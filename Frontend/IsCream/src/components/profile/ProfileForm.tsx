import Input from "../input/input";
import LongButton from "../button/LongButton";

interface ProfileFormProps {
  birthDate: string;
  setBirthDate: (date: string) => void;
}

const ProfileForm = ({ birthDate, setBirthDate }: ProfileFormProps) => {
  return (
    <div className="space-y-4 w-full">
      {/* 닉네임 필드 */}
      <div>
        <div className="w-[95%]">
        </div>
        <div className="flex justify-center">
          <div className="w-[95%]">
            <span>닉네임 </span>
            <span className="text-blue-500">*</span>
          </div>
        </div>
        <div className="flex justify-center">
          <Input
            placeholder="닉네임"
            type="text"
            required={true}
            withButton={true}
            onButtonClick={() => console.log('중복확인 클릭')}
          />
        </div>
      </div>

      {/* 전화번호 필드 */}
      <div>
        <div className="flex justify-center">
          <div className="w-[95%]">
            <span>전화번호 </span>
            <span className="text-blue-500">*</span>
          </div>
        </div>
        <div className="flex justify-center">
          <Input
            placeholder="010-3422-0247"
            type="tel"
            required={true}
          />
        </div>
      </div>

      {/* 생년월일 필드 */}
      <div>
        <div className="flex justify-center">
          <div className="w-[95%]">
            <span>생년월일 </span>
            <span className="text-blue-500">*</span>
          </div>
        </div>
        <div className="flex justify-center">
          <Input
            type="calendar"
            placeholder="생년월일을 선택하세요"
            required={true}
            value={birthDate}
            onChange={setBirthDate}
          />
        </div>
      </div>

      {/* 관계 선택 필드 */}
      <div>
        <div className="flex justify-center">
          <div className="w-[95%]">
            <span>아이와의 관계 </span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[95%] flex gap-2">
            {['엄마', '아빠', '기타'].map((relation) => (
              <button 
                key={relation}
                className="w-1/3 p-3 bg-white border border-gray-300 rounded flex justify-center items-center"
                onClick={() => console.log(`${relation} 버튼 클릭`)}
              >
                {relation}
              </button>
            ))}
          </div>
        </div>
      </div>

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