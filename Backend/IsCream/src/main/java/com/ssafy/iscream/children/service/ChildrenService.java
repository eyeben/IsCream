package com.ssafy.iscream.children.service;

import com.ssafy.iscream.children.domain.Child;
import com.ssafy.iscream.children.dto.req.ChildrenCreateReq;
import com.ssafy.iscream.children.dto.req.ChildrenUpdateReq;
import com.ssafy.iscream.children.dto.res.ChildrenGetRes;
import com.ssafy.iscream.children.repository.ChildRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// TODO: 기능 완성 후 에러 처리 다룰 예정
@Service
@RequiredArgsConstructor
public class ChildrenService {

    private final ChildRepository childRepository;

    public List<ChildrenGetRes> getChildren(Integer userId) {
        List<Child> children = childRepository.findAllByUserId(userId);
        List<ChildrenGetRes> childrenGetResList = new ArrayList<>();
        for (Child child : children) {
            ChildrenGetRes childrenGetRes = ChildrenGetRes.builder()
                    .childId(child.getChildId())
                    .nickname(child.getNickname())
                    .birthDate(child.getBirthDate())
                    .gender(child.getGender())
                    .build();
            childrenGetResList.add(childrenGetRes);
        }

        return childrenGetResList;
    }



    public void createChildren(Integer userId, ChildrenCreateReq childrenCreateReq) {
        Child child = Child.builder()
                .nickname(childrenCreateReq.getNickname())
                .birthDate(childrenCreateReq.getBirthDate())
                .gender(childrenCreateReq.getGender())
                .build();
        childRepository.save(child);
    }


    public void updateChildren(Integer userId, ChildrenUpdateReq childrenUpdateReq) {
        Child childOriginal = childRepository.findById(childrenUpdateReq.getChildId()).orElse(null);
        if (childOriginal != null && childOriginal.getUserId() == userId) {
            Child childNew = Child.builder()
                    .nickname(childrenUpdateReq.getNickname())
                    .birthDate(childrenUpdateReq.getBirthDate())
                    .gender(childrenUpdateReq.getGender())
                    .build();
            childRepository.save(childNew);
        }

    }


    public void deleteChildren(Integer userId, Integer childrenId) {
        childRepository.findById(childrenId).ifPresent(childRepository::delete);
    }
}
