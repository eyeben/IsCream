package com.ssafy.iscream.chat.service;

import com.ssafy.iscream.chat.dto.ChatMessageDto;
import com.ssafy.iscream.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisServerCommands;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final RedisTemplate<String, Object> redisTemplate;
    private final ChatMessageRepository chatMessageRepository;
    private final UnreadMessageService unreadMessageService;

    public void sendMessage(ChatMessageDto chatMessageDto) {
        // ✅ MongoDB에 메시지 저장
        chatMessageRepository.save(chatMessageDto.toEntity());

        // ✅ Redis에 접속 중인 사용자 리스트 가져오기
        Set<Object> userObjects = redisTemplate.opsForSet().members("roomUsers:" + chatMessageDto.getRoomId());
        Set<String> userIds = userObjects != null ? userObjects.stream().map(Object::toString).collect(Collectors.toSet()) : new HashSet<>();

        // ✅ 디버깅 로그 추가 (접속 중인 사용자 확인)
        System.out.println("👥 접속 중인 사용자: " + userIds);

        // ✅ 읽지 않은 메시지 개수 업데이트
        if (userIds != null) {
            for (String userId : userIds) {
                if (!userId.equals(chatMessageDto.getSender())) {
                    unreadMessageService.incrementUnreadCount(chatMessageDto.getRoomId(), userId);
                }
            }
        }

        // ✅ Redis Pub/Sub 발행 (디버깅 로그 추가)
        String channel = "chatroom-" + chatMessageDto.getRoomId();
        System.out.println("📤 Redis Pub/Sub 발행: 채널 - " + channel);
        System.out.println("📩 발행된 메시지: " + chatMessageDto);

        redisTemplate.convertAndSend(channel, chatMessageDto);
    }
}
