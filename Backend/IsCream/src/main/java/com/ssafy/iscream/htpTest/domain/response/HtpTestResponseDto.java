package com.ssafy.iscream.htpTest.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class HtpTestResponseDto {
    private Integer testId;  // 검사 아이디
    private String title;    // 검사 제목
    private String date;     // 작성 날짜
}