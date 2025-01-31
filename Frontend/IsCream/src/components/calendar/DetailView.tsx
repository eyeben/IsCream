// DetailView.tsx
import React, { useState } from 'react';
import { DetailViewProps } from './types';

const DetailView: React.FC<DetailViewProps> = ({ detail, selectedDate }) => {
  // 현재 활성화된 탭 상태 관리
  const [activeTab, setActiveTab] = useState<'memo' | 'htp'>('memo');

  // 선택된 날짜가 없는 경우
  if (!selectedDate.day) {
    return (
      <div className="text-gray-500 text-center py-8">
        날짜를 선택해주세요
      </div>
    );
  }

  // 선택된 날짜의 데이터가 없는 경우
  if (!detail) {
    return (
      <div className="text-gray-500 text-center py-8">
        저장된 정보가 없습니다
      </div>
    );
  }

  return (
    <div>
      {/* 탭 버튼 영역 */}
      <div className="flex gap-4 mb-4">
        {detail.isMemo && (
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'memo' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('memo')}
          >
            메모
          </button>
        )}
        {detail.isHtp && (
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'htp' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('htp')}
          >
            HTP 검사
          </button>
        )}
      </div>

      {/* 메모 내용 */}
      {activeTab === 'memo' && detail.isMemo && (
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-medium mb-2">
            {selectedDate.year}년 {selectedDate.month}월 {selectedDate.day}일의 메모
          </h3>
          <p className="whitespace-pre-line text-gray-600">
            {detail.memo}
          </p>
        </div>
      )}

      {/* HTP 검사 결과 */}
      {activeTab === 'htp' && detail.isHtp && (
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-medium mb-4">
            {selectedDate.year}년 {selectedDate.month}월 {selectedDate.day}일의 HTP 검사
          </h3>
          
          {/* HTP 이미지들 */}
          <div className="grid grid-cols-3 gap-4 mb-4">
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

          {/* HTP 리포트 */}
          {detail.report && (
            <div>
              <h4 className="font-medium mb-2">검사 결과</h4>
              <p className="whitespace-pre-line text-gray-600">
                {detail.report}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailView;