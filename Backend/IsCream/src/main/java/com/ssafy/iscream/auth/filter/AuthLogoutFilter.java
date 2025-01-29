package com.ssafy.iscream.auth.filter;

import com.ssafy.iscream.auth.jwt.JwtUtil;
import com.ssafy.iscream.auth.jwt.TokenProvider;
import com.ssafy.iscream.auth.service.TokenService;
import com.ssafy.iscream.common.exception.BadRequestException.*;
import com.ssafy.iscream.common.exception.UnauthorizedException.*;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class AuthLogoutFilter extends GenericFilterBean {

    private final TokenProvider tokenProvider;
    private final TokenService tokenService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        // path and method verify
        String requestUri = request.getRequestURI();
        if (!requestUri.matches("^/users/logout$")) {
            filterChain.doFilter(request, response);
            return;
        }

        String requestMethod = request.getMethod();
        if (!requestMethod.equals("POST")) {
            filterChain.doFilter(request, response);
            return;
        }

        // get refresh token
        String refresh = JwtUtil.extractTokenFromCookie(request, "refresh");

        // refresh null check
        if (refresh == null) {
            throw new TokenRequestException();
        }

        // expired check
        try {
            if (!tokenProvider.validateToken(refresh)) {
                throw new TokenExpiredException();
            }
        } catch (ExpiredJwtException e) {
            throw new TokenExpiredException();
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = tokenProvider.getCategory(refresh);
        if (!category.equals("refresh")) {
            log.error("Invalid refresh token");
            throw new TokenRequestException();
        }

        // 로그아웃 진행
        boolean isExist = tokenService.existRefreshToken(refresh);

        if (!isExist) {
            log.error("refresh token does not exist");
            throw new TokenRequestException();
        }

        tokenService.deleteRefreshToken(refresh);

        // Refresh 토큰 Cookie 값 0
        response.addHeader("Set-Cookie", JwtUtil.createCookie("refresh", ""));
        response.setStatus(HttpServletResponse.SC_OK);
        JwtUtil.writeJsonResponse(response, "S0000", "정상적으로 처리되었습니다.");
    }
}
