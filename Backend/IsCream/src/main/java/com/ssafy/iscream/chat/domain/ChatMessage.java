package com.ssafy.iscream.chat.domain;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "chat_message")
public class ChatMessage {
    @Id
    private String id;
    private String roomId;
    private String sender;
    private String message;
    private LocalDateTime timestamp;

    public ChatMessage(String roomId, String sender, String message, LocalDateTime timestamp) {
        this.roomId = roomId;
        this.sender = sender;
        this.message = message;
        this.timestamp = timestamp;
    }
}