package com.ssafy.iscream.htpTest.controller;

import com.ssafy.iscream.auth.user.Login;
import com.ssafy.iscream.common.util.ResponseUtil;
import com.ssafy.iscream.htpTest.domain.request.HtpTestCreateReq;
import com.ssafy.iscream.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/htp-tests")
@RestController
@RequiredArgsConstructor
public class HtpTestController {

    @PostMapping("/img")
    public ResponseEntity<?> img(@Login User user, HtpTestCreateReq createReq) {

        return ResponseUtil.success();
    }

}
