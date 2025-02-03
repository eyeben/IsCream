package com.ssafy.iscream.calendar.service;

import com.ssafy.iscream.calendar.domain.Memo;
import com.ssafy.iscream.calendar.dto.request.CalendarGetDetailReq;
import com.ssafy.iscream.calendar.dto.request.CalendarGetReq;
import com.ssafy.iscream.calendar.dto.request.MemoCreateReq;
import com.ssafy.iscream.calendar.dto.request.MemoUpdateReq;
import com.ssafy.iscream.calendar.dto.response.CalendarGetDetailRes;
import com.ssafy.iscream.calendar.dto.response.CalendarGetRes;
import com.ssafy.iscream.calendar.repository.MemoRepository;
import com.ssafy.iscream.htpTest.domain.HtpTest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CalendarService {
    MemoRepository memoRepository;
    // TODO: 예외처리 추가해야함

    public CalendarGetDetailRes getCalendarDetail(CalendarGetDetailReq calendarGetDetailReq) {
        return null;
    }

    public void createMemo(MemoCreateReq memoCreateReq) {
        Memo memo = Memo.builder()
                .childId(memoCreateReq.getChildId())
                .content(memoCreateReq.getMemo())
                .build();

        memoRepository.save(memo);
    }

    public void updateMemo(MemoUpdateReq memoUpdateReq) throws Exception{
        Memo memo = memoRepository.findById(memoUpdateReq.getMemoId())
                .orElseThrow(() -> new Exception("메모를 찾을 수 없습니다."));
        memo.updateContent(memoUpdateReq.getMemo());
        memoRepository.save(memo);
    }

    public void deleteMemo(int memoId) throws Exception{
        Memo memo = memoRepository.findById(memoId)
                .orElseThrow(() -> new Exception("메모가 존재하지 않습니다."));
        memoRepository.deleteById(memoId);
    }

    public List<Integer> getDaysByYearMonth(CalendarGetReq calendarGetReq) {
        int year = calendarGetReq.getYearMonth().getYear();
        Month month = calendarGetReq.getYearMonth().getMonth();
        LocalDateTime startDate = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime endDate = startDate.plusMonths(1); // 다음 달 1일 (해당 월의 끝까지 포함)

        List<Memo> memos = memoRepository.findByChildIdAndCreatedAtBetween( calendarGetReq.getChildId(), startDate, endDate);
        List<Integer> days = new ArrayList<>();
        for (Memo memo : memos) {
            days.add(memo.getCreatedAt().getDayOfMonth());
        }
        return days;

    }
}
