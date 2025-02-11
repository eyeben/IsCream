package com.ssafy.iscream.chat.listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.iscream.chat.dto.ChatMessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener {
    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String messageBody = new String(message.getBody());

            // ✅ Redis에서 메시지 수신 확인
            System.out.println("📥 Redis에서 받은 메시지 (RAW): " + messageBody);
            System.out.println("🔎 구독 패턴: " + new String(pattern));

            // ✅ 이중 인코딩 감지 로직 유지 (디버깅용)
            if (messageBody.startsWith("\"") && messageBody.endsWith("\"")) {
                System.out.println("⚠️ 이중 인코딩된 JSON 문자열 감지!");
                messageBody = objectMapper.readValue(messageBody, String.class); // JSON을 한 번 풀어줌
            }

            // ✅ JSON을 DTO로 변환
            ChatMessageDto chatMessageDto = objectMapper.readValue(messageBody, ChatMessageDto.class);

            // ✅ 메시지 전송 로그
            System.out.println("📢 WebSocket으로 메시지 전송: /sub/chat/room/" + chatMessageDto.getRoomId());

            // ✅ WebSocket을 통해 클라이언트로 메시지 전송
            messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessageDto.getRoomId(), chatMessageDto);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
