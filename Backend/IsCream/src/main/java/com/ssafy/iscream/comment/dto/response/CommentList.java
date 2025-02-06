package com.ssafy.iscream.comment.dto.response;

import com.ssafy.iscream.board.domain.Post;
import com.ssafy.iscream.board.dto.response.PostList;
import com.ssafy.iscream.comment.domain.Comment;
import com.ssafy.iscream.common.util.DateUtil;
import com.ssafy.iscream.user.domain.User;
import com.ssafy.iscream.user.dto.response.UserProfile;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Builder @Getter
public class CommentList {
    private Integer totalCount;
    private List<CommentInfo> comments;

    public record CommentInfo(
            Integer commentId,
            String content,
            Integer parentId,
            String createdAt,
            UserProfile author
    ) {
        public CommentInfo(Comment comment) {
            this(comment.getCommentId(), comment.getContent(),
                    comment.getParentComment() != null ? comment.getParentComment().getCommentId() : null,
                    DateUtil.format(comment.getCreatedAt()),
                    new UserProfile(comment.getUser()));
        }
    }

    public static CommentList of(List<Comment> comments, int totalCount) {
        return CommentList.builder()
                .totalCount(totalCount)
                .comments(comments.stream()
                        .map(CommentInfo::new)
                        .collect(Collectors.toList()))
                .build();
    }
}
