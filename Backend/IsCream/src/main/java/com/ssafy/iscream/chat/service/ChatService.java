package com.ssafy.iscream.chat.service;

import com.ssafy.iscream.chat.domain.ChatMessage;
import com.ssafy.iscream.chat.dto.ChatMessageDto;
import com.ssafy.iscream.chat.dto.MessageAckDto;
import com.ssafy.iscream.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisServerCommands;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final SimpMessagingTemplate messagingTemplate;

    public void sendMessage(ChatMessageDto chatMessageDto) {
        ChatMessage chatMessage = ChatMessage.builder()
                .roomId(chatMessageDto.getRoomId())
                .sender(chatMessageDto.getSender())
                .receiver(chatMessageDto.getReceiver())
                .content(chatMessageDto.getContent())
                .timestamp(LocalDateTime.now())
                .isRead(false)
                .build();
        chatMessageRepository.save(chatMessage);
        log.info("📤 Redis Pub/Sub 발행: chatroom-{}", chatMessageDto.getRoomId()); // ✅ 추가

        redisTemplate.convertAndSend("chatroom-" + chatMessageDto.getRoomId(), chatMessageDto);
    }

    public void handleAck(MessageAckDto ackDto) {
        messagingTemplate.convertAndSend("/sub/chat/read-receipt/" + ackDto.getRoomId(), ackDto);
    }
}