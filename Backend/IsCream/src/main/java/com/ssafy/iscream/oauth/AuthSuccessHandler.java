package com.ssafy.iscream.oauth;

import com.ssafy.iscream.auth.jwt.JwtUtil;
import com.ssafy.iscream.auth.jwt.TokenProvider;
import com.ssafy.iscream.auth.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class AuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;
    private final TokenService tokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        // OAuth2User
        JwtUtil.generateAndSetTokens(response, authentication, tokenProvider, tokenService);
        response.sendRedirect("http://localhost:3000/");
    }
}
