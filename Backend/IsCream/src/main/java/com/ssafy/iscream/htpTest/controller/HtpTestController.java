package com.ssafy.iscream.htpTest.controller;

import com.ssafy.iscream.auth.user.Login;
import com.ssafy.iscream.common.util.ResponseUtil;
import com.ssafy.iscream.htpTest.domain.request.HtpTestCreateReq;
import com.ssafy.iscream.htpTest.domain.request.HtpTestReq;
import com.ssafy.iscream.htpTest.service.HtpTestService;
import com.ssafy.iscream.user.domain.User;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/htp-tests")
@RestController
@RequiredArgsConstructor
public class HtpTestController {
    private final HtpTestService htpTestService;

    @PostMapping(path = "/img", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(summary = "Htp Test 수행 4번해야함", tags = "htp")
    public ResponseEntity<?> img(@Login User user,
                                 @RequestPart HtpTestCreateReq req,
                                 @RequestPart(required = false) MultipartFile file) {
        HtpTestReq htpTestReq = new HtpTestReq(
                req.getChildId(),
                req.getTime(),
                req.getType(),
                req.getIndex(),
                file
                );

        String result = htpTestService.htpTestCycle(user, htpTestReq);
        return ResponseUtil.success(result);
    }

}
