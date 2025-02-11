package com.ssafy.iscream.board.repository;

import com.ssafy.iscream.board.domain.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostImageRepository extends JpaRepository<PostImage, Integer> {
    void deleteByImageUrlIn(List<String> imageUrls);
}
