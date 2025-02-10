package com.ssafy.iscream.chat.dto;

import lombok.Getter;

@Getter
public class ChatMessageDto {
    private String roomId;
    private String sender;
    private String message;
}
