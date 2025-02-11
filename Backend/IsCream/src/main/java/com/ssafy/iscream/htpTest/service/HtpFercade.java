package com.ssafy.iscream.htpTest.service;

import com.ssafy.iscream.children.dto.res.ChildrenGetRes;
import com.ssafy.iscream.children.service.ChildrenService;
import com.ssafy.iscream.htpTest.domain.HtpTest;
import com.ssafy.iscream.htpTest.dto.response.HtpTestResponseDto;
import com.ssafy.iscream.htpTest.repository.HtpTestRepository;
import com.ssafy.iscream.s3.service.S3Service;
import com.ssafy.iscream.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class HtpFercade {
    private final S3Service s3Service;
    private final ChildrenService childrenService;
    private final HtpSelectService htpSelectService;

    public List<HtpTestResponseDto> getHtpTestList(User user) {
        List<ChildrenGetRes> children = childrenService.getChildren(user.getUserId());

        return children.stream()
                .flatMap(child -> htpSelectService.getHtpTestList(child.getChildId()).stream()
                        .map(htpTest -> convertToDto(htpTest, child))
                )
                .collect(Collectors.toList());
    }

    private HtpTestResponseDto convertToDto(HtpTest htpTest, ChildrenGetRes child) {
        return new HtpTestResponseDto(
                htpTest.getHtpTestId(),
                "HTP 검사",
                htpTest.getTestDate().toString(),
                child.getNickname()
        );
    }

}
