package com.ssafy.iscream.user.service;

import com.ssafy.iscream.user.domain.Relation;
import com.ssafy.iscream.user.domain.User;
import com.ssafy.iscream.user.dto.request.UserCreateReq;
import com.ssafy.iscream.user.dto.response.UserInfo;
import com.ssafy.iscream.user.exception.UserException.*;
import com.ssafy.iscream.auth.exception.AuthException.*;
import com.ssafy.iscream.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // 회원가입
    public Integer joinProcess(UserCreateReq userReq) {
        String email = userReq.getEmail();
        String password = userReq.getPassword();

        Boolean isExist = duplicateEmail(email);

        if (isExist) {
            throw new UserExistException();
        }

        User user = modelMapper.map(userReq, User.class);
        user.setRelation(Relation.valueOf(userReq.getRelation()));
        user.setPassword(bCryptPasswordEncoder.encode(password));

        return userRepository.save(user).getUserId();
    }

    // 사용자 정보 조회
    public UserInfo getUser(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        return new UserInfo(user);
    }

    // 이메일 중복 확인
    public Boolean duplicateEmail(String email) {
        return userRepository.existsByEmail(email);
    }

}
