package com.ssafy.iscream.user.controller;

import com.ssafy.iscream.auth.JwtUtil;
import com.ssafy.iscream.auth.domain.RefreshToken;
import com.ssafy.iscream.auth.domain.RefreshTokenRepository;
import com.ssafy.iscream.common.util.ResponseUtil;
import com.ssafy.iscream.user.dto.request.UserCreateReq;
import com.ssafy.iscream.user.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final RefreshTokenRepository refreshTokenRepository;

    @PostMapping("/join")
    @Operation(summary = "회원가입", tags = "users")
    public ResponseEntity<?> join(@RequestBody UserCreateReq user) {
        return ResponseUtil.success(userService.joinProcess(user));
    }

    @Operation(summary = "토큰 재발급", tags = "users")
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        // get refresh token
        String refresh = null;

        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
            }
        }

        if (refresh == null) {
            // response status code
            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
        }

        // expired check
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            // response status code
            return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refresh);

        if (!category.equals("refresh")) {
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        Boolean isExist = refreshTokenRepository.existsById(refresh);

        if (!isExist) {
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        int userId = jwtUtil.getUserId(refresh);
        String email = jwtUtil.getEmail(refresh);
        String role = jwtUtil.getRole(refresh);

        // make new JWT
        String newAccess = jwtUtil.createJwt("access", userId, email, role, 6000000L);
        String newRefresh = jwtUtil.createJwt("refresh", userId, email, role, 86400000L);

        // 기존 토큰 삭제
        refreshTokenRepository.deleteById(refresh);

        // redis에 refresh token 저장
        RefreshToken redis = new RefreshToken(refresh, userId);
        refreshTokenRepository.save(redis);

        // response
        response.setHeader("access", newAccess);
        response.addHeader("Set-Cookie", createCookie("refresh", newRefresh));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private String createCookie(String key, String value) {
        return ResponseCookie.from(key, value)
                .httpOnly(true)
                .maxAge(24*60*60)
                .sameSite("None")
                .secure(true)
                .path("/")
                .build()
                .toString();
    }

}
