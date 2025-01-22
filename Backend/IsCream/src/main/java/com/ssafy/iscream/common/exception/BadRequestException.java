package com.ssafy.iscream.common.exception;

import com.ssafy.iscream.common.response.ResponseData;
import org.springframework.http.HttpStatus;

public class BadRequestException extends GlobalException {
    public BadRequestException(ResponseData<?> error) {
        super(error, HttpStatus.BAD_REQUEST);
    }

    public static class ImageBadRequestException extends BadRequestException {
        public ImageBadRequestException() {
            super(ResponseData.builder().code("E7004").message("잘못된 형식의 이미지 URL입니다.").build());
        }
    }
}
