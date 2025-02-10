package com.ssafy.iscream.chat.controller;

import com.ssafy.iscream.chat.dto.ChatMessageDto;
import com.ssafy.iscream.chat.service.ChatRoomService;
import com.ssafy.iscream.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatContoller {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ChatRoomService chatRoomService;

    /**
     * 클라이언트가 메시지를 보내는 WebSocket 엔드포인트
     * - "/pub/chat/message" 경로로 메시지를 보내면 실행됨
     * - 받은 메시지를 Redis에 Publish하여 모든 서버에서 구독할 수 있도록 함
     */
    @MessageMapping("/chat/message")
    public void sendMessage(@Payload ChatMessageDto chatMessage) {
        // 채팅방이 존재하지 않으면 생성
        chatRoomService.createChatRoom(chatMessage.getRoomId());

        // Redis로 메시지 발행 (다른 서버에서도 구독 가능)
        String topic = "chatroom-" + chatMessage.getRoomId();
        redisTemplate.convertAndSend(topic, chatMessage);

        System.out.println("WebSocket 메시지 -> Redis 발행: " + chatMessage);
    }

}
