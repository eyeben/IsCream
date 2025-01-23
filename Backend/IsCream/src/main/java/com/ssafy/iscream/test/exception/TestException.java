package com.ssafy.iscream.test.exception;

import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.MinorException;
import com.ssafy.iscream.common.response.ResponseData;

public class TestException {

    public static class TestEmailException extends MinorException {
        public TestEmailException() {
            super(ResponseData.builder()
                    .code(ErrorCode.DUPLICATE_EMAIL.getCode())
                    .message(ErrorCode.DUPLICATE_EMAIL.getMessage())
                    .build());
        }
    }

    public static class TestEmailFormatException extends MinorException {
        public TestEmailFormatException() {
            super(ResponseData.builder()
                    .code(ErrorCode.INVALID_EMAIL_FORMAT.getCode())
                    .message(ErrorCode.INVALID_EMAIL_FORMAT.getMessage())
                    .build());
        }
    }

    public static class TestNicknameException extends MinorException {
        public TestNicknameException() {
            super(ResponseData.builder()
                    .code(ErrorCode.DUPLICATE_NICKNAME.getCode())
                    .message(ErrorCode.DUPLICATE_NICKNAME.getMessage())
                    .build());
        }
    }
}
