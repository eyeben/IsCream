package com.ssafy.iscream.auth.service;

import com.ssafy.iscream.auth.domain.RefreshToken;
import com.ssafy.iscream.auth.domain.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {

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

}
