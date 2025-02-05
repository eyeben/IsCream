package com.ssafy.iscream.calendar.service;

import com.ssafy.iscream.calendar.dto.request.CalendarGetReq;
import com.ssafy.iscream.calendar.dto.response.CalendarGetRes;
import com.ssafy.iscream.htpTest.service.HtpTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CalendarFacade {
    private final CalendarService calendarService;
    private final HtpTestService htpTestService;

    public Map<Integer, CalendarGetRes> getCalendar(CalendarGetReq calendarGetReq) {
        List<Integer> htpTestDays = htpTestService.getDaysByYearMonth(calendarGetReq);
        List<Integer> memoDays = calendarService.getDaysByYearMonth(calendarGetReq);
        return null;
    }
}
