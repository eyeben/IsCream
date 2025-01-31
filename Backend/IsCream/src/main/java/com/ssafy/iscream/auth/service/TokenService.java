package com.ssafy.iscream.auth.service;

import com.ssafy.iscream.auth.domain.RefreshToken;
import com.ssafy.iscream.auth.domain.RefreshTokenRepository;
import com.ssafy.iscream.auth.dto.Token;
import com.ssafy.iscream.auth.exception.AuthException.*;
import com.ssafy.iscream.auth.jwt.JwtUtil;
import com.ssafy.iscream.auth.jwt.TokenProvider;
import com.ssafy.iscream.common.exception.BadRequestException.*;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    // 리프레시 토큰이 존재하는지 확인
    public boolean existRefreshToken(String refreshToken) {
        return refreshTokenRepository.existsById(refreshToken);
    }

    // 저장된 리프레시 토큰 삭제
    public void deleteRefreshToken(String refreshToken) {
        refreshTokenRepository.deleteById(refreshToken);
    }

    public void addRefreshToken(String refreshToken, Integer userId) {
        RefreshToken redis = new RefreshToken(refreshToken, userId);
        refreshTokenRepository.save(redis);
    }

    public String validateRefreshToken(HttpServletRequest request) {
        // get refresh token
        String refresh = JwtUtil.extractTokenFromCookie(request, "refresh");

        if (refresh == null) {
            throw new TokenRequestException();
        }

        try {
            if (!tokenProvider.validateToken(refresh)) {
                throw new TokenExpiredException();
            }
        } catch (ExpiredJwtException e) {
            throw new InvalidTokenException();
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = tokenProvider.getCategory(refresh);

        if (!category.equals("refresh")) {
            throw new TokenRequestException();
        }

        boolean isExist = existRefreshToken(refresh);

        if (!isExist) {
            throw new TokenRequestException();
        }

        return refresh;
    }

    public Token getNewToken(HttpServletRequest request) {
        String refresh = validateRefreshToken(request);

        Integer userId = tokenProvider.getUserId(refresh);
        String email = tokenProvider.getEmail(refresh);
        String role = tokenProvider.getRole(refresh);

        // 기존 토큰 삭제
        deleteRefreshToken(refresh);

        // make new JWT
        String newAccess = tokenProvider.createAccessToken(userId, email, role);
        String newRefresh = tokenProvider.createRefreshToken(userId, email, role);

        // redis에 refresh token 저장
        addRefreshToken(newRefresh, userId);

        return new Token(newAccess, newRefresh);
    }

}
