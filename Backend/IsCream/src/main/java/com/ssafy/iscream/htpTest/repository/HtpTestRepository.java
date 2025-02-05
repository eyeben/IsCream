package com.ssafy.iscream.htpTest.repository;

import com.ssafy.iscream.htpTest.domain.HtpTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface HtpTestRepository extends JpaRepository<HtpTest, Integer> {
    @Query("SELECT h FROM HtpTest h WHERE h.childId = :childId AND h.createdAt >= :startDate AND h.createdAt < :endDate")
    List<HtpTest> findByChildIdAndCreatedAtBetween(
            @Param("childId") int childId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}
