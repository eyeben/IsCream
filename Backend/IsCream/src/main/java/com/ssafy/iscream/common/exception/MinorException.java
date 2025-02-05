package com.ssafy.iscream.common.exception;

import com.ssafy.iscream.common.response.ResponseData;
import org.springframework.http.HttpStatus;

public class MinorException extends GlobalException {
    public MinorException(ResponseData<?> data) {
        super(data, HttpStatus.OK);
    }
}
