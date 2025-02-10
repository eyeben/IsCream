package com.ssafy.iscream.htpTest.domain.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HtpTestCreateReq {
    String time;
    String type;
    MultipartFile file;
}
