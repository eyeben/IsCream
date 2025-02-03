package com.ssafy.iscream.calendar.repository;

import com.ssafy.iscream.calendar.domain.Memo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemoRepository extends JpaRepository<Memo, Integer> {
}
