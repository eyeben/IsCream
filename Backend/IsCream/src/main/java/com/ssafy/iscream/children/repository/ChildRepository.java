package com.ssafy.iscream.children.repository;

import com.ssafy.iscream.children.domain.Child;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChildRepository extends JpaRepository<Child, Integer> {
    List<Child> findAllByUserId(int userId);

    Child findByChildId(Integer childId);
}
