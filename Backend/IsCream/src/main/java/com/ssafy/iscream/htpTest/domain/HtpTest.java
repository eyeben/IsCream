package com.ssafy.iscream.htpTest.domain;

import com.ssafy.iscream.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
public class HtpTest extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "htp_test_id")
    private Integer htpTestId;

    @Column(name = "child_id", nullable = false)
    private Integer childId;

    @Column(name = "test_date")
    private LocalDate testDate;

    @Column(name = "house_drawing_url", length = 255)
    private String houseDrawingUrl;

    @Column(name = "tree_drawing_url", length = 255)
    private String treeDrawingUrl;

    @Column(name = "male_drawing_url", length = 255)
    private String maleDrawingUrl;

    @Column(name = "female_drawing_url", length = 255)
    private String femaleDrawingUrl;

    @Column(name = "analysis_result", length = 255)
    private String analysisResult;

    @Column(name = "pdf_url", length = 255)
    private String pdfUrl;

    @Column(name = "emoji")
    private Byte emoji;
}
