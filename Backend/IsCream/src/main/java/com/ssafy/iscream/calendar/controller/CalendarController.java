package com.ssafy.iscream.calendar.controller;


import com.ssafy.iscream.calendar.dto.request.CalendarGetDetailReq;
import com.ssafy.iscream.calendar.dto.request.CalendarGetReq;
import com.ssafy.iscream.calendar.dto.request.MemoCreateReq;
import com.ssafy.iscream.calendar.dto.request.MemoUpdateReq;
import com.ssafy.iscream.calendar.service.CalendarFacade;
import com.ssafy.iscream.calendar.service.CalendarService;
import com.ssafy.iscream.common.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//TODO: 예외 처리 방식 -> 공통 에러 생성 시 수정해야함
@RestController
@RequiredArgsConstructor
@RequestMapping("/calendars")
@Tag(name = "calendar")
public class CalendarController {

    private final CalendarService calendarService;
    private final CalendarFacade calendarFacade;

    @PostMapping()
    @Operation(summary = "선택된 자녀 달력 출력")
    public ResponseEntity<?> getCalendar(@RequestBody CalendarGetReq calendarGetReq) {
        return ResponseUtil.success(calendarFacade.getCalendar(calendarGetReq));
    }

    @PostMapping("/detail")
    @Operation(summary = "선택된 자녀 달력 날짜별 정보 출력")
    public ResponseEntity<?> getCalendarDetail(@RequestBody CalendarGetDetailReq calendarGetDetailReq) {
        return ResponseUtil.success(calendarService.getCalendarDetail(calendarGetDetailReq));
    }


    @PostMapping("/memo")
    @Operation(summary = "날짜 별로 메모를 작성")
    public ResponseEntity<?> createMemo(@RequestBody MemoCreateReq memoCreateReq) {
        calendarService.createMemo(memoCreateReq);
        return ResponseUtil.success();
    }

    @PutMapping("/memo")
    @Operation(summary = "날짜 별로 메모를 수정")
    public ResponseEntity<?> updateMemo(@RequestBody MemoUpdateReq memoUpdateReq) throws Exception {
        calendarService.updateMemo(memoUpdateReq);
        return ResponseUtil.success();
    }


    @DeleteMapping("/memo/{memoId}")
    @Operation(summary = "날짜 별로 메모를 삭제")
    public ResponseEntity<?> deleteMemo(@PathVariable int memoId) throws Exception {
        calendarService.deleteMemo(memoId);
        return ResponseUtil.success();
    }


}
