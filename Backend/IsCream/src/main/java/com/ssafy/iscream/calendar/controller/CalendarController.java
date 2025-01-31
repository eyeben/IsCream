package com.ssafy.iscream.calendar.controller;


import com.ssafy.iscream.calendar.dto.request.CalendarGetDetailReq;
import com.ssafy.iscream.calendar.dto.request.CalendarGetReq;
import com.ssafy.iscream.calendar.dto.request.MemoCreateReq;
import com.ssafy.iscream.calendar.dto.request.MemoUpdateReq;
import com.ssafy.iscream.calendar.service.CalendarService;
import com.ssafy.iscream.common.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;

@RestController
@RequiredArgsConstructor
@RequestMapping("/calendars")
@Tag(name = "calendar")
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping()
    @Operation(summary = "선택된 자녀 달력 출력")
    public ResponseEntity<?> getCalendar(@RequestBody CalendarGetReq calendarGetReq) {

        /*
        ResponseDto:
                day : int(며칠인지) :
         {
            "emoji" : String (이모티콘),
            "isMemo" : boolean (메모 있는지),
            "isHtp" : boolean (HTP 검사 있는지)
        },
         */

        return ResponseUtil.success();

    }

    @GetMapping("/detail")
    @Operation(summary = "선택된 자녀 달력 날짜별 정보 출력")
    public ResponseEntity<?> getCalendarDetail(@RequestBody CalendarGetDetailReq calendarGetDetailReq) {


        /*
        Response Dto :
        "isMemo": boolean (메모 있는지),
        "isHtp": boolean (htp 검사 있는지),
        "houseUrl": String (집 그림 이미지 url),
        "treeUrl": String (나무 그림 이미지 url),
        "personUrl": String (사람 그림 이미지 url),
        "report": String (검사 결과),
        "memoId" : String (메모아이디)
        "memo": String (메모 내용)
         */

        return null;
    }


    @PostMapping("/memo")
    @Operation(summary = "날짜별로 메모를 작성")
    public ResponseEntity<?> createMemo(@RequestBody MemoCreateReq memoCreateReq) {

        return null;
    }

    @PutMapping("/memo")
    @Operation(summary = "날짜별로 메모를 수정")
    public ResponseEntity<?> updateMemo(@RequestBody MemoUpdateReq memoUpdateReq) {
        return null;
    }


    @DeleteMapping("/memo/{memoId}")
    @Operation(summary = "날짜별로 메모를 삭제")
    public ResponseEntity<?> deleteMemo(@PathVariable Long memoId) {
        return null;
    }


}
