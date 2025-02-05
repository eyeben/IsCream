package com.ssafy.iscream.user.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(description = "회원가입 request")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateReq {
    @Schema(description = "이름", example = "test")
    private String username;

    @Schema(description = "이메일", example = "test@naver.com")
    private String email;

    @Schema(description = "비밀번호", example = "1234")
    private String password;

    @Schema(description = "닉네임", example = "test")
    private String nickname;

    @Schema(description = "전화번호", example = "010-1111-2222")
    private String phone;

    @Schema(description = "생일", example = "2024-01-31")
    private String birthDate;

    @Schema(description = "아이와의 관계", example = "MOTHER, FATHER, REST")
    private String relation = "REST";
}
