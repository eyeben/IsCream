package com.ssafy.iscream.common.exception;

import com.ssafy.iscream.common.response.ResponseData;
import org.springframework.http.HttpStatus;

public class ForbiddenException extends GlobalException {

    public ForbiddenException(ResponseData<?> error) {
        super(error, HttpStatus.FORBIDDEN);
    }

}
