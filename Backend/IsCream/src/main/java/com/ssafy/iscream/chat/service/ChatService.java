package com.ssafy.iscream.chat.service;

import com.ssafy.iscream.chat.dto.ChatMessageDto;
import com.ssafy.iscream.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisServerCommands;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
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
    private final StringRedisTemplate stringRedisTemplate;

    public void sendMessage(ChatMessageDto chatMessageDto) {
        chatMessageRepository.save(chatMessageDto.toEntity());

        // ✅ Redis에서 접속 중인 사용자 리스트 가져오기 (직렬화 오류 방지)
        String redisKey = "roomUsers:" + chatMessageDto.getRoomId();
        Set<String> userIds = stringRedisTemplate.opsForSet().members(redisKey); // 🔥 stringRedisTemplate 사용

        // ✅ 디버깅 로그 추가
        System.out.println("👥 접속 중인 사용자: " + userIds);

        // ✅ 읽지 않은 메시지 카운트 업데이트
        if (userIds != null) {
            for (String userId : userIds) {
                if (!userId.equals(chatMessageDto.getSender())) {
                    unreadMessageService.incrementUnreadCount(chatMessageDto.getRoomId(), userId);
                }
            }
        }

        // ✅ Redis Pub/Sub 발행
        String channel = "chatroom-" + chatMessageDto.getRoomId();
        System.out.println("📤 Redis Pub/Sub 발행: 채널 - " + channel);
        System.out.println("📩 발행된 메시지: " + chatMessageDto);

        redisTemplate.convertAndSend(channel, chatMessageDto);
    }
}
