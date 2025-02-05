package com.ssafy.iscream.comment;

import com.ssafy.iscream.auth.user.Login;
import com.ssafy.iscream.comment.dto.request.CommentCreateReq;
import com.ssafy.iscream.comment.service.CommentService;
import com.ssafy.iscream.common.util.ResponseUtil;
import com.ssafy.iscream.user.domain.User;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {
    
    private final CommentService commentService;

    @Operation(summary = "댓글/대댓글 작성", tags = "comments")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createPost(@Login User user, CommentCreateReq req) {
        return ResponseUtil.success(commentService.createComment(user, req));
    }

}
