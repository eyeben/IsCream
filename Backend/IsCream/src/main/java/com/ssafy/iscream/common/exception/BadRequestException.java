package com.ssafy.iscream.common.exception;

import com.ssafy.iscream.common.response.ResponseData;
import org.springframework.http.HttpStatus;

public class BadRequestException extends GlobalException {
    public BadRequestException(ResponseData<?> error) {
        super(error, HttpStatus.BAD_REQUEST);
    }

    // 파라미터 형식 올바르지 않음
    public static class ParameterException extends BadRequestException {
        public ParameterException() {
            super(ResponseData.builder()
                    .code(ErrorCode.INVALID_PARAMETER.getCode())
                    .message(ErrorCode.INVALID_PARAMETER.getMessage())
                    .build());
        }
    }

    // 파일 URL 잘못되었음
    public static class ImageBadRequestException extends BadRequestException {
        public ImageBadRequestException() {
            super(ResponseData.builder()
                    .code(ErrorCode.INVALID_FILE_URL_FORMAT.getCode())
                    .message(ErrorCode.INVALID_FILE_URL_FORMAT.getMessage())
                    .build());
        }
    }
}
