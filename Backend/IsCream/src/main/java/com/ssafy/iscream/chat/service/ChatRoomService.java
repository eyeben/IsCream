package com.ssafy.iscream.chat.service;

import com.ssafy.iscream.chat.domain.ChatRoom;
import com.ssafy.iscream.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    /**
     * ✅ 사용자가 속한 채팅방 목록 조회
     */
    public List<ChatRoom> getUserChatRooms(String userId) {
        return chatRoomRepository.findByParticipantIdsContaining(userId);
    }

    /**
     * ✅ 1:1 채팅방 생성 또는 기존 채팅방 반환
     */
    public ChatRoom createOrGetChatRoom(String user1, String user2) {
        List<String> participants = Arrays.asList(user1, user2);

        // 기존 채팅방이 있는지 확인
        Optional<ChatRoom> existingRoom = chatRoomRepository.findByParticipantIds(participants);
        if (existingRoom.isPresent()) {
            return existingRoom.get();
        }

        // 없으면 새 채팅방 생성
        ChatRoom newRoom = ChatRoom.builder()
                .participantIds(participants)
                .createdAt(LocalDateTime.now())
                .build();
        return chatRoomRepository.save(newRoom);
    }
}