package com.ssafy.iscream.htpTest.domain.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HtpTestDiagnosisReq {
    String time;
    String type;
    String imageUrl;
}
