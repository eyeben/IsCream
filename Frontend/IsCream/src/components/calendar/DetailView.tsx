// DetailView.tsx
import React, { useState } from "react";
import { DetailViewProps } from "./types";
import MemoEditor from "./MemoEditor";

const DetailView: React.FC<DetailViewProps> = ({ detail, selectedDate }) => {
  const [activeTab, setActiveTab] = useState<"htp" | "memo">("htp");
  const [isEditing, setIsEditing] = useState(false);

  if (!selectedDate.day) {
    return (
      <div className="text-gray-500 text-center py-8">날짜를 선택해주세요</div>
    );
  }

  return (
    <div className="relative">
      {/* 탭 버튼 영역 */}
      <div className="relative top-0 flex">
        <button
          className={`px-8 py-3 ${
            activeTab === "htp"
              ? "bg-white rounded-t-[25px] border border-[#E6E6E6] border-b-0"
              : "bg-[#F9F9F9] rounded-t-[25px] border border-[#E6E6E6] cursor-pointer hover:bg-[#E6E6E6]"
          }`}
          onClick={() => setActiveTab("htp")}
        >
          HTP 검사
        </button>
        <button
          className={`px-8 py-3 ${
            activeTab === "memo"
              ? "bg-white rounded-t-[25px] border border-[#E6E6E6] border-b-0"
              : "bg-[#F9F9F9] rounded-t-[25px] border border-[#E6E6E6] cursor-pointer hover:bg-[#E6E6E6]"
          }`}
          onClick={() => setActiveTab("memo")}
        >
          메모
        </button>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="border border-[#E6E6E6] bg-white -mt-[1px] rounded-b-[25px] rounded-r-[25px] h-[350px]">
        {activeTab === "htp" && (
          <div className="p-6 h-full overflow-y-auto">
            {detail?.isHtp ? (
              <>
                <h3 className="font-medium mb-6">
                  {selectedDate.year}년 {selectedDate.month}월{" "}
                  {selectedDate.day}일의 HTP 검사
                </h3>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {detail.houseUrl && (
                    <div>
                      <h4 className="text-sm text-gray-500 mb-2">집</h4>
                      <img
                        src={detail.houseUrl}
                        alt="House"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  )}
                  {detail.treeUrl && (
                    <div>
                      <h4 className="text-sm text-gray-500 mb-2">나무</h4>
                      <img
                        src={detail.treeUrl}
                        alt="Tree"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  )}
                  {detail.personUrl && (
                    <div>
                      <h4 className="text-sm text-gray-500 mb-2">사람</h4>
                      <img
                        src={detail.personUrl}
                        alt="Person"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {detail.report && (
                  <div className="h-[100px]">
                    <h4 className="font-medium mb-2">검사 결과</h4>
                    <div className="h-full overflow-y-auto pr-2">
                      <p className="whitespace-pre-line text-gray-600">
                        {detail.report}
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-500 text-center py-8">
                HTP 검사를 진행하지 않았습니다
              </div>
            )}
          </div>
        )}

        {activeTab === "memo" && (
          <div className="p-6 h-full overflow-y-auto">
            {isEditing || !detail?.memo ? (
              <MemoEditor
                initialMemo={detail?.memo || ""}
                selectedDate={{
                  year: selectedDate.year,
                  month: selectedDate.month,
                  day: selectedDate.day as number
                }}
                onSave={(memo) => {
                  console.log("저장된 메모:", memo);
                  setIsEditing(false);
                }}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">
                    {selectedDate.year}년 {selectedDate.month}월{" "}
                    {selectedDate.day}일의 메모
                  </h3>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-500 hover:text-blue-600 px-4 py-2 rounded"
                  >
                    수정
                  </button>
                </div>
                <p className="whitespace-pre-line text-gray-600">
                  {detail.memo}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailView;