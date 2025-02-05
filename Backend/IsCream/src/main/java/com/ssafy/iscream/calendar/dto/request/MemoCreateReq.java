package com.ssafy.iscream.calendar.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MemoCreateReq {
    int childId;
    LocalDate selectedDate;
    String memo;
}
