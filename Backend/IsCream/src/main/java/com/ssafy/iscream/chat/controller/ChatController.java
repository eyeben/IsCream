package com.ssafy.iscream.chat.controller;

import com.ssafy.iscream.chat.dto.ChatMessageDto;
import com.ssafy.iscream.chat.dto.MessageAckDto;
import com.ssafy.iscream.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat/send")
    public void sendMessage(@Payload ChatMessageDto chatMessageDto) {
        log.info("📤 메시지 전송 요청: {}", chatMessageDto);
        String destination = "/sub/chat/room-" + chatMessageDto.getRoomId();

        log.info("📢 메시지 브로커에 메시지 발행: {}", destination);

        chatService.sendMessage(chatMessageDto);
    }

    @MessageMapping("/chat/ack")
    public void messageReceivedAck(@Payload MessageAckDto ackDto) {
        chatService.handleAck(ackDto);
    }
}
