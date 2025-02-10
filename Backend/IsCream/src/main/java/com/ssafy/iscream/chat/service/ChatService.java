package com.ssafy.iscream.chat.service;

import com.ssafy.iscream.chat.dto.ChatMessageDto;
import com.ssafy.iscream.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final RedisTemplate<String, Object> redisTemplate;
    private final ChatMessageRepository chatMessageRepository;
    private final UnreadMessageService unreadMessageService;

    public void sendMessage(ChatMessageDto chatMessageDto) {
        chatMessageRepository.save(chatMessageDto.toEntity());

        // Redis에서 Set<String>으로 변환
        Set<Object> userObjects = redisTemplate.opsForSet().members("roomUsers:" + chatMessageDto.getRoomId());
        Set<String> userIds = userObjects != null ? userObjects.stream().map(Object::toString).collect(Collectors.toSet()) : new HashSet<>();

        // 메시지를 보낼 때, 읽지 않은 메시지 개수를 증가
        if (userIds != null) {
            for (String userId : userIds) {
                if (!userId.equals(chatMessageDto.getSender())) {
                    unreadMessageService.incrementUnreadCount(chatMessageDto.getRoomId(), userId);
                }
            }
        }

        redisTemplate.convertAndSend("chatroom-" + chatMessageDto.getRoomId(), chatMessageDto);
    }
}
