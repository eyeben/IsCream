package com.ssafy.iscream.chat.dto;

import com.ssafy.iscream.chat.domain.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {
    private String roomId;
    private String sender;
    private String message;
    private LocalDateTime timestamp;

    public ChatMessage toEntity() {
        return new ChatMessage(roomId, sender, message, timestamp != null ? timestamp : LocalDateTime.now());
    }
}