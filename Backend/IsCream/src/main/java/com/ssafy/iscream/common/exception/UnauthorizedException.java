package com.ssafy.iscream.common.exception;

import com.ssafy.iscream.common.response.ResponseData;
import org.springframework.http.HttpStatus;

public class UnauthorizedException extends GlobalException {

    public UnauthorizedException(ResponseData<?> error) {
        super(error, HttpStatus.UNAUTHORIZED);
    }

}
