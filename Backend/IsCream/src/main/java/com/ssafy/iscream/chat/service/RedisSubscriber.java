package com.ssafy.iscream.chat.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

        try{
            String messageBody = new String(message.getBody());
            ChatMessageDto chatMessageDto = objectMapper.readValue(messageBody, ChatMessageDto.class);

            messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessageDto.getRoomId());

            System.out.println("Redis 메시지 수신 -> websocket 전송: " + chatMessageDto);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
