package com.ssafy.iscream.htpTest.service;

import com.ssafy.iscream.calendar.dto.request.CalendarGetReq;
import com.ssafy.iscream.htpTest.domain.HtpTest;
import com.ssafy.iscream.htpTest.repository.HtpTestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HtpTestService {
    private final HtpTestRepository htpTestRepository;

    public List<Integer> getDaysByYearMonth(CalendarGetReq calendarGetReq) {
        int year = calendarGetReq.getYearMonth().getYear();
        Month month = calendarGetReq.getYearMonth().getMonth();
        LocalDateTime startDate = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime endDate = startDate.plusMonths(1); // 다음 달 1일 (해당 월의 끝까지 포함)

        List<HtpTest> htpTests = htpTestRepository.findByChildIdAndCreatedAtBetween( calendarGetReq.getChildId(), startDate, endDate);
        List<Integer> days = new ArrayList<>();
        for (HtpTest htpTest : htpTests) {
            days.add(htpTest.getCreatedAt().getDayOfMonth());
        }
        return days;
    }

}
