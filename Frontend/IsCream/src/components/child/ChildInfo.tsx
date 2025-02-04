import girlImg from "../../assets/image/little_girl.png";
import boyImg from "../../assets/image/little_boy.png";
import editIcon from "../../assets/icons/edit-pen.png";
import cancelIcon from "../../assets/icons/cancle-default.png";

interface ChildInfoProps{
    childNickName:string;
    childSex: string;
    childBirth: string;
    onEdit: () => void;
    onDelete: () => void;
}

const ChildInfo: React.FC<ChildInfoProps> = ({ 
    childNickName, 
    childSex, 
    childBirth,
    onEdit,
    onDelete
}) => {
    return(
        <>
            <div className="p-4 border border-gray-300 rounded-lg w-[160px]">
                <div className="flex justify-between mb-2">
                    <div>
                        {childSex === '여자아이' ? (
                            <img src={girlImg} alt="여자아이 이미지" />
                        ) : (
                            <img src={boyImg} alt="남자아이 이미지" />
                        )}
                    </div>
                    <div>
                        <button onClick={onEdit}>
                            <img src={editIcon} alt="수정 아이콘" />
                        </button>
                        <button onClick={onDelete}>
                            <img src={cancelIcon} alt="삭제 아이콘" />
                        </button>
                    </div>
                </div>
                <h3 className="text-gray-600">이름: {childNickName}</h3>
                <p className="text-gray-600">성별: {childSex}</p>
                <p className="text-gray-600">생년월일: {childBirth}</p>
            </div>
        </>
    )
}

export default ChildInfo;