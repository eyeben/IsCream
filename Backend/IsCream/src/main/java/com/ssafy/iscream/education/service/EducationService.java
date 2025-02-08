package com.ssafy.iscream.education.service;

import com.ssafy.iscream.education.dto.res.EducationsGetRes;
import com.ssafy.iscream.education.repository.EducationRepository;
import com.ssafy.iscream.htpTest.domain.Emoji;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationService {


    private final EducationRepository educationRepository;
    public List<EducationsGetRes> getByEmoji(Emoji emoji) {
        return educationRepository.findAllByEmoji(emoji);
    }
}
