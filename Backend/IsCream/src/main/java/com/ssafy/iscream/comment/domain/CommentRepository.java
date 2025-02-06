package com.ssafy.iscream.comment.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query("""
        SELECT c FROM Comment c
        LEFT JOIN FETCH c.parentComment
        WHERE c.post.postId = :postId
        ORDER BY
            COALESCE(c.parentComment.commentId, c.commentId) DESC,
            c.commentId ASC
    """)
    List<Comment> findAllByPostIdWithReplies(@Param("postId") Integer postId);
}
