package com.ssafy.iscream.user.service;

import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.user.domain.Relation;
import com.ssafy.iscream.user.domain.User;
import com.ssafy.iscream.user.dto.request.UserCreateReq;
import com.ssafy.iscream.user.dto.request.UserInfoReq;
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

        Boolean isExist = userRepository.existsByEmail(email);

        if (isExist) {
            throw new UserExistException();
        }

        duplicatePhone(userReq.getPhone()); // 전화번호 중복 확인

        User user = modelMapper.map(userReq, User.class);
        user.setRelation(Relation.valueOf(userReq.getRelation()));
        user.setPassword(bCryptPasswordEncoder.encode(password));

        return userRepository.save(user).getUserId();
    }

    // 사용자 정보 조회
    public UserInfo getUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(ErrorCode.USER_NOT_FOUND));
        return new UserInfo(user);
    }

    // 이메일 중복 확인
    public Boolean duplicateEmail(String email) {
        Boolean exist = userRepository.existsByEmail(email);

        if (exist) {
            throw new EmailException();
        }

        return true;
    }

    // 닉네임 중복 확인
    public Boolean duplicateNickname(String nickname) {
        Boolean exist = userRepository.existsByNickname(nickname);

        if (exist) {
            throw new NicknameException();
        }

        return true;
    }

    // 전화번호 중복 확인
    private Boolean duplicatePhone(String phone) {
        Boolean exist = userRepository.existsByPhone(phone);

        if (exist) {
            throw new UserExistException();
        }

        return true;
    }

    // 사용자 정보 확인 (이메일, 이름, 전화번호)
    public Boolean existUserInfo(UserInfoReq req, Integer userId) {
        User user = userRepository.findByEmailAndUsernameAndPhone(req.getEmail(), req.getUsername(), req.getPhone())
                .orElseThrow(() -> new UserNotFoundException(ErrorCode.USER_NOT_FOUND));

        if (!userId.equals(user.getUserId())) {
            throw new UserNotFoundException(ErrorCode.INVALID_USER_INFO);
        }

        return true;
    }

}
