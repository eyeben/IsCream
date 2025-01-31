package com.ssafy.iscream.auth.controller;

import com.ssafy.iscream.auth.jwt.JwtUtil;
import com.ssafy.iscream.auth.jwt.TokenProvider;
import com.ssafy.iscream.auth.service.TokenService;
import com.ssafy.iscream.common.exception.BadRequestException;
import com.ssafy.iscream.common.exception.UnauthorizedException;
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

@Controller
@RequiredArgsConstructor
@RequestMapping("/users")
public class AuthController {

    private final UserService userService;
    private final TokenService tokenService;
    private final TokenProvider tokenProvider;

    @PostMapping("/join")
    @Operation(summary = "회원가입", tags = "auth")
    public ResponseEntity<?> join(@RequestBody UserCreateReq user) {
        return ResponseUtil.success(userService.joinProcess(user));
    }

    @Operation(summary = "토큰 재발급", tags = "auth")
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        // get refresh token
        String refresh = JwtUtil.extractTokenFromCookie(request, "refresh");

        if (refresh == null) {
            throw new BadRequestException.TokenRequestException();
        }

        try {
            if (!tokenProvider.validateToken(refresh)) {
                throw new UnauthorizedException.TokenExpiredException();
            }
        } catch (ExpiredJwtException e) {
            throw new UnauthorizedException.InvalidTokenException();
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = tokenProvider.getCategory(refresh);

        if (!category.equals("refresh")) {
            throw new BadRequestException.TokenRequestException();
        }

        boolean isExist = tokenService.existRefreshToken(refresh);

        if (!isExist) {
            throw new BadRequestException.TokenRequestException();
        }

        Integer userId = tokenProvider.getUserId(refresh);
        String email = tokenProvider.getEmail(refresh);
        String role = tokenProvider.getRole(refresh);

        // make new JWT
        String newAccess = tokenProvider.createAccessToken(userId, email, role);
        String newRefresh = tokenProvider.createRefreshToken(userId, email, role);

        // 기존 토큰 삭제
        tokenService.deleteRefreshToken(refresh);

        // redis에 refresh token 저장
        tokenService.addRefreshToken(refresh, userId);

        // response
        response.setHeader("access", newAccess);
        response.addHeader("Set-Cookie", JwtUtil.createCookie("refresh", newRefresh));

        return ResponseUtil.success();
    }

}
