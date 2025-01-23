package com.ssafy.iscream.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder @Data
@NoArgsConstructor @AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "결과 공통 정보")
public class ResponseData<T> {

    // 결과 코드
    @JsonProperty("code")
    private String code;

    // 결과 메시지
    @JsonProperty("message")
    private String message;

    // 결과 데이터
    @JsonProperty("data")
    private T data = null;

}
