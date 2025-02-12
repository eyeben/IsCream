package com.ssafy.iscream.chat.listener;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final RedisTemplate redisTemplate;

    /**
     * ✅ 클라이언트가 WebSocket에 연결할 때 로그 출력
     */
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String userId = headerAccessor.getFirstNativeHeader("userId");
        String roomId = headerAccessor.getFirstNativeHeader("roomId");

        if (userId != null && roomId != null) {
            String redisKey = "chatroom-" + roomId;

            // ✅ Redis에 유저 추가
            redisTemplate.opsForSet().add(redisKey, userId);
            log.info("✅ Redis에 사용자 추가: 채팅방={}, 사용자={}", roomId, userId);
        }

        log.info("🔗 WebSocket 연결됨: 세션ID={}, 헤더={}", headerAccessor.getSessionId(), headerAccessor.toNativeHeaderMap());
    }
    /**
     * ✅ 클라이언트가 WebSocket 연결을 종료할 때 로그 출력
     */
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        String userId = (String) headerAccessor.getSessionAttributes().get("userId");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");

        log.info("❌ WebSocket 연결 종료됨: 세션ID={}, 사용자ID={}, 채팅방ID={}", sessionId, userId, roomId);

        if (userId != null && roomId != null) {
            String redisKey = "chatroom-" + roomId;

            // ✅ Redis에서 유저 삭제
            redisTemplate.opsForSet().remove(redisKey, userId);
            log.info("🚪 사용자 구독 해제됨: 채팅방={}, 사용자={}", roomId, userId);
        }
    }


}
