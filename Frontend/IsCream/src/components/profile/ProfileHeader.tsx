import { useNavigate } from 'react-router-dom';

interface ProfileHeaderProps{
    profileImage?: string;
    profileNickname?: string;
    phone?: string;
    birthDate?: string;
    relation?: string;
    onNavigate?: () => void;
}

const ProfileHeader = ({ 
    profileImage, 
    profileNickname,
    phone,
    birthDate,
    relation,
}: ProfileHeaderProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('상세 프로필 설정 페이지 이동');
        navigate('/mypage/changeInfo',{
            state: {
                profileImage,
                profileNickname,
                phone,
                birthDate,
                relation
            }
        });
    };
    
    return (
        <>
            <div className='w-full flex justify-center'>
                <div className='w-full max-w-[706px] w-[95%] mx-auto px-3 my-3'>
                    <div className="flex justify-between text-xl">
                        <div className='flex items-center'>
                            <img 
                                src={profileImage} 
                                alt="Profile"
                                className="w-12 h-12 rounded-full w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200" />
                            <span className="ml-4 text-[25px]">{profileNickname}님</span>
                        </div>
                        <button 
                            className="ml-auto m-3"
                            onClick={handleClick}>&gt;</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ProfileHeader;