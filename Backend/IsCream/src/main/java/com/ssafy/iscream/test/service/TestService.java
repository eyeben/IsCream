package com.ssafy.iscream.test.service;

import com.ssafy.iscream.common.exception.BadRequestException.ParameterException;
import com.ssafy.iscream.test.exception.TestException.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class TestService {

    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";

    public String testException(String email, String nickname) {
        if (email == null && nickname == null) {
            throw new ParameterException();
        }

        // 이메일 형식 올바르지 않음
        if (email != null && !Pattern.compile(EMAIL_REGEX).matcher(email).matches()) {
            throw new TestEmailFormatException();
        }

        // 이메일 중복됨
        if (email != null && email.equals("minchae@naver.com")) {
            throw new TestEmailException();
        }

        // 닉네임 중복됨
        if (nickname != null && nickname.equals("minchae")) {
            throw new TestNicknameException();
        }

        return "예외 처리 성공";
    }

}
