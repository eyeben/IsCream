package com.ssafy.iscream.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);

    Boolean existsByEmail(String email);

    Boolean existsByNickname(String nickname);

    Boolean existsByPhone(String phone);
}
