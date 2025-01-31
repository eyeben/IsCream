package com.ssafy.iscream.calendar.dto.request;

import lombok.Data;

import java.time.YearMonth;

@Data
public class CalendarGetReq {
    int userId;
    YearMonth yearMonth;
}
