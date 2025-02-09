import { useNavigate } from "react-router-dom";

interface ChatPageProps{
    chatId: string;
    chatName?: string;
}
const ChatPage = () => {

    const navigate = useNavigate();

    return(
        <div>
            채팅페이지
        </div>
        // <div className="flex flex-col h-screen bg- 32hite">
        //     <header className="p-4 border-b">
        //         <h1 className="text-xl">채팅</h1>
        //     </header>
            
        //     <div className="flex-1 overflow-y-auto">
        //         {chatList.map((chat) => (
        //             <div
        //                 key={chat.id}
        //                 onClick={() => navigate(`/chat/${chat.id}`)}
        //                 className="flex items-center p-4 border-b"
        //             >
        //                 <div className="w-10 h-10 rounded-full bg-yellow-200 mr-3" />
        //                 <div className="flex-1">
        //                     <div className="font-medium">{chat.name}</div>
        //                     <div className="text-sm text-gray-500 truncate">
        //                         {chat.lastMessage}
        //                     </div>
        //                 </div>
        //                 <div className="text-xs text-gray-400">{chat.timestamp}</div>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    )
}

export default ChatPage;