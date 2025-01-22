package com.ssafy.iscream.common.exception;

import com.ssafy.iscream.common.response.ResponseData;
import org.springframework.http.HttpStatus;

public class ConflictException extends GlobalException {
    public ConflictException(ResponseData<?> error) {
        super(error, HttpStatus.CONFLICT);
    }
}
