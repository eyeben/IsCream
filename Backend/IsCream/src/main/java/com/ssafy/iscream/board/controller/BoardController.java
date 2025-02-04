package com.ssafy.iscream.board.controller;

import com.ssafy.iscream.auth.user.Login;
import com.ssafy.iscream.board.dto.request.PostCreateReq;
import com.ssafy.iscream.board.dto.request.PostUpdateReq;
import com.ssafy.iscream.board.service.PostService;
import com.ssafy.iscream.common.util.ResponseUtil;
import com.ssafy.iscream.user.domain.User;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @PutMapping(value = "/{postId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "게시글 수정", tags = "board")
    public ResponseEntity<?> updatePost(@PathVariable Integer postId,
                                        @Login User user,
                                        @RequestPart(name = "post") PostUpdateReq post,
                                        @RequestPart(required = false) List<MultipartFile> files) {
        postService.updatePost(postId, user.getUserId(), post, files);
        return ResponseUtil.success();
    }

    @DeleteMapping(value = "/{postId}")
    @Operation(summary = "게시글 삭제", tags = "board")
    public ResponseEntity<?> deletePost(@PathVariable Integer postId, @Login User user) {
        postService.deletePost(postId, user.getUserId());
        return ResponseUtil.success();
    }

    @Operation(summary = "게시글 상세 조회", tags = "board")
    @GetMapping(value = "/{postId}")
    public ResponseEntity<?> getPost(@PathVariable Integer postId, @Login User user) {
        return ResponseUtil.success(postService.getPostDetail(postId, user.getUserId()));
    }

}
