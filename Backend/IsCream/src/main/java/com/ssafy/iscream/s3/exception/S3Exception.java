package com.ssafy.iscream.s3.exception;

import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.MinorException;
import com.ssafy.iscream.common.response.ResponseData;

public class S3Exception {

    public static class S3UploadException extends MinorException {
        public S3UploadException(ErrorCode errorCode) {
            super(ResponseData.builder()
                    .code(errorCode.getCode())
                    .message(errorCode.getMessage())
                    .build());
        }
    }

}
