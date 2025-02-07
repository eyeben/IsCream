package com.ssafy.iscream.education.service;

import com.ssafy.iscream.children.domain.Child;
import com.ssafy.iscream.children.service.ChildrenService;
import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.UnauthorizedException;
import com.ssafy.iscream.common.response.ResponseData;
import com.ssafy.iscream.education.dto.req.EducationsGetReq;
import com.ssafy.iscream.education.dto.res.EducationsGetRes;
import com.ssafy.iscream.htpTest.service.HtpTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EducationFacade {

    private final EducationService educationService;
    private final HtpTestService htpTestService;
    private final ChildrenService childrenService;

    public EducationsGetRes getEducations(Integer userId, EducationsGetReq educationsGetReq) {

        if (educationsGetReq.getRecommand()){
            Child child = childrenService.getById(educationsGetReq.getChildId());
            if(!child.getUserId().equals(userId)){
                throw new UnauthorizedException(new ResponseData<>((ErrorCode.DATA_FORBIDDEN_ACCESS.getCode()),ErrorCode.DATA_FORBIDDEN_ACCESS.getMessage(), null));
            }
            htpTestService.getLastHtpTest(educationsGetReq.getChildId());
        }
        else{

        }



        return null;
    }


}
