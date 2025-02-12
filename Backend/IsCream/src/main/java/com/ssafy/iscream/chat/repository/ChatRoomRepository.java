package com.ssafy.iscream.chat.repository;

import com.ssafy.iscream.chat.domain.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {
    List<ChatRoom> findByParticipantIdsContaining(String userId);
    Optional<ChatRoom> findByParticipantIds(List<String> participantIds);
}