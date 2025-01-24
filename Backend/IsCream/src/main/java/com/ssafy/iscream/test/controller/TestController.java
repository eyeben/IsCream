package com.ssafy.iscream.test.controller;

import com.ssafy.iscream.common.util.ResponseUtil;
import com.ssafy.iscream.s3.service.S3Service;
import com.ssafy.iscream.test.service.TestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;
    private final S3Service s3Service;

    @Operation(summary = "예외 처리 동작 테스트", tags = "test")
    @GetMapping("/exception")
    public ResponseEntity<?> exceptionTest(
            @Parameter(description = "이메일") @RequestParam(name = "email", required = false) String email,
            @Parameter(description = "닉네임") @RequestParam(name = "nickname", required = false) String nickname
    ) {
        return ResponseUtil.success(testService.testException(email, nickname));
    }

    // 파일 업로드
    @PostMapping("/s3/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseUtil.success(s3Service.uploadFile(file));
    }

    // 여러 파일 업로드
    @PostMapping("/s3/upload")
    public ResponseEntity<?> uploadFileList(@RequestParam("files") List<MultipartFile> file) throws IOException {
        return ResponseUtil.success(s3Service.uploadFile(file));
    }

    // 파일 삭제
    @PostMapping("/s3/delete")
    public ResponseEntity<?> deleteFile(@RequestParam("deleteUrl") String url) {
        s3Service.deleteFile(url);
        return ResponseUtil.success();
    }

}
