package com.ssafy.iscream.user.controller;

import com.ssafy.iscream.auth.domain.LoginUser;
import com.ssafy.iscream.auth.user.Login;
import com.ssafy.iscream.common.util.ResponseUtil;
import com.ssafy.iscream.user.dto.request.UserInfoReq;
import com.ssafy.iscream.user.dto.request.UserUpdateReq;
import com.ssafy.iscream.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping()
    @Operation(summary = "사용자 정보 조회", tags = "users")
    public ResponseEntity<?> getUserInfo(@Login LoginUser user) {
        System.out.println(user.toString());
        return ResponseUtil.success(userService.getUser(user.getUserId()));
    }

    @PostMapping("/email/check")
    @Operation(summary = "이메일 중복 확인", tags = "users")
    public ResponseEntity<?> duplicateEmail(
            @Schema(example = "{\"email\": \"test@naver.com\"}") @RequestBody Map<String, String> map) {
        return ResponseUtil.success("사용 가능한 이메일입니다.", userService.duplicateEmail(map.get("email")));
    }

    @PostMapping("/nickname/check")
    @Operation(summary = "닉네임 중복 확인", tags = "users")
    public ResponseEntity<?> duplicateNickname(
            @Schema(example = "{\"nickname\": \"test1\"}") @RequestBody Map<String, String> map) {
        return ResponseUtil.success("사용 가능한 닉네임입니다.", userService.duplicateNickname(map.get("nickname")));
    }

    @PostMapping("/info/check")
    @Operation(summary = "사용자 정보 확인 (이메일, 이름, 전화번호)", tags = "users")
    public ResponseEntity<?> checkUserInfo(@RequestBody UserInfoReq userInfoReq, @Login LoginUser user) {
        return ResponseUtil.success(userService.existUserInfo(userInfoReq, user.getUserId()));
    }

    @Operation(summary = "비밀번호 재설정", tags = "users")
    @PostMapping("/password")
    public ResponseEntity<?> changePassword(@Login LoginUser user,
            @Schema(example = "{\"password\": \"string\", \"newPassword\": \"string\"}")
            @RequestBody Map<String, String> map) {
        return ResponseUtil.success(
                userService.changePassword(user.getUserId(), map.get("password"), map.get("newPassword")));
    }

    @Operation(summary = "회원 정보 수정 (닉네임, 생일, 전화번호, 아이와의 관계, 프로필 사진)", tags = "users")
    @PutMapping("/info")
    public ResponseEntity<?> changePassword(@Login LoginUser user,
                                            @RequestBody UserUpdateReq userUpdateReq) {
        userService.updateUserInfo(user.getUserId(), userUpdateReq);
        return ResponseUtil.success();
    }
    
    // TODO: 회원 탈퇴 API 추가

}
