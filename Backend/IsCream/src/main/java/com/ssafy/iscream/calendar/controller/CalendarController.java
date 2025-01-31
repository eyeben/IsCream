package com.ssafy.iscream.calendar.controller;


import com.ssafy.iscream.calendar.service.CalendarService;
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

    @GetMapping("/{childId}")
    @Operation(summary = "선택된 자녀 달력 출력")
    public ResponseEntity<?> getCalendar(@PathVariable int childId) {
        return null;
    }

    @GetMapping("/{childId}/detail")
    @Operation(summary = "선택된 자녀 달력 날짜별 정보 출력")
    public ResponseEntity<?> getCalendarDetail(@PathVariable int childId) {
        return null;
    }


    @PostMapping("/memo")
    @Operation(summary = "날짜별로 메모를 작성")
    public ResponseEntity<?> creatMemo(@RequestParam int childId, @RequestParam String selectedDate, @RequestParam String memo) {
        return null;
    }

    @PutMapping("/memo/{memoId}")
    @Operation(summary = "날짜별로 메모를 작성")
    public ResponseEntity<?> updateMemo(@PathVariable int memoId, @RequestParam String memo) {
        return null;
    }





}
