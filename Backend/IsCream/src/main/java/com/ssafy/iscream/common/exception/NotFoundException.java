package com.ssafy.iscream.common.exception;

import com.ssafy.iscream.common.response.ResponseData;
import org.springframework.http.HttpStatus;

public class NotFoundException extends GlobalException {

    public NotFoundException(ResponseData<?> error) {
        super(error, HttpStatus.NOT_FOUND);
    }

}
