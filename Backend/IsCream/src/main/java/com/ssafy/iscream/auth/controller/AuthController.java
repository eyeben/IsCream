package com.ssafy.iscream.auth.controller;

import com.ssafy.iscream.auth.dto.Token;
import com.ssafy.iscream.auth.exception.AuthException;
import com.ssafy.iscream.auth.jwt.JwtUtil;
import com.ssafy.iscream.auth.jwt.TokenProvider;
import com.ssafy.iscream.auth.service.TokenService;
import com.ssafy.iscream.common.exception.BadRequestException;
import com.ssafy.iscream.common.util.ResponseUtil;
import com.ssafy.iscream.user.dto.request.UserCreateReq;
import com.ssafy.iscream.user.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.ssafy.iscream.auth.jwt.JwtUtil.createCookie;

@Controller
@RequiredArgsConstructor
@RequestMapping("/users")
public class AuthController {

    private final UserService userService;
    private final TokenService tokenService;

    @PostMapping("/join")
    @Operation(summary = "회원가입", tags = "auth")
    public ResponseEntity<?> join(@RequestBody UserCreateReq user) {
        return ResponseUtil.success(userService.joinProcess(user));
    }

    @Operation(summary = "토큰 재발급", tags = "auth")
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        Token token = tokenService.getNewToken(request); // 새로운 access, refresh 토큰 얻기

        // response
        response.setHeader("access", token.getAccessToken());
        response.addHeader("Set-Cookie", JwtUtil.createCookie("refresh", token.getRefreshToken()));

        return ResponseUtil.success();
    }

}
