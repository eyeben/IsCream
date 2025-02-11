package com.ssafy.iscream.chat.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.iscream.chat.dto.ChatMessageDto;
import com.ssafy.iscream.chat.service.ChatRoomService;
import com.ssafy.iscream.chat.service.ChatService;
import com.ssafy.iscream.chat.service.UnreadMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ChatContoller {

    private final UnreadMessageService unreadMessageService;
    private final RedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;
    private final ChatService chatService;
    /**
     * 사용자가 채팅방에 입장할 때 읽음 처리
     */
    @MessageMapping("/chat/read")
    public void readMessages(@Payload ChatMessageDto chatMessageDto) {
        System.out.println("📩 받은 메시지: " + chatMessageDto);

        unreadMessageService.resetUnreadCount(chatMessageDto.getRoomId(), chatMessageDto.getSender());

        try {
            // String jsonMessage = objectMapper.writeValueAsString(chatMessageDto);
            System.out.println("📤 Redis로 메시지 발행 채널: chatroom-" + chatMessageDto.getRoomId());

            // redisTemplate.convertAndSend("chatroom-" + chatMessageDto.getRoomId(), chatMessageDto);
            chatService.sendMessage(chatMessageDto);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
