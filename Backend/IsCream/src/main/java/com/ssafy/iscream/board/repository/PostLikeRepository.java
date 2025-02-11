package com.ssafy.iscream.board.repository;

import com.ssafy.iscream.board.domain.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Integer> {
    void deleteByPost_PostIdAndUser_UserId(Integer postId, Integer userId);
    Boolean existsByPost_PostIdAndUser_UserId(Integer postId, Integer userId);
}
