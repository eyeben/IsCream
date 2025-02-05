package com.ssafy.iscream.comment.service;

import com.ssafy.iscream.board.domain.Post;
import com.ssafy.iscream.board.domain.PostRepository;
import com.ssafy.iscream.comment.domain.Comment;
import com.ssafy.iscream.comment.domain.CommentRepository;
import com.ssafy.iscream.comment.dto.request.CommentCreateReq;
import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.MinorException.*;
import com.ssafy.iscream.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    // 댓글/대댓글 작성
    public Integer createComment(User user, CommentCreateReq req) {
        Post post = postRepository.findById(req.getPostId())
                .orElseThrow(() -> new DataException(ErrorCode.DATA_NOT_FOUND));

        Comment parent = null;

        if (req.getCommentId() != null) {
            parent = commentRepository.findById(req.getCommentId())
                    .orElseThrow(() -> new DataException(ErrorCode.DATA_NOT_FOUND));
        }

        Comment comment = Comment.builder()
                .post(post)
                .content(req.getContent())
                .user(user)
                .parentComment(parent)
                .build();

        Integer commentId = commentRepository.save(comment).getCommentId();

        if (commentId == null) {
            throw new DataException(ErrorCode.DATA_SAVE_FAILED);
        }

        return commentId;
    }

    // TODO: 댓글/대댓글 수정

    // TODO: 댓글/대댓글 삭제

}
