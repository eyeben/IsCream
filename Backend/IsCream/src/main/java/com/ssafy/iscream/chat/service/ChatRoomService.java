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
    public List<ChatRoom> getUserChatRooms(Integer userId) {
        return chatRoomRepository.findByParticipantIdsContaining(String.valueOf(userId));
    }

    /**
     * ✅ 1:1 채팅방 생성 또는 기존 채팅방 반환
     */
    public ChatRoom createOrGetChatRoom(String user1, String user2) {
        // 두 사용자가 포함된 채팅방이 이미 있는지 확인
        Optional<ChatRoom> existingRoom = chatRoomRepository.findByParticipants(user1, user2);

        if (existingRoom.isPresent()) {
            return existingRoom.get(); // 기존 채팅방 반환
        }

        // 새로운 채팅방 생성
        ChatRoom newRoom = ChatRoom.builder()
                .participantIds(List.of(user1, user2))
                .lastMessageTimestamp(LocalDateTime.now()) // 생성 시 현재 시간으로 설정
                .build();

        return chatRoomRepository.save(newRoom);
    }

}