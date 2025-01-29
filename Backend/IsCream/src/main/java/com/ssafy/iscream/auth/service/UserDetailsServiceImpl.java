package com.ssafy.iscream.auth.service;

import com.ssafy.iscream.auth.user.AuthUserDetails;
import com.ssafy.iscream.user.domain.User;
import com.ssafy.iscream.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userData = userRepository.findByEmail(email);

        if (userData != null) {
            //UserDetails에 담아서 return하면 AutneticationManager가 검증 함
            return new AuthUserDetails(userData);
        }

        return null;
    }
}
