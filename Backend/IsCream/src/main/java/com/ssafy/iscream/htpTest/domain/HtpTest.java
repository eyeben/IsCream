package com.ssafy.iscream.htpTest.domain;

import com.ssafy.iscream.common.entity.BaseTimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class HtpTest extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int htpTestId;
    @NotNull
    int childId;
    String houseDrawingUrl;
    String treeDrawingUrl;
    String personDrawingUrl;
    String analysisResult;
    String pdf_url;
    Emoji emoji;
}
