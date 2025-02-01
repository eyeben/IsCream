package com.ssafy.iscream.common.repository;

import com.ssafy.iscream.common.entity.Memo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemoRepository extends JpaRepository<Memo, Integer> {
}
