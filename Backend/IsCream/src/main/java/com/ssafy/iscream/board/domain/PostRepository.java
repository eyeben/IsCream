package com.ssafy.iscream.board.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query("""
        SELECT p
        FROM Post p
        LEFT JOIN p.postLikes pl
        GROUP BY p
        ORDER BY COUNT(pl) DESC, p.createdAt DESC
    """)
    List<Post> findTop5ByLikes();

    List<Post> findTop5ByOrderByCreatedAtDesc();

}
