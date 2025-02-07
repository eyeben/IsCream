package com.ssafy.iscream.htpTest.service;

import com.ssafy.iscream.calendar.dto.request.CalendarGetReq;
import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.NotFoundException;
import com.ssafy.iscream.common.exception.UnauthorizedException;
import com.ssafy.iscream.common.response.ResponseData;
import com.ssafy.iscream.htpTest.domain.HtpTest;
import com.ssafy.iscream.htpTest.repository.HtpTestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HtpTestService {
    private final HtpTestRepository htpTestRepository;

    public List<HtpTest> getByYearMonth(Integer userId, CalendarGetReq calendarGetReq) {
        int year = calendarGetReq.getYearMonth().getYear();
        Month month = calendarGetReq.getYearMonth().getMonth();
        LocalDateTime startDate = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime endDate = startDate.plusMonths(1); // 다음 달 1일 (해당 월의 끝까지 포함)

        // 권한 없는 경우
        List<HtpTest> htpTests = htpTestRepository.findByChildIdAndCreatedAtBetween( calendarGetReq.getChildId(), startDate, endDate);
        if (!htpTests.isEmpty() && !userId.equals(htpTests.get(0).getChildId())) {
            throw new UnauthorizedException(new ResponseData<>(ErrorCode.DATA_FORBIDDEN_ACCESS.getCode(), ErrorCode.DATA_FORBIDDEN_ACCESS.getMessage(), null));
        }

        return htpTests;
    }

    public HtpTest getByChildIdAndDate(Integer childId, LocalDate selectedDate) {
        return htpTestRepository.findByChildIdAndDate(childId, selectedDate).orElse(null);

    }
}
