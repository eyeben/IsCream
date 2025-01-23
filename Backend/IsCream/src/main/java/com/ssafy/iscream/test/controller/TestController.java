package com.ssafy.iscream.test.controller;

import com.ssafy.iscream.common.util.ResponseUtil;
import com.ssafy.iscream.test.service.TestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    @Operation(summary = "예외 처리 동작 테스트", tags = "test")
    @GetMapping
    public ResponseEntity<?> exceptionTest(
            @Parameter(description = "이메일") @RequestParam(name = "email", required = false) String email,
            @Parameter(description = "닉네임") @RequestParam(name = "nickname", required = false) String nickname
    ) {
        return ResponseUtil.success(testService.testException(email, nickname));
    }

}
