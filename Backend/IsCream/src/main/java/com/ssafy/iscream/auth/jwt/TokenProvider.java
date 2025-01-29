package com.ssafy.iscream.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class TokenProvider {

    private SecretKey secretKey;

    @Value("${spring.auth.jwt.secretKey}")
    private String secret;

    @Value("${spring.auth.jwt.accessTokenExpiry}")
    private long accessTokenValidity;

    @Value("${spring.auth.jwt.refreshTokenExpiry}")
    private long refreshTokenValidity;

    @PostConstruct
    public void init() {
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    // access token 생성
    public String createAccessToken(int userId, String email, String role) {
        return createToken("access", userId, email, role, accessTokenValidity);
    }

    // refresh token 생성
    public String createRefreshToken(int userId, String email, String role) {
        return createToken("refresh", userId, email, role, refreshTokenValidity);
    }

    // 토큰 생성
    private String createToken(String category, int userId, String email, String role, long validity) {
        return Jwts.builder()
                .claim("category", category)
                .claim("userId", userId)
                .claim("email", email)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + validity))
                .signWith(secretKey)
                .compact();
    }

    // 토큰 검증
    public boolean validateToken(String token) {
        try {
            Date expiration = Jwts.parser().verifyWith(secretKey).build()
                    .parseSignedClaims(token)
                    .getPayload().getExpiration();

            return expiration.after(new Date()); // 만료 시간이 현재 시간보다 이후이면 true (유효함)
        } catch (JwtException e) {
            return false; // 파싱 실패 또는 만료된 경우 false 반환
        }
    }

    // 토큰에서 정보 추출
    public Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String getEmail(String token) {
        return getClaims(token).get("email", String.class);
    }

    public int getUserId(String token) {
        return getClaims(token).get("userId", Integer.class);
    }

    public String getRole(String token) {
        return getClaims(token).get("role", String.class);
    }

    public String getCategory(String token) {
        return getClaims(token).get("category", String.class);
    }

}
