package com.ssafy.iscream.htpTest.service;

import com.ssafy.iscream.htpTest.domain.HtpTest;
import com.ssafy.iscream.htpTest.domain.response.HtpTestResponseDto;
import com.ssafy.iscream.htpTest.repository.HtpTestRepository;
import com.ssafy.iscream.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class HtpSelectService {
    private final HtpTestRepository htpTestRepository;
    private final S3Service s3Service;

    /**
     * 특정 사용자의 HTP 테스트 목록을 조회하여 DTO 리스트로 반환
     */
    public List<HtpTestResponseDto> getHtpTestList(Integer childId) {
        List<HtpTest> htpTests = null;

        // HtpTest 엔티티를 HtpTestResponseDto로 변환
        return htpTests.stream()
                .map(htpTest -> new HtpTestResponseDto(
                        htpTest.getHtpTestId(),
                        "HTP 검사", // 제목이 따로 없다면 기본값 지정
                        htpTest.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) // 날짜 포맷
                ))
                .collect(Collectors.toList());
    }
}
