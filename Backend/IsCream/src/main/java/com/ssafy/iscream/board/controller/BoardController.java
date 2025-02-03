package com.ssafy.iscream.board.controller;

import com.ssafy.iscream.auth.user.Login;
import com.ssafy.iscream.board.dto.request.PostCreateReq;
import com.ssafy.iscream.board.service.PostService;
import com.ssafy.iscream.common.util.ResponseUtil;
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

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    private final PostService postService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "게시글 작성", tags = "board")
    public ResponseEntity<?> createPost(@Login User user,
                                        @RequestPart(name = "post") PostCreateReq post,
                                        @RequestPart(required = false) List<MultipartFile> files) {
        return ResponseUtil.success(postService.createPost(user, post, files));
    }

}
