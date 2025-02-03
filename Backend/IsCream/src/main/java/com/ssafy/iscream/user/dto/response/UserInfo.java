package com.ssafy.iscream.user.dto.response;

import com.ssafy.iscream.user.domain.User;

public record UserInfo(
    String email,
    String username,
    String nickname,
    String phone,
    String birthDate,
    String relation,
    String imageUrl
) {
    public UserInfo(User user) {
        this(user.getEmail(), user.getUsername(), user.getNickname(), user.getPhone(), String.valueOf(user.getBirthDate())
                , user.getRelation().name(), user.getImageUrl());
    }
}
