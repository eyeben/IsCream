package com.ssafy.iscream.board.dto.response;

import com.ssafy.iscream.board.domain.Post;
import com.ssafy.iscream.common.util.DateUtil;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder @Getter
public class PostList {
    private Integer lastId;
    private Integer lastLikeCount;
    private Integer size;
    private Boolean hasNext;
    private List<PostInfo> info;

    public record PostInfo(
            Integer postId,
            String title,
            String content,
            String thumbnail,
            Integer likes,
            Boolean userLiked,
            Integer viewCount,
            String createdAt,
            String authorName,
            Integer commentCount
    ) {
        public PostInfo(Post post, boolean userLiked, String thumbnail, String authorName, Integer likes, Integer viewCount, Integer commentCount) {
            this(
                    post.getPostId(),
                    post.getTitle(),
                    post.getContent(),
                    thumbnail,
                    likes,
                    userLiked,
                    viewCount,
                    DateUtil.format(post.getCreatedAt()),
                    authorName,
                    commentCount
            );
        }
    }

    public static PostList of(Integer lastId, Integer lastLikeCount, Integer size,
                              Boolean hasNext, List<PostInfo> info) {
        return PostList.builder()
                .lastId(lastId)
                .lastLikeCount(lastLikeCount)
                .size(size)
                .hasNext(hasNext)
                .info(info)
                .build();
    }
}
