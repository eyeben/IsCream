package com.ssafy.iscream.board.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter @Setter @Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class PostLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer postLikeId;

    private Integer userId;

    private Integer postId;
}
