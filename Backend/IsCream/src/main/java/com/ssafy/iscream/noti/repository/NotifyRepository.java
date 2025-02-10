package com.ssafy.iscream.noti.repository;

import com.ssafy.iscream.noti.domain.Notify;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotifyRepository extends JpaRepository<Notify, Integer> {

}
