package com.ssafy.iscream.auth.exception;

import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.MinorException;
import com.ssafy.iscream.common.response.ResponseData;
import lombok.Getter;
import org.springframework.security.core.AuthenticationException;

public class AuthException {

    public static class UserExistException extends MinorException {
        public UserExistException() {
            super(ResponseData.builder()
                    .code(ErrorCode.DUPLICATE_USER.getCode())
                    .message(ErrorCode.DUPLICATE_USER.getMessage())
                    .build());
        }
    }

    @Getter
    public static class AuthTokenException extends AuthenticationException {
        private final ErrorCode errorCode;

        public AuthTokenException(ErrorCode errorCode) {
            super(errorCode.getMessage());
            this.errorCode = errorCode;
        }
    }


}
