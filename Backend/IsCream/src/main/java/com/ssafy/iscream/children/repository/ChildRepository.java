package com.ssafy.iscream.children.repository;

import com.ssafy.iscream.children.domain.Child;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChildRepository extends JpaRepository<Child, Integer> {
}
