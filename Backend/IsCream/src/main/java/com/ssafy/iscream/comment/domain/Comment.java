package com.ssafy.iscream.comment.domain;

import com.ssafy.iscream.board.domain.Post;
import com.ssafy.iscream.common.entity.BaseTimeEntity;
import com.ssafy.iscream.user.domain.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Getter @Setter @Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert @DynamicUpdate
public class Comment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id")
    private Comment parentComment;

    @Column(nullable = false, length = 1024)
    private String content;

}
