package com.ssafy.iscream.auth.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.response.ResponseData;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        // 권한이 없는 사용자가 접근하려 할 때 호출
        String code = ErrorCode.DATA_FORBIDDEN_ACCESS.getCode();
        String message = ErrorCode.DATA_FORBIDDEN_ACCESS.getMessage();

        // ResponseData 객체로 응답 메시지 설정
        ResponseData<?> errorResponse = ResponseData.builder()
                .code(code)
                .message(message)
                .build();

        // 403 Forbidden 상태 코드로 응답
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // JSON 형태로 응답 작성
        new ObjectMapper().writeValue(response.getWriter(), errorResponse);
    }
}
