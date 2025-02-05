package com.ssafy.iscream.calendar.dto.response;

import lombok.Data;

@Data
public class CalendarGetDetailRes {
    boolean isMemo;
    boolean isHtp;
    String houseUrl;
    String treeUrl;
    String personUrl;
    String report;
    int memoId;
    String memo;
}
