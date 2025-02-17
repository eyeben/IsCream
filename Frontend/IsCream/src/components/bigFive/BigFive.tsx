import document_icon from "../../assets/icons/document_icon.png";
import clock_icon from "../../assets/icons/clock_icon.png";
import pen_icon from "../../assets/icons/edit-pen.png";
import user_icon from "../../assets/icons/user_icon.png";
import bigfiveImage from "../../assets/image/big-o.png";
import LongButton from "../button/LongButton";
import character from "../../assets/image/character.png";

const PATExamCard = () => {
  return (
    <>
      <div className="w-[100%] h-max-[150px]">
        <img src={bigfiveImage} alt="포스터" className="mx-auto" />
      </div>
      <div className="p-6 rounded-xl mx-auto">
        {/* 검사 정보 리스트 */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <img src={character} alt="캐릭터" className="scale-100" />
            <h1 className="text-2xl">Big5 성격검사</h1>
          </div>

          <div className="flex items-center">
            <div className="w-6 h-6 mr-3">
              <img src={pen_icon} alt="검사 구성" />
            </div>
            <span className="text-gray-600 flex-1">검사 구성</span>
            <span className="text-gray-800">설문 작성</span>
          </div>

          <div className="flex items-center">
            <div className="w-6 h-6 mr-3">
              <img src={clock_icon} alt="검사 시간" />
            </div>
            <span className="text-gray-600 flex-1">소요 시간</span>
            <span className="text-gray-800">최대 10분</span>
          </div>

          <div className="flex items-center">
            <div className="w-6 h-6 mr-3">
              <img src={document_icon} alt="검사지 보존 기간" />
            </div>
            <span className="text-gray-600 flex-1">결과지 보존 기간</span>
            <span className="text-gray-800">검사 종료일부터 1년</span>
          </div>

          <div className="flex items-center">
            <div className="w-6 h-6 mr-3">
              <img src={user_icon} alt="검사 대상" />
            </div>
            <span className="text-gray-600 flex-1">검사 대상</span>
            <span className="text-gray-800">자녀</span>
          </div>
        </div>

        {/* 버튼 */}
        <LongButton>검사 시작</LongButton>
      </div>
    </>
  );
};

export default PATExamCard;
