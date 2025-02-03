import ProfileHeader from "../../components/profile/ProfileHeader";
import ChildRegister from "./ChildRegister";
import React, { useState, useEffect } from 'react';

interface MyReportProps{
    name: string;
    profileImage: string;
    children?: {
        childNickname: string;
        childSex: string;
        childBirth: string;
    }[];
    pat?: {
        patDate: string;
        typeA: number;
        typeB: number;
        typeC: number;
        patReport: string;
    }
    personality?:{
        personalityDate: string;
        personalityReport: string;
    }
}
const MyReport: React.FC = () => {

    const [userData, setUserData] = useState<MyReportProps>({
        name: "사용자",
        profileImage: "default-profile.jpg",
        children: []
    });

    const handleAddChild = () => {
        if (userData.children && userData.children.length < 2) {
            setUserData(prev => ({
                ...prev,
                children: [
                    ...prev.children!,
                    {
                        childNickname: "",
                        childSex: "",
                        childBirth: ""
                    }
                ]
            }));
        }
    };
    
  return (
      <>
      {/* <ChangeInfo /> */}
        <div>마이페이지</div>
        <div>
            <div>
                프로필 이미지 영역
                <ProfileHeader 
                    profileImage={userData.profileImage}
                    profileNickname={userData.name}
                />
            </div>
            <div className="w-full p-3 bg-white border border-gray-300 rounded items-center">
                <div>
                    자녀 정보
                    {/* 자녀 추가 버튼 - 2명 제한 */}
                    {userData.children && userData.children.length < 2 && (
                            <button onClick={handleAddChild}>자녀 추가</button>
                    )}
                </div>
                <div className="flex gap-2">
                {userData.children && userData.children.map((child, index) => (
                    <ChildRegister
                        key={index}
                        childNickName={child.childNickname}
                        childSex={child.childSex}
                        childBirth={child.childBirth}
                    />
                ))}
                </div>
            </div>
            <div>
                검사 결과지 다운
                {/* <ReportDownload /> */}
            </div>
            <div>
                막대그래프
                {/* <ReportBarChart 
                    patDate={userData.pat.patDate}
                    typeA={userData.pat?.typeA}
                    typeB={userData.pat?.typeB}
                    typeC={userData.pat?.typeC}
                    patReport={userData.pat.patReport}
                /> */}
            </div>
            <div>
                원그래프 & 결과보고서
                {/* <ReportDonutChart 
                    personalityDate={userData.personality?.personalityDate}
                    personalityReport={userData.personality?.personalityReport}
                /> */}
            </div>
        </div>
    
    </>
  );
};

export default MyReport;
