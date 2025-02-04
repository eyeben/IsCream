import ProfileHeader from "../components/profile/ProfileHeader";
import ChildrenSection from "../components/profile/ChildrenSection";
import ChildModal from "../components/modal/ChildModal";
import React, { useState } from 'react';

interface MyPageProps{
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
const MyPage: React.FC = () => {

    const [userData, setUserData] = useState<MyPageProps>({
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
        <div>
            {/* 프로필 이미지 영역 */}
            <ProfileHeader 
                profileImage={userData.profileImage}
                profileNickname={userData.name}
            />

            <ChildrenSection 
                children={userData.children || []}
                onAddChild={handleAddChild}
                onEditChild={handleEditChild}
                onDeleteChild={handleDeleteChild}
            />

            

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

export default MyPage;
