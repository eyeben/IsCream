package com.ssafy.iscream.auth.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginUser {
    private Integer userId;
    private String email;
}
