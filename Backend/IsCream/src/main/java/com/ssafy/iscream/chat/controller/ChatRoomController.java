package com.ssafy.iscream.chat.controller;

import com.ssafy.iscream.chat.domain.ChatRoom;
import com.ssafy.iscream.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatrooms")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @GetMapping("/{userId}")
    public List<ChatRoom> getUserChatRooms(@PathVariable String userId) {
        return chatRoomService.getUserChatRooms(userId);
    }

    @PostMapping("/create")
    public ChatRoom createChatRoom(@RequestParam String user1, @RequestParam String user2) {
        return chatRoomService.createOrGetChatRoom(user1, user2);
    }
}
