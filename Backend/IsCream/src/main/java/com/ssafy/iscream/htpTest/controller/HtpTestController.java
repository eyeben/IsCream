package com.ssafy.iscream.htpTest.controller;

import com.ssafy.iscream.auth.user.Login;
import com.ssafy.iscream.common.util.ResponseUtil;
import com.ssafy.iscream.htpTest.domain.request.HtpTestCreateReq;
import com.ssafy.iscream.htpTest.service.HtpTestService;
import com.ssafy.iscream.user.domain.User;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/htp-tests")
@RestController
@RequiredArgsConstructor
public class HtpTestController {
    private final HtpTestService htpTestService;

    @PostMapping("/img")
    @Operation(summary = "Htp Test 수행 4번해야함", tags = "htp")
    public ResponseEntity<?> img(@Login User user, HtpTestCreateReq req) {
        String result = htpTestService.htpTestCycle(user, req);
        return ResponseUtil.success(result);
    }

}
