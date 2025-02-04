import ChildInfo from "../child/ChildInfo";

interface ChildrenSectionProps{
    children: {
        childNickname: string;
        childSex: string;
        childBirth: string;
    }[];
    onAddChild: () => void;
    onEditChild: (index: number) => void;
    onDeleteChild: (index: number) => void;
}

const ChildrenSection = ({children, onAddChild, onEditChild, onDeleteChild}: ChildrenSectionProps) => (
    <div className="w-full p-3 my-3 bg-white border border-gray-300 rounded items-center">
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
                <div className="m-3 key={index}">
                    <ChildInfo
                        key={index}
                        childNickName={child.childNickname}
                        childSex={child.childSex}
                        childBirth={child.childBirth}
                        onEdit={() => onEditChild(index)}
                        onDelete={() => onDeleteChild(index)}
                    />
                </div>
            ))}
        </div>
    </div>
);

export default ChildrenSection;