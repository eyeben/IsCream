package com.ssafy.iscream.patTest.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(description = "PAT 검사 결과 request")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatTestCreateReq {
    @Schema(description = "A유형 개수", example = "5")
    private Integer scoreA;
    @Schema(description = "B유형 개수", example = "3")
    private Integer scoreB;
    @Schema(description = "C유형 개수", example = "8")
    private Integer scoreC;
}
