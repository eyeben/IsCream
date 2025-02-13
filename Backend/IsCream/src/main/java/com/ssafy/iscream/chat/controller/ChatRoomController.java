package com.ssafy.iscream.chat.controller;

import com.ssafy.iscream.auth.user.Login;
import com.ssafy.iscream.chat.domain.ChatRoom;
import com.ssafy.iscream.chat.service.ChatRoomService;
import com.ssafy.iscream.common.util.ResponseUtil;
import com.ssafy.iscream.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatrooms")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;


    /**
     * ✅ 목록 불러오기
     */
    @GetMapping()
    public List<ChatRoom> getUserChatRooms(@Login User user) {
        return chatRoomService.getUserChatRooms(user.getUserId());
    }

    /**
     * ✅ 사용자가 채팅방을 나감 (채팅방 삭제 가능)
     */
    @DeleteMapping("/{roomId}/leave")
    public ResponseEntity<?> leaveChatRoom(@Login User user, @PathVariable String roomId) {
        chatRoomService.leaveChatRoom(roomId, String.valueOf(user.getUserId()));
        return ResponseUtil.success();
    }
}