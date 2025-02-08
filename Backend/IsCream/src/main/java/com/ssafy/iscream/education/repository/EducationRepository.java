package com.ssafy.iscream.education.repository;

import com.ssafy.iscream.education.domain.Education;
import com.ssafy.iscream.education.dto.res.EducationsGetRes;
import com.ssafy.iscream.htpTest.domain.Emoji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface EducationRepository extends JpaRepository<Education, Integer> {
    List<EducationsGetRes> findAllByEmoji(Emoji emoji);
}
