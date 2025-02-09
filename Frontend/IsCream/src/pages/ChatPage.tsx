import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ChatRoomItem from "../components/chat/ChatRoomItem";

interface ChatRoom {
    roomId: number;
    profileUrl: string;
    opponentName: string;
    newMessageCount: number;
    lastMessageTime: string;
  }

const ChatPage = () => {

    // 더미 데이터 추가
    // const dummyChatRooms: ChatRoom[] = [
    //     {
    //         roomId: 1,
    //         profileUrl: "/default-profile.png",
    //         opponentName: "박준영",
    //         newMessageCount: 2,
    //         lastMessageTime: "2024-02-10T01:06:00"
    //     },
    //     {
    //         roomId: 2,
    //         profileUrl: "/default-profile.png",
    //         opponentName: "김민수",
    //         newMessageCount: 0,
    //         lastMessageTime: "2024-02-10T00:03:00"
    //     },
    //     {
    //         roomId: 3,
    //         profileUrl: "/default-profile.png",
    //         opponentName: "이서연",
    //         newMessageCount: 5,
    //         lastMessageTime: "2024-02-09T11:45:00"
    //     },
    //     {
    //         roomId: 4,
    //         profileUrl: "/default-profile.png",
    //         opponentName: "최유진",
    //         newMessageCount: 1,
    //         lastMessageTime: "2024-02-09T23:20:00"
    //     },
    //     {
    //         roomId: 5,
    //         profileUrl: "/default-profile.png",
    //         opponentName: "정현우",
    //         newMessageCount: 0,
    //         lastMessageTime: "2024-02-09T20:10:00"
    //     }
    // ];
    const dummyChatRooms: ChatRoom[] = [
        {
            roomId: 1,
            profileUrl: "/default-profile.png",
            opponentName: "박준영",
            newMessageCount: 2,
            lastMessageTime: new Date().toISOString() // 현재 시간 (방금 전)
        },
        {
            roomId: 2,
            profileUrl: "/default-profile.png",
            opponentName: "김민수",
            newMessageCount: 0,
            lastMessageTime: new Date(Date.now() - 30 * 60000).toISOString() // 30분 전
        },
        {
            roomId: 3,
            profileUrl: "/default-profile.png",
            opponentName: "이서연",
            newMessageCount: 5,
            lastMessageTime: new Date(Date.now() - 3 * 3600000).toISOString() // 3시간 전
        },
        {
            roomId: 4,
            profileUrl: "/default-profile.png",
            opponentName: "최유진",
            newMessageCount: 1,
            lastMessageTime: new Date(Date.now() - 2 * 24 * 3600000).toISOString() // 2일 전
        },
        {
            roomId: 5,
            profileUrl: "/default-profile.png",
            opponentName: "정현우",
            newMessageCount: 0,
            lastMessageTime: new Date(Date.now() - 10 * 24 * 3600000).toISOString() // 10일 전
        }
    ];
    const navigate = useNavigate();
    // const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>(dummyChatRooms);
    
    return (
        <div className="flex flex-col h-screen bg-white">    
          <div className="flex-1 overflow-y-auto">
            {chatRooms.map((room) => (
              <ChatRoomItem
                key={room.roomId}
                {...room}
                onClick={() => navigate(`/chat/room/${room.roomId}`)}
              />
            ))}
          </div>
        </div>
    );
};

export default ChatPage;