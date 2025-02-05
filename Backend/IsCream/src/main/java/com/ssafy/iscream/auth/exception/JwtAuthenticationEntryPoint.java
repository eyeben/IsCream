package com.ssafy.iscream.auth.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.iscream.auth.exception.AuthException.*;
import com.ssafy.iscream.common.response.ResponseData;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

import static com.ssafy.iscream.common.exception.ErrorCode.*;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        String code = TOKEN_ERROR.getCode();
        String message = TOKEN_ERROR.getMessage();

        if (authException instanceof AuthTokenException e) {
            code = e.getErrorCode().getCode();
            message = e.getErrorCode().getMessage();
        }

        ResponseData<?> errorResponse = ResponseData.builder()
                .code(code)
                .message(message)
                .build();

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        new ObjectMapper().writeValue(response.getWriter(), errorResponse);
    }
}
