package com.ssafy.iscream.common.exception;

import com.ssafy.iscream.common.response.ResponseData;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class GlobalException extends RuntimeException {

    private static final long serialVersionUID = 1L;
    private final ResponseData<?> data;
    private final HttpStatus status;

    public GlobalException(ResponseData<?> data, HttpStatus status) {
        super(data.getMessage());
        this.data = data;
        this.status = status;
    }

}