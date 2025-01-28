package com.ssafy.iscream.user.dto.request;

import com.ssafy.iscream.user.domain.Relation;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(description = "회원가입 request")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateReq {
    private String username;
    private String email;
    private String password;
    private String nickname;
    private String phone;
    private String birthDate;
    private String relation = "REST";
}
