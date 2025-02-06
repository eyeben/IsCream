package com.ssafy.iscream.board.dto.response;

import com.ssafy.iscream.board.domain.Post;
import com.ssafy.iscream.board.domain.PostImage;
import com.ssafy.iscream.common.util.DateUtil;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder @Getter
public class PostList {
    private Integer lastId;
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
            String authorName
    ) {
        public PostInfo(Post post, boolean userLiked) {
            this(
                    post.getPostId(),
                    post.getTitle(),
                    post.getContent(),
                    extractThumbnail(post),
                    post.getPostLikes().size(),
                    userLiked,
                    post.getViewCount(),
                    DateUtil.format(post.getCreatedAt()),
                    post.getUser().getNickname()
            );
        }
    }

    public static PostList of(Integer lastId, Integer size,
                              Boolean hasNext, List<PostInfo> info) {
        return PostList.builder()
                .lastId(lastId)
                .size(size)
                .hasNext(hasNext)
                .info(info)
                .build();
    }

    private static String extractThumbnail(Post post) {
        List<PostImage> images = post.getPostImages();
        return (images != null && !images.isEmpty()) ? images.get(0).getImageUrl() : null;
    }
}
