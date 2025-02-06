import { LogOut } from "lucide-react";

const LogoutButton = () => {
    const handleLogout = () => {
        // 로그아웃 로직 구현
        console.log("로그아웃 처리");
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-[95%] max-w-[706px] flex justify-end m-5">
                <button
                    onClick={handleLogout}
                    className="flex text-gray-400"
                >
                    <LogOut size={20}/>
                    <span className="mx-2">로그아웃</span>
                </button>
            </div>  
        </div>
    );
};

export default LogoutButton;