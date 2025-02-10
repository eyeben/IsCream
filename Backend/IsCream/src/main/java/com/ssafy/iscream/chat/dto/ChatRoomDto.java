package com.ssafy.iscream.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomDto {
    private String roomId;
    private String name;

    public ChatRoom toEntity() {
        return new ChatRoom(roomId, name);
    }
}
