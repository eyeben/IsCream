package com.ssafy.iscream.user.exception;

import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.MinorException;
import com.ssafy.iscream.common.response.ResponseData;

public class UserException {

    public static class UserExistException extends MinorException {
        public UserExistException() {
            super(ResponseData.builder()
                    .code(ErrorCode.DUPLICATE_USER.getCode())
                    .message(ErrorCode.DUPLICATE_USER.getMessage())
                    .build());
        }
    }

}
