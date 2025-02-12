package com.ssafy.iscream.board.repository;

import com.ssafy.iscream.board.domain.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Integer> {
    void deleteByPostIdAndUserId(Integer postId, Integer userId);
    Boolean existsByPostIdAndUserId(Integer postId, Integer userId);
    Integer countByPostId(Integer postId);
}
