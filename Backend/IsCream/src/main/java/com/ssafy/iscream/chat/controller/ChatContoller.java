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

    private final ChatService chatService;

    @MessageMapping("/chat/message")
    public void sendMessage(@Payload ChatMessageDto chatMessage) {
        chatService.sendMessage(chatMessage);
    }

}
