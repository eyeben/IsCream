package com.ssafy.iscream.patTest.repository;

import com.ssafy.iscream.patTest.domain.PatTest;
import com.ssafy.iscream.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PatTestRepository extends JpaRepository<PatTest, Integer> {
    @Query("SELECT p FROM PatTest p WHERE p.user = :user ORDER BY p.testDate DESC LIMIT 1")
    Optional<PatTest> findLatestByUser(@Param("user") User user);

}
