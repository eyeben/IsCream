package com.ssafy.iscream.user.controller;

import com.ssafy.iscream.auth.domain.LoginUser;
import com.ssafy.iscream.auth.jwt.JwtUtil;
import com.ssafy.iscream.auth.jwt.TokenProvider;
import com.ssafy.iscream.auth.service.TokenService;
import com.ssafy.iscream.auth.user.Login;
import com.ssafy.iscream.common.exception.BadRequestException.*;
import com.ssafy.iscream.common.exception.UnauthorizedException.*;
import com.ssafy.iscream.common.util.ResponseUtil;
import com.ssafy.iscream.user.domain.User;
import com.ssafy.iscream.user.dto.request.UserCreateReq;
import com.ssafy.iscream.user.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/info")
    @Operation(summary = "사용자 정보 조회", tags = "users")
    public ResponseEntity<?> getUserInfo(@Login LoginUser user) {
        System.out.println(user.toString());
        return ResponseUtil.success(userService.getUser(user.getUserId()));
    }

    // TODO: 이메일 중복 확인
    @PostMapping
    @Operation(summary = "이메일 중복 확인", tags = "users")
    public ResponseEntity<?> duplicateEmail(@RequestBody Map<String, String> map) {
        return null;
    }

    // TODO: 닉네임 중복 확인

    // TODO: 사용자 정보 확인 (이메일, 이름, 전화번호)

    // TODO: 비밀번호 재설정/변경

    // TODO: 회원 정보 수정 (닉네임, 생일, 전화번호, 아이와의 관계, 프로필 사진)

}
