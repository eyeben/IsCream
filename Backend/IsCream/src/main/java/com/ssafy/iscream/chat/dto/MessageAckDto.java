package com.ssafy.iscream.chat.dto;

import lombok.Data;

@Data
public class MessageAckDto {
    private String roomId;
    private String messageId;
    private String readerId;
}