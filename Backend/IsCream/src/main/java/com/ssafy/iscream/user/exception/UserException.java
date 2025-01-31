package com.ssafy.iscream.user.exception;

import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.MinorException;
import com.ssafy.iscream.common.response.ResponseData;

public class UserException {

    public static class UserNotFoundException extends MinorException {
        public UserNotFoundException() {
            super(ResponseData.builder()
                    .code(ErrorCode.USER_NOT_FOUND.getCode())
                    .message(ErrorCode.USER_NOT_FOUND.getMessage())
                    .build());
        }
    }



}
