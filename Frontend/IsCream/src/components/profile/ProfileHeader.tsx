import { useNavigate } from 'react-router-dom';

interface ProfileHeaderProps{
    profileImage?: string;
    profileNickname?: string;
}

const ProfileHeader = ({ profileImage, profileNickname }: ProfileHeaderProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('상세 프로필 설정 페이지 이동');
        navigate('/mypage/ChangeInfo');
    };
    
    return (
        <>
            <div className='w-full flex justify-center'>
                <div className='max-w-[706px] w-[95%] mx-auto'>
                    <div className="flex items-center p-4">
                        <img 
                            src={profileImage} 
                            alt="Profile"
                            className="w-12 h-12 rounded-full w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200" />
                        <span className="ml-4">{profileNickname}님</span>
                        <button 
                            className="ml-auto"
                            onClick={handleClick}>›</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ProfileHeader;