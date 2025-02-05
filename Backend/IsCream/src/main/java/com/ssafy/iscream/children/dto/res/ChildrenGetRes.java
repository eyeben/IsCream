package com.ssafy.iscream.children.dto.res;

import com.ssafy.iscream.children.domain.Gender;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public class ChildrenGetRes {
    Integer childId;
    String nickname;
    LocalDate birthDate;
    Gender gender;
}
