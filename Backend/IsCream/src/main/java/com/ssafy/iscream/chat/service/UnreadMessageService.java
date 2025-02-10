package com.ssafy.iscream.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UnreadMessageService {

    private final StringRedisTemplate redisTemplate;

    /**
     * 사용자가 채팅방에서 읽지 않은 메시지 개수를 증가시킴
     */
    public void incrementUnreadCount(String roomId, String userId) {
        String key = "unread:" + roomId + ":" + userId;
        redisTemplate.opsForValue().increment(key);
    }

    /**
     * 사용자가 채팅방에 입장하면 읽지 않은 메시지 개수를 0으로 설정
     */
    public void resetUnreadCount(String roomId, String userId) {
        String key = "unread:" + roomId + ":" + userId;
        redisTemplate.opsForValue().set(key, "0");
    }

    /**
     * 사용자의 읽지 않은 메시지 개수를 조회
     */
    public int getUnreadCount(String roomId, String userId) {
        String key = "unread:" + roomId + ":" + userId;
        String value = redisTemplate.opsForValue().get(key);
        return value != null ? Integer.parseInt(value) : 0;
    }
}
