package com.ssafy.iscream.calendar.dto.request;

import lombok.Data;

@Data
public class CalendarGetReq {
    int userId;
    String yearMonth;
}
