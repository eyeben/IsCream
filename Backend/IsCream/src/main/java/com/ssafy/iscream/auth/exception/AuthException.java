package com.ssafy.iscream.auth.exception;

import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.MinorException;
import com.ssafy.iscream.common.exception.UnauthorizedException;
import com.ssafy.iscream.common.response.ResponseData;

public class AuthException {

    public static class UserExistException extends MinorException {
        public UserExistException() {
            super(ResponseData.builder()
                    .code(ErrorCode.DUPLICATE_USER.getCode())
                    .message(ErrorCode.DUPLICATE_USER.getMessage())
                    .build());
        }
    }

    public static class InvalidTokenException extends UnauthorizedException {
        public InvalidTokenException() {
            super(ResponseData.builder()
                    .code(ErrorCode.INVALID_TOKEN.getCode())
                    .message(ErrorCode.INVALID_TOKEN.getMessage())
                    .build());
        }
    }

    public static class TokenExpiredException extends UnauthorizedException {
        public TokenExpiredException() {
            super(ResponseData.builder()
                    .code(ErrorCode.TOKEN_EXPIRED.getCode())
                    .message(ErrorCode.TOKEN_EXPIRED.getMessage())
                    .build());
        }
    }

    public static class LoginException extends UnauthorizedException {
        public LoginException() {
            super(ResponseData.builder()
                    .code(ErrorCode.LOGIN_FAILED.getCode())
                    .message(ErrorCode.LOGIN_FAILED.getMessage())
                    .build());
        }
    }

}
