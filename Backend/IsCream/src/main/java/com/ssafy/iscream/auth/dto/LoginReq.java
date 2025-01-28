package com.ssafy.iscream.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(description = "로그인 request")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginReq {
    @Schema(description = "이메일", example = "test")
    private String email;

    @Schema(description = "비밀번호", example = "1234")
    private String password;
}
