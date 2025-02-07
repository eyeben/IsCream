package com.ssafy.iscream.calendar.service;

import com.ssafy.iscream.calendar.domain.Memo;
import com.ssafy.iscream.calendar.dto.request.CalendarGetDetailReq;
import com.ssafy.iscream.calendar.dto.request.CalendarGetReq;
import com.ssafy.iscream.calendar.dto.request.MemoCreateReq;
import com.ssafy.iscream.calendar.dto.request.MemoUpdateReq;
import com.ssafy.iscream.calendar.dto.response.CalendarGetDetailRes;
import com.ssafy.iscream.calendar.dto.response.CalendarGetRes;
import com.ssafy.iscream.calendar.repository.MemoRepository;
import com.ssafy.iscream.children.domain.Child;
import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.NotFoundException;
import com.ssafy.iscream.common.exception.UnauthorizedException;
import com.ssafy.iscream.common.response.ResponseData;
import com.ssafy.iscream.htpTest.domain.HtpTest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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



    public void createMemo(Integer userId, MemoCreateReq memoCreateReq) {

        Memo memo = Memo.builder()
                .userId(userId)
                .childId(memoCreateReq.getChildId())
                .content(memoCreateReq.getMemo())
                .build();
        memoRepository.save(memo);
    }

    public void updateMemo(Integer userId, MemoUpdateReq memoUpdateReq) {
        // 존재 하지 않을 경우
        Memo memo = memoRepository.findById(memoUpdateReq.getMemoId())
                .orElseThrow(() -> new NotFoundException(
                        new ResponseData<>(ErrorCode.DATA_NOT_FOUND.getCode(), ErrorCode.DATA_NOT_FOUND.getMessage(), null)));

        // 권한 없는 경우
        if (!memo.getUserId().equals(userId)) {
            throw new UnauthorizedException(new ResponseData<>(ErrorCode.DATA_FORBIDDEN_ACCESS.getCode(), ErrorCode.DATA_FORBIDDEN_ACCESS.getMessage(), null));
        }

        memo.updateContent(memoUpdateReq.getMemo());
        memoRepository.save(memo);
    }

    public void deleteMemo(Integer userId, Integer memoId){
        // 존재하지 않을 경우
        Memo memo = memoRepository.findById(memoId)
                .orElseThrow(() -> new NotFoundException(
                        new ResponseData<>(ErrorCode.DATA_NOT_FOUND.getCode(), ErrorCode.DATA_NOT_FOUND.getMessage(), null)));

        // 권한 없는 경우
        if (!memo.getUserId().equals(userId)) {
            throw new UnauthorizedException(new ResponseData<>(ErrorCode.DATA_FORBIDDEN_ACCESS.getCode(), ErrorCode.DATA_FORBIDDEN_ACCESS.getMessage(), null));
        }

        memoRepository.deleteById(memoId);
    }

    public List<Integer> getDaysByYearMonth(Integer userId, CalendarGetReq calendarGetReq) {
        int year = calendarGetReq.getYearMonth().getYear();
        Month month = calendarGetReq.getYearMonth().getMonth();
        LocalDateTime startDate = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime endDate = startDate.plusMonths(1); // 다음 달 1일 (해당 월의 끝까지 포함)

        List<Memo> memos = memoRepository.findByChildIdAndCreatedAtBetween( calendarGetReq.getChildId(), startDate, endDate);
        List<Integer> days = new ArrayList<>();
        for (Memo memo : memos) {
            days.add(memo.getCreatedAt().getDayOfMonth());
        }

        // 권한 없는 경우
        if (!memos.isEmpty() && !memos.get(0).getUserId().equals(userId)) {
            throw new UnauthorizedException(new ResponseData<>(ErrorCode.DATA_FORBIDDEN_ACCESS.getCode(), ErrorCode.DATA_FORBIDDEN_ACCESS.getMessage(), null));
        }

        return days;

    }

    public Memo getByChildIdDate(Integer childId, LocalDate selectedDate) {
        Memo memo = memoRepository.findByChildIdAndDate(childId, selectedDate).orElse(null);
        if(memo != null && memo.getUserId().equals(childId)) {
            throw new UnauthorizedException(new ResponseData<>(ErrorCode.DATA_FORBIDDEN_ACCESS.getCode(), ErrorCode.DATA_FORBIDDEN_ACCESS.getMessage(), null));
        }

        return memo;
    }
}
