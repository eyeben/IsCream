package com.ssafy.iscream.patTest.repository;

import com.ssafy.iscream.patTest.domain.PatTest;
import com.ssafy.iscream.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatTestRepository extends JpaRepository<PatTest, Integer> {
    Optional<PatTest> findByUser(User user);
}
