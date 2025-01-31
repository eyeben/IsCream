package com.ssafy.iscream.user.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Schema(description = "사용자 정보 수정 request")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateReq {

    @Schema(description = "닉네임", example = "test")
    private String nickname;

    @Schema(description = "전화번호", example = "010-1111-2222")
    private String phone;

    @Schema(description = "생일", example = "2024-01-31")
    private String birthDate;

    @Schema(description = "아이와의 관계", example = "MOTHER, FATHER, REST")
    private String relation = "REST";

    @Schema(description = "프로필 사진")
    private MultipartFile file;
}

