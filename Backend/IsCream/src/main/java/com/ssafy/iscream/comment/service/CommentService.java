package com.ssafy.iscream.comment.service;

import com.ssafy.iscream.board.domain.Post;
import com.ssafy.iscream.board.repository.PostRepository;
import com.ssafy.iscream.comment.domain.Comment;
import com.ssafy.iscream.comment.domain.CommentQueryRepository;
import com.ssafy.iscream.comment.domain.CommentRepository;
import com.ssafy.iscream.comment.dto.request.CommentCreateReq;
import com.ssafy.iscream.comment.dto.response.CommentList;
import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.MinorException.*;
import com.ssafy.iscream.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final CommentQueryRepository commentQueryRepository;
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

        Comment saveComment = commentRepository.save(comment);

        return saveComment.getCommentId();
    }

    // 댓글/대댓글 수정
    @Transactional
    public void updateComment(Integer userId, Integer commentId, String content) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new DataException(ErrorCode.DATA_NOT_FOUND));

        if (!userId.equals(comment.getUser().getUserId())) {
            throw new DataException(ErrorCode.DATA_FORBIDDEN_UPDATE);
        }

        comment.setContent(content);
    }

    // 댓글/대댓글 삭제
    @Transactional
    public void deleteComment(Integer userId, Integer commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new DataException(ErrorCode.DATA_NOT_FOUND));

        if (!userId.equals(comment.getUser().getUserId())) {
            throw new DataException(ErrorCode.DATA_FORBIDDEN_UPDATE);
        }

        commentRepository.deleteById(commentId);
    }

    // 댓글 조회
    public CommentList getComments(Integer postId) {
        List<Comment> commentList = commentQueryRepository.findCommentByPostId(postId);

        return CommentList.of(commentList, commentList.size());
    }

}
