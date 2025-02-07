package com.ssafy.iscream.education.controller;

import com.ssafy.iscream.common.util.ResponseUtil;
import com.ssafy.iscream.education.service.EducationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/educations")
@Tag(name = "education")
public class EducationController {

    private final EducationService educationService;

    @PostMapping
    public ResponseEntity<?> getEducation() {

        return ResponseUtil.success();
    }


}
