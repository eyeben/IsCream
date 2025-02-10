package com.ssafy.iscream.htpTest.domain.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
/*
    프론트엔드에서 요청올 때 사용 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HtpTestCreateReq {
    Integer childId;
    String time;
    String type;
    Integer index;
}
