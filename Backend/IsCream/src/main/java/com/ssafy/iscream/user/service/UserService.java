package com.ssafy.iscream.user.service;

import com.ssafy.iscream.user.domain.Relation;
import com.ssafy.iscream.user.domain.User;
import com.ssafy.iscream.user.dto.request.UserCreateReq;
import com.ssafy.iscream.user.exception.UserException.*;
import com.ssafy.iscream.user.repository.UserRepository;
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

    public int joinProcess(UserCreateReq userReq) {
        String email = userReq.getEmail();
        String password = userReq.getPassword();

        Boolean isExist = userRepository.existsByEmail(email);

        if (isExist) {
            throw new UserExistException();
        }

        User user = modelMapper.map(userReq, User.class);
        user.setRelation(Relation.valueOf(userReq.getRelation()));
        user.setPassword(bCryptPasswordEncoder.encode(password));

        return userRepository.save(user).getUserId();
    }

}
