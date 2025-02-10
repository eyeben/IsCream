package com.ssafy.iscream.chat.controller;

import com.ssafy.iscream.chat.dto.ChatMessageDto;
import com.ssafy.iscream.chat.service.ChatRoomService;
import com.ssafy.iscream.chat.service.ChatService;
import com.ssafy.iscream.chat.service.UnreadMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatContoller {

    private final UnreadMessageService unreadMessageService;

    /**
     * 사용자가 채팅방에 입장할 때 읽음 처리
     */
    @MessageMapping("/chat/read")
    public void readMessages(@Payload String roomId, String userId) {
        unreadMessageService.resetUnreadCount(roomId, userId);
    }

}
