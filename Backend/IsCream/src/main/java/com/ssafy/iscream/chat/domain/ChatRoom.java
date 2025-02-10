package com.ssafy.iscream.chat.domain;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "chat_rooms")
public class ChatRoom {
    @Id
    private String roomId;
    private String name;

    public ChatRoom(String roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }
}
