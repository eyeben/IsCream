package com.ssafy.iscream.oauth;

import com.ssafy.iscream.auth.JwtUtil;
import com.ssafy.iscream.auth.domain.RefreshToken;
import com.ssafy.iscream.auth.domain.RefreshTokenRepository;
import com.ssafy.iscream.auth.service.CustomUserDetails;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Component
@RequiredArgsConstructor
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        // OAuth2User
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        String email = customUserDetails.getUsername();
        int userId = customUserDetails.getUserId();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        String access = jwtUtil.createJwt("access", userId, email, role, 6000000L);
        String refresh = jwtUtil.createJwt("refresh", userId, email, role, 86400000L);

        // redis에 refresh token 저장
        RefreshToken redis = new RefreshToken(refresh, userId);
        refreshTokenRepository.save(redis);

        response.setHeader("access", access);
        response.addHeader("Set-Cookie", createCookie("refresh", refresh));
        response.sendRedirect("http://localhost:3000/");
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
