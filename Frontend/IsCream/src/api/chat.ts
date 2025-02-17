import { api } from "../utils/common/axiosInstance";
import { Client } from '@stomp/stompjs';


interface GetChatListResponse {
    code: 'S0000' | 'E4001';
    message: string;
    data: {
        roomId: string;
        opponentName: string;
        newMessageCount: number;
        lastMessageTime: string;
        lastMessageUnread: string;
    }[]
}

interface CreateChatroomResponse {
    code: 'S0000' | "E4001";
    massage: string;
    data: {
        id: string;
        participantIds:[number, number];
        lastMessageTimestamp: string;
    }
}

interface DeleteChatroomRespone {
    code: 'S0000' | 'E4001';
    message: string;
}

interface openChatroomResponse {
    code: 'S0000' | 'E4001';
    message: string;
    data: ChatMessage[];  // 배열 형태로 변경
}

interface ChatMessage {
    id: string;
    roomId: string;
    sender: string;
    receiver: string;
    content: string;
    timestamp: string;
    read: boolean;
}

// interface sendMessageProps {
//     messageId: string;
//     roomId: string;
//     sender: string;
    
// }

let stompClient: Client | null = null;

export const chatApi = {
    // 채팅방 목록 불러오기
    async getChatList(): Promise<GetChatListResponse> {
        try{
            const response = await api.get("/chatrooms");
            console.log("ChapPage.txs 여기까지 오니?");
            console.log("채팅방목록: ", response);
            if(response.data.code === 'S0000') {
                return response.data;
            }
            throw new Error(response.data.message || "채팅 목록 조회 실패");
        } catch (error) {
          console.error("채팅방 목록 조회 실패:", error);
          throw error;
        }
    },

    // 채팅방 생성하기
    async createChatroom(receiverId: string): Promise<CreateChatroomResponse>{
        console.log("receiverId ----> ", receiverId);
        try{
            const response = await api.post(`/chatrooms/create?receiverId=${receiverId}`);
            
            if(response.data.code === 'S0000'){
                return response.data;
            }
            throw new Error(response.data.message || "채팅방 생성 실패");
        } catch (error) {
          console.error("채팅방 생성 실패:", error);
          throw error;
        }
    },

    // 채팅 나가기
    async deleteChatroom(roomId: string): Promise<DeleteChatroomRespone> {
        try{
            const response = await api.delete(`/chatrooms/${roomId}/leave`);
            if(response.data.code === 'S0000'){
                return response.data;
            }
            throw new Error(response.data.message || "채팅방 삭제 실패");
        } catch (error) {
          console.error("채팅방 삭제 실패:", error);
          throw error;
        }
    },

    //-----------------------------------------------
    // 채팅방 입장하기
    async openChatroom(roomId: string, page: number): Promise<openChatroomResponse> {
        try{
            const response = await api.get(`/chat/${roomId}/messages?page=${page}`);
            if(response.data.code === 'S0000'){
                console.log("채팅방 입장 성공");
                
                return response.data;
            }
            throw new Error(response.data.massage || "채팅방 입장 실패");
        } catch (error) {
            console.log("채팅방 입장 실패", error);
            throw error;
        }
    },

    // // 채팅방 입장시, 소켓 통신 연결
    async connectChatroom(roomId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            stompClient = new Client({
                brokerURL: 'ws://localhost:8080/ws',
                connectHeaders: {
                    roomId: roomId,
                    'accpet-version': '1.2, 1.1, 1.0'
                },
                onConnect: () => {
                    console.log('WebSocket 연결 성공');
                    resolve();
                },
                onError: (error) => {
                    console.log('Websket 에러: ', error);
                    reject(error);
                }
            });
            stompClient.activate();
        });
    },

    // // 채팅방 입장시 연결 성공 직후후, 구독
    async subscribeChatroom(roomId: string, onMessageReceived: (message: any) => void): Promise<void> {
        if (!stompClient) throw new Error('WebSocket이 연결되지 않았습니다.');
        
        stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            onMessageReceived(receivedMessage);
        });
    },

    // // 메시지 보내기
    async sendMessage(roomId: string, content: string): Promise<void> {
        if (!stompClient) throw new Error('WebSocket이 연결되지 않았습니다.');

        const messageData = {
            roomId: roomId,
            content: content,
            // sender와 receiver는 실제 구현시 추가 필요
        };

        stompClient.publish({
            destination: '/pub/chat/send',
            body: JSON.stringify(messageData)
        });
    },

    // // 채팅방 안에서, 메시지 읽음 처리
    async ackMessage(messageId: string, readerId: string): Promise<void> {
        if (!stompClient) throw new Error('WebSocket이 연결되지 않았습니다.');

        const ackData = {
            messageId: messageId,
            readerId: readerId
        };

        stompClient.publish({
            destination: '/api/chat/ack',
            body: JSON.stringify(ackData)
        });
    }
}