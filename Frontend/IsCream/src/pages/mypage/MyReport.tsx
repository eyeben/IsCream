import ProfileHeader from "../../components/profile/ProfileHeader";
import React, { useState, useEffect } from 'react';

interface MyReportProps{
    name: string;
    profileImage: string;
    childInfo?: {
        childNickname: string;
        childSex: string;
        childBirth: string;
    }
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
        childInfo: {
            childNickname:"",
            childSex:"",
            childBirth:""
        }
    });

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
            <div>
                자녀 등록 영역
                {/* <ChildRegister
                    childNickname={userData.childInfo.childNickname}    
                    childSex={userData.childInfo.childSex}
                    childBirth={userData.childInfo.childBirth}
                /> */}
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
