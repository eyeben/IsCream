package com.ssafy.iscream.children.dto.req;

import com.ssafy.iscream.children.domain.Gender;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ChildrenUpdateReq {
    Integer childId;
    LocalDate birthDate;
    String nickname;
    Gender gender;
}
