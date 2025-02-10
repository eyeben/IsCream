package com.ssafy.iscream.noti.controller;

import com.ssafy.iscream.auth.user.Login;
import com.ssafy.iscream.board.dto.request.PostCreateReq;
import com.ssafy.iscream.common.util.ResponseUtil;
import com.ssafy.iscream.noti.service.NotifyService;
import com.ssafy.iscream.user.domain.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notify")
public class NotifyController {

    private final NotifyService notifyService;

    @Operation(summary = "FCM 토큰 저장", tags = "notify")
    @PostMapping(value = "/token")
    public ResponseEntity<?> createPost(@Login User user,
                      @Schema(example = "{\"token\": \"string\"}") @RequestBody Map<String, String> map) {
        notifyService.addFcmToken(user.getUserId(), map.get("token"));
        return ResponseUtil.success();
    }

    @Operation(summary = "알림 내역 확인", tags = "notify")
    @GetMapping
    public ResponseEntity<?> getNotifyList(@Login User user) {
        return ResponseUtil.success(null);
    }

    @Operation(summary = "알림 읽음 처리", tags = "notify")
    @GetMapping("/{notifyId}")
    public ResponseEntity<?> updateNotifyStatus(@Login User user, @PathVariable Integer notifyId) {
        return ResponseUtil.success(null);
    }

}
