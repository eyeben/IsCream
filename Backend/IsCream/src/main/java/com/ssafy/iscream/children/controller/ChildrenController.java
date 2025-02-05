package com.ssafy.iscream.children.controller;

import com.ssafy.iscream.children.service.ChildrenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/children")
@Tag(name = "children")
public class ChildrenController {

    private final ChildrenService childrenService;


    @GetMapping()
    @Operation(summary = "전체 자녀 목록 조회")
    public ResponseEntity<?> getChildren(){
        return null;
    }

    @PostMapping()
    @Operation(summary = "자녀 등록(생년월일, 닉네임, 성별)")
    public ResponseEntity<?> createChildren(){
        return null;
    }

    @PutMapping()
    @Operation(summary = "자녀 수정(생년월일, 닉네임, 성별)")
    public ResponseEntity<?> updateChildren(){
        return null;
    }

    @DeleteMapping()
    @Operation(summary = "자녀 삭제")
    public ResponseEntity<?> deleteChildren(){
        return null;
    }

}
