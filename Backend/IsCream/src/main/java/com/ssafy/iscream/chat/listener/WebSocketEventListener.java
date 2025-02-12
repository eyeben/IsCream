package com.ssafy.iscream.chat.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@Component
public class WebSocketEventListener {

    /**
     * ✅ 클라이언트가 WebSocket에 연결할 때 로그 출력
     */
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        log.info("🔗 WebSocket 연결됨: 세션ID={}, 헤더={}", headerAccessor.getSessionId(), headerAccessor.toNativeHeaderMap());
    }

    /**
     * ✅ 클라이언트가 WebSocket 연결을 종료할 때 로그 출력
     */
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        log.info("❌ WebSocket 연결 종료됨: 세션ID={}", headerAccessor.getSessionId());
    }
}
