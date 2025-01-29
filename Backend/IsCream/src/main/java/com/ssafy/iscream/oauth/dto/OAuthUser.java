package com.ssafy.iscream.oauth.dto;

import lombok.Data;

@Data
public class OAuthUser {
    private String email;
    private String username;
    private String role = "USER";
}
