package com.ssafy.iscream.htpTest.service;

import com.ssafy.iscream.children.service.ChildrenService;
import com.ssafy.iscream.htpTest.domain.HtpTest;
import com.ssafy.iscream.htpTest.dto.response.HtpTestDetailDto;
import com.ssafy.iscream.htpTest.dto.response.HtpTestResponseDto;
import com.ssafy.iscream.htpTest.repository.HtpTestRepository;
import com.ssafy.iscream.s3.service.S3Service;
import com.ssafy.iscream.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HtpSelectService {
    private final HtpTestRepository htpTestRepository;
    private final S3Service s3Service;

    /**
     * 특정 사용자의 HTP 테스트 목록을 조회하여 DTO 리스트로 반환
     */
    public List<HtpTest> getHtpTestList(Integer childId) {
        List<HtpTest> htpTests = htpTestRepository.findByChildId(childId);
        return htpTests;
    }


    public HtpTestDetailDto getHtpTestById(Integer htpTestId) {
        HtpTest htpTest = htpTestRepository.findById(htpTestId).orElse(null);
        return new HtpTestDetailDto(htpTest);
    }
}
