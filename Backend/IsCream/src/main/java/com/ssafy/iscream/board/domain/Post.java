package com.ssafy.iscream.board.domain;

import com.ssafy.iscream.common.entity.BaseTimeEntity;
import com.ssafy.iscream.comment.domain.Comment;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert @DynamicUpdate
public class Post extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer postId;

    @Column(nullable = false)
    private Integer userId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column
    private Integer viewCount;

    public void updateViews(int views) {
        this.viewCount = views;
    }

}
