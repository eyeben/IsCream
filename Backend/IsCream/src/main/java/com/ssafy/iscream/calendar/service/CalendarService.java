package com.ssafy.iscream.calendar.service;

import com.ssafy.iscream.calendar.dto.request.CalendarGetDetailReq;
import com.ssafy.iscream.calendar.dto.request.CalendarGetReq;
import com.ssafy.iscream.calendar.dto.request.MemoCreateReq;
import com.ssafy.iscream.calendar.dto.request.MemoUpdateReq;
import com.ssafy.iscream.calendar.dto.response.CalendarGetDetailRes;
import com.ssafy.iscream.calendar.dto.response.CalendarGetRes;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CalendarService {

    public Map<Integer, CalendarGetRes> getCalendar(CalendarGetReq calendarGetReq) {
        return null;
    }

    public CalendarGetDetailRes getCalendarDetail(CalendarGetDetailReq calendarGetDetailReq) {
        return null;
    }

    public void createMemo(MemoCreateReq memoCreateReq) {
    }

    public void updateMemo(MemoUpdateReq memoUpdateReq) {
    }

    public void deleteMemo(Long memoId) {
    }
}
