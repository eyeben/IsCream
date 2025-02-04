import ProfileHeader from "../../components/profile/ProfileHeader";
import ChildInfo from "../../components/child/ChildInfo";
import ChildModal from "../../components/modal/ChildModal";
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingChildIndex, setEditingChildIndex ] = useState<number | null>(null);

    const handleAddChild = () => {
        if (userData.children && userData.children.length < 2) {
            setEditingChildIndex(null);
            setIsModalOpen(true);
        }
    };

    const handleEditChild = (index: number) => {
        setEditingChildIndex(index);  // 수정할 자녀의 인덱스 저장
        setIsModalOpen(true);
    };

    const handleDeleteChild = (index: number) => {
        setUserData(prev => ({
            ...prev,
            children: prev.children!.filter((_, i) => i !== index)
        }));
    };

    const handleModalSubmit = (childData: {
        childNickname: string;
        childSex: string;
        childBirth: string;
    }) => {
        if (editingChildIndex !== null) {
            // 수정 모드
            setUserData(prev => ({
                ...prev,
                children: prev.children!.map((child, index) => 
                    index === editingChildIndex ? childData : child
                )
            }));
        } else {
            // 새로운 자녀 추가 모드
            setUserData(prev => ({
                ...prev,
                children: [...prev.children!, childData]
            }));
        }
        setEditingChildIndex(null);
    };
    
  return (
      <>
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
                    <div className="flex justify-between">
                        <div className="m-3 text-xl">
                            자녀 정보
                        </div>
                        <div className="m-3 text-xl">
                            {userData.children && userData.children.length < 2 && (
                                <button 
                                    onClick={handleAddChild}
                                >
                                    +
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex">
                        {userData.children && userData.children.map((child, index) => (
                            <div className="m-3 key={index}">
                                <ChildInfo
                                    key={index}
                                    childNickName={child.childNickname}
                                    childSex={child.childSex}
                                    childBirth={child.childBirth}
                                    onEdit={() => handleEditChild(index)}
                                    onDelete={() => handleDeleteChild(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 모달 컴포넌트 추가 */}
            <ChildModal 
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingChildIndex(null);
                }}
                onSubmit={handleModalSubmit}
                initialData={editingChildIndex !== null ? userData.children![editingChildIndex] : undefined}
            />
    
    </>
  );
};

export default MyReport;
