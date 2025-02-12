import ChildInfo from "../child/ChildInfo";
import { childApi } from "../../api/child";
import { Child } from "../../types/child";
import { useState, useEffect, useCallback } from "react";

interface ChildrenSectionProps{
    // children: {
    //     childNickname: string;
    //     childGender: string;
    //     childBirth: string;
    // }[];
    onAddChild: () => void;
    onUpdateChild: (index: number) => void;
    onDeleteChild: (index: number) => void;
}

const ChildrenSection: React.FC<ChildrenSectionProps> = ({ 
    onAddChild, 
    onUpdateChild, 
    onDeleteChild
}) => {

    const [children, setChildren] = useState<Child[]>([]);
    const fetchChildren = useCallback(async () => {
        try {
            const children = await childApi.getChildren();
            setChildren(children);
        } catch (error) {
            console.error('자녀 정보 조회 실패:', error);
        }
    }, []);

    useEffect(() => {
        fetchChildren();
    }, [fetchChildren]);

    return(
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[706px] p-3 my-2 bg-white border border-gray-300 rounded items-center">
                <div className="flex justify-between">
                    <div className="m-3 text-xl">
                        자녀 정보
                    </div>
                    <div className="m-3 text-xl">
                        {children.length < 2 && (
                            <button 
                                onClick={onAddChild}
                            >
                                +
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex">
                    {children.map((child, index) => (
                        <div key={index} className="m-3">
                            <ChildInfo
                                key={index}
                                childId={child.childId}
                                childNickName={child.nickname}
                                childGender={child.gender === 'M' ? '남자아이' : '여자아이'}
                                childBirth={child.birthDate}
                                onUpdateSuccess={fetchChildren}
                                onDeleteSuccess={fetchChildren} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChildrenSection;