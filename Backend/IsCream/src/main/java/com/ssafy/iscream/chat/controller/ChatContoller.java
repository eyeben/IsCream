package com.ssafy.iscream.chat.controller;

import com.ssafy.iscream.chat.dto.ChatMessageDto;
import com.ssafy.iscream.chat.dto.MessageAckDto;
import com.ssafy.iscream.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat/send")
    public void sendMessage(@Payload ChatMessageDto chatMessageDto) {
        chatService.sendMessage(chatMessageDto);
    }

    @MessageMapping("/chat/ack")
    public void messageReceivedAck(@Payload MessageAckDto ackDto) {
        chatService.handleAck(ackDto);
    }
}
