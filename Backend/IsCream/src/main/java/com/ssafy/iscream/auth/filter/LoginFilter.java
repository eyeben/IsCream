package com.ssafy.iscream.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.iscream.auth.service.CustomUserDetails;
import com.ssafy.iscream.auth.JwtUtil;
import com.ssafy.iscream.auth.dto.LoginReq;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Collection;
import java.util.Iterator;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public LoginFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        super.setFilterProcessesUrl("/users/login"); // 기본 경로 변경
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            // 요청 본문에서 LoginReq 객체를 파싱
            // 클라이언트 요청에서 loginId, password 추출 -> json 형식으로 받음
            ObjectMapper objectMapper = new ObjectMapper();
            LoginReq loginReq = objectMapper.readValue(request.getInputStream(), LoginReq.class);

            String email = loginReq.getEmail();
            String password = loginReq.getPassword();

            // 스프링 시큐리티에서 loginId과 password를 검증하기 위해서는 token에 담아야 함
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password);

            // token에 담은 검증을 위한 AuthenticationManager로 전달
            return authenticationManager.authenticate(authToken);

        } catch (Exception e) {
            throw new AuthenticationException("Authentication failed", e) {};
        }
    }

    // 로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // 유저 정보
        int userId = userDetails.getUserId();
        String email = userDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();

        // 토큰 생성
        String access = jwtUtil.createJwt("access", userId, email, role, 6000000L);
        String refresh = jwtUtil.createJwt("refresh", userId, email, role, 86400000L);

        response.setHeader("access", access);
        response.addHeader("Set-Cookie", createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
    }

    // 로그인 실패시 실행하는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        response.setStatus(401);
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
