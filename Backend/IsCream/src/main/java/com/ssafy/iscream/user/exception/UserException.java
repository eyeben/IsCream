package com.ssafy.iscream.user.exception;

import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.MinorException;
import com.ssafy.iscream.common.response.ResponseData;

public class UserException {

    public static class UserNotFoundException extends MinorException {
        public UserNotFoundException(ErrorCode errorCode) {
            super(ResponseData.builder()
                    .code(errorCode.getCode())
                    .message(errorCode.getMessage())
                    .build());
        }
    }

    public static class EmailException extends MinorException {
        public EmailException() {
            super(ResponseData.builder()
                    .code(ErrorCode.DUPLICATE_EMAIL.getCode())
                    .message(ErrorCode.DUPLICATE_EMAIL.getMessage())
                    .build());
        }
    }

    public static class NicknameException extends MinorException {
        public NicknameException() {
            super(ResponseData.builder()
                    .code(ErrorCode.DUPLICATE_NICKNAME.getCode())
                    .message(ErrorCode.DUPLICATE_NICKNAME.getMessage())
                    .build());
        }
    }

    public static class PasswordException extends MinorException {
        public PasswordException(ErrorCode errorCode) {
            super(ResponseData.builder()
                    .code(errorCode.getCode())
                    .message(errorCode.getMessage())
                    .build());
        }
    }

}
