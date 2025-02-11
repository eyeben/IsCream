package com.ssafy.iscream.comment.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.iscream.comment.domain.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.iscream.comment.domain.QComment.comment;

@Repository
@RequiredArgsConstructor
public class CommentQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<Comment> findCommentByPostId(Integer postId) {
        return queryFactory
                .selectFrom(comment)
                .leftJoin(comment.parentComment).fetchJoin()
                .where(comment.post.postId.eq(postId))
                .orderBy(
                        comment.parentComment.commentId.coalesce(comment.commentId).desc(),
                        comment.commentId.asc()
                )
                .fetch();
    }
}
