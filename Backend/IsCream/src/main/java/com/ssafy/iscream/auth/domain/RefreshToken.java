package com.ssafy.iscream.auth.domain;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash(value = "refreshToken", timeToLive = 86400000L)
public class RefreshToken {

    @Id
    private String refreshToken;
    private Integer userId;

    public RefreshToken(String refreshToken, Integer userId) {
        this.refreshToken = refreshToken;
        this.userId = userId;
    }
}
