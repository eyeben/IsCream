package com.ssafy.iscream.user.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(description = "사용자 정보 확인 request")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoReq {
    @Schema(description = "이메일", example = "test@naver.com")
    private String email;

    @Schema(description = "이름", example = "test")
    private String username;

    @Schema(description = "전화번호", example = "010-1111-2222")
    private String phone;
}
