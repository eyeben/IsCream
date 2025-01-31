package com.ssafy.iscream.user.service;

import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.user.domain.Relation;
import com.ssafy.iscream.user.domain.Status;
import com.ssafy.iscream.user.domain.User;
import com.ssafy.iscream.user.dto.request.UserCreateReq;
import com.ssafy.iscream.user.dto.request.UserInfoReq;
import com.ssafy.iscream.user.dto.request.UserUpdateReq;
import com.ssafy.iscream.user.dto.response.UserInfo;
import com.ssafy.iscream.user.exception.UserException.*;
import com.ssafy.iscream.auth.exception.AuthException.*;
import com.ssafy.iscream.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static com.ssafy.iscream.common.exception.ErrorCode.*;

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

    // 비밀번호 재설정
    @Transactional
    public boolean changePassword(int userId, String password, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(ErrorCode.USER_NOT_FOUND));

        String original = user.getPassword();

        if (!bCryptPasswordEncoder.matches(password, original)) {
            throw new PasswordException(INCORRECT_PASSWORD);
        }

        if (bCryptPasswordEncoder.matches(newPassword, original)) {
            throw new PasswordException(SAME_PASSWORD);
        }

        user.setPassword(bCryptPasswordEncoder.encode(newPassword));

        return true;
    }

    @Transactional
    public void updateUserInfo(int userId, UserUpdateReq req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(ErrorCode.USER_NOT_FOUND));

        user.setNickname(req.getNickname());
        user.setPhone(req.getPhone());
        user.setBirthDate(LocalDate.parse(req.getBirthDate()));
        user.setRelation(Relation.valueOf(req.getRelation()));

        // 프로필 사진 파일이 null이 아닌 경우에만 수정
        // user.getImageUrl()로 s3 버킷에서 삭제, db에서도 삭제
        // req.getFile()로 받은 파일 s3 업로드 후 url 얻기
        // 생성된 url user.setImageUrl(url)로 업데이트

        // 수정 실패했을 때의 예외 처리


    }

    @Transactional
    public void updateUserStatus(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(ErrorCode.USER_NOT_FOUND));

        user.setStatus(Status.BANNED); // 탈퇴 처리

        // Redis에 저장된 리프레시 토큰 삭제하기
        // 쿠키에서 토큰 가져와서 삭제
    }

}
