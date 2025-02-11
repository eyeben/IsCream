package com.ssafy.iscream.chat.listener;


import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final StringRedisTemplate stringRedisTemplate;

    /**
     * 사용자가 WebSocket을 통해 채팅방에 접속하면 Redis에 추가
     */
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        String roomId = headerAccessor.getFirstNativeHeader("roomId");
        String userId = headerAccessor.getFirstNativeHeader("userId");

        if (roomId != null && userId != null) {
            String redisKey = "roomUsers:" + roomId;
            stringRedisTemplate.opsForSet().add(redisKey, userId);
            System.out.println("✅ 사용자가 채팅방에 접속: " + userId + " (방: " + roomId + ")");
        } else {
            System.out.println("⚠️ 채팅방 접속 정보 부족: roomId=" + roomId + ", userId=" + userId);
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();

        // 🔹 기존 코드: 세션 정보 삭제
        stringRedisTemplate.delete("session:" + sessionId);

        // 🔹 개선 코드: 채팅방에서도 사용자 제거
        String roomId = headerAccessor.getFirstNativeHeader("roomId");
        String userId = headerAccessor.getFirstNativeHeader("userId");

        if (roomId != null && userId != null) {
            String redisKey = "roomUsers:" + roomId;
            stringRedisTemplate.opsForSet().remove(redisKey, userId);
            System.out.println("❌ 사용자가 채팅방에서 나감: " + userId + " (방: " + roomId + ")");
        }
    }

}
