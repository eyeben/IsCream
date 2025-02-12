package com.ssafy.iscream.chat.controller;

import com.ssafy.iscream.auth.user.Login;
import com.ssafy.iscream.chat.domain.ChatRoom;
import com.ssafy.iscream.chat.service.ChatRoomService;
import com.ssafy.iscream.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatrooms")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @GetMapping("/{userId}")
    public List<ChatRoom> getUserChatRooms(@Login User user) {
        return chatRoomService.getUserChatRooms(user.getUserId());
    }

    @PostMapping("/create")
    public ChatRoom createChatRoom(@RequestParam String user1, @RequestParam String user2) {
        return chatRoomService.createOrGetChatRoom(user1, user2);
    }
}