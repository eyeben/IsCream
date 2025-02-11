package com.ssafy.iscream.bigFiveTest.domain;

import com.ssafy.iscream.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "big_five_test")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BigFiveTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bigFiveTestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String testDate;

    @Column(nullable = false)
    private Double conscientiousness;

    @Column(nullable = false)
    private Double agreeableness;

    @Column(nullable = false)
    private Double emotionalStability;

    @Column(nullable = false)
    private Double extraversion;

    @Column(nullable = false)
    private Double openness;

    @Column
    private String pdfUrl;
}