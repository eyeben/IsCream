package com.ssafy.iscream.chat.service;

import com.ssafy.iscream.chat.domain.ChatMessage;
import com.ssafy.iscream.chat.domain.ChatRoom;
import com.ssafy.iscream.chat.dto.ChatMessageDto;
import com.ssafy.iscream.chat.dto.MessageAckDto;
import com.ssafy.iscream.chat.dto.ReadReceiptDto;
import com.ssafy.iscream.chat.repository.ChatMessageRepository;
import com.ssafy.iscream.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatRoomRepository chatRoomRepository;

    public void sendMessage(ChatMessageDto chatMessageDto) {

        // ✅ roomId가 없는 경우, 채팅방 생성 또는 조회
        if (chatMessageDto.getRoomId() == null) {
            log.info("🔍 roomId 없음 → 기존 채팅방 조회 또는 생성");
            String roomId = findOrCreateChatRoom(chatMessageDto.getSender(), chatMessageDto.getReceiver());
            chatMessageDto.setRoomId(roomId);
        }

        // ✅ roomId가 있는 경우 participants 검증
        if (chatMessageDto.getRoomId() != null) {
            chatRoomRepository.findById(chatMessageDto.getRoomId()).ifPresentOrElse(chatRoom -> {
                List<String> participants = chatRoom.getParticipantIds();
                if (!participants.contains(chatMessageDto.getSender()) || !participants.contains(chatMessageDto.getReceiver())) {
                    throw new IllegalStateException("🚨 채팅방의 참가자와 일치하지 않음: " + chatMessageDto);
                }
            }, () -> {
                throw new IllegalStateException("🚨 존재하지 않는 채팅방: " + chatMessageDto.getRoomId());
            });
        }

        // ✅ 메시지 저장
        ChatMessage chatMessage = ChatMessage.builder()
                .roomId(chatMessageDto.getRoomId())
                .sender(chatMessageDto.getSender())
                .receiver(chatMessageDto.getReceiver())
                .content(chatMessageDto.getContent())
                .timestamp(LocalDateTime.now())
                .isRead(false)
                .build();

        // ✅ MongoDB에 메시지 저장 후, messageId 가져오기
        chatMessage = chatMessageRepository.save(chatMessage);

        // ✅ 채팅방의 마지막 메시지 시간 업데이트
        updateLastMessageTimestamp(chatMessageDto.getRoomId(), chatMessage.getTimestamp());

        // ✅ 클라이언트에게 messageId 포함해서 전송
        chatMessageDto.setMessageId(chatMessage.getId());

        log.info("📤 Redis Pub/Sub 발행 (messageId 포함): {}", chatMessageDto);

        redisTemplate.convertAndSend("chatroom-" + chatMessageDto.getRoomId(), chatMessageDto);

    }
    /**
     * ✅ 채팅방이 존재하는지 확인하고 없으면 생성
     */
    private String findOrCreateChatRoom(String user1, String user2) {
        return chatRoomRepository.findByParticipants(user1, user2)
                .map(ChatRoom::getChatRoomId)
                .orElseGet(() -> {
                    log.info("🚀 채팅방 없음 → 새로 생성");

                    ChatRoom newChatRoom = ChatRoom.builder()
                            .participantIds(Arrays.asList(user1, user2))
                            .lastMessageTimestamp(LocalDateTime.now())
                            .build();

                    chatRoomRepository.save(newChatRoom);
                    return newChatRoom.getChatRoomId();
                });
    }


    /**
     * ✅ 채팅방의 마지막 메시지 시간 업데이트
     */
    private void updateLastMessageTimestamp(String roomId, LocalDateTime timestamp) {
        chatRoomRepository.findById(roomId).ifPresent(chatRoom -> {
            chatRoom.updateLastMessageTimestamp(timestamp);
            chatRoomRepository.save(chatRoom);
        });
    }





    public void handleAck(MessageAckDto ackDto) {
        //messagingTemplate.convertAndSend("/sub/chat/read-receipt/" + ackDto.getRoomId(), ackDto);
        log.info("🔍 ACK 처리 중: {}", ackDto);

        // ✅ 해당 메시지를 DB에서 찾아 읽음 처리
        ChatMessage chatMessage = chatMessageRepository.findById(ackDto.getMessageId())
                .orElse(null);

        if (chatMessage == null) {
            log.warn("❌ 메시지를 찾을 수 없음: {}", ackDto.getMessageId());
            return;
        }

        // ✅ 이미 읽음 상태면 처리하지 않음
        if (chatMessage.isRead()) {
            log.info("✅ 이미 읽음 처리된 메시지: {}", ackDto.getMessageId());
            return;
        }

        // ✅ 읽음 상태로 업데이트
        chatMessage.readMessage();
        chatMessageRepository.save(chatMessage);

        log.info("✅ 메시지 읽음 처리 완료: {}", ackDto.getMessageId());

        // ✅ 보낸 사용자(A)에게 WebSocket을 통해 읽음 상태 전송
        String destination = "/sub/chat/room/" + chatMessage.getRoomId();
        ReadReceiptDto readReceipt = new ReadReceiptDto(ackDto.getMessageId(), chatMessage.getSender());
        messagingTemplate.convertAndSend(destination, readReceipt);

        log.info("📩 읽음 상태 전송: {}", destination);
    }
}