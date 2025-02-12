package com.ssafy.iscream.patTest.repository;

import com.ssafy.iscream.patTest.domain.PatTest;
import com.ssafy.iscream.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatTestListRepository extends JpaRepository<PatTest, Integer> {
    List<PatTest> findByUser(User user);
}
