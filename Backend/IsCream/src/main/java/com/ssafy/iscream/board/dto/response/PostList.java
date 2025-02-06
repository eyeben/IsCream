package com.ssafy.iscream.board.dto.response;

import com.ssafy.iscream.board.domain.Post;
import com.ssafy.iscream.board.domain.PostImage;
import com.ssafy.iscream.common.util.DateUtil;
import com.ssafy.iscream.user.domain.User;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Builder @Getter
public class PostList {
    private Integer totalCount;
    private Integer page;
    private Integer size;
    private Boolean isEnd;
    private List<PostInfo> list;

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

    public static PostList of(List<PostInfo> list, int totalCount, int page, int size) {
        return PostList.builder()
                .totalCount(totalCount)
                .page(page)
                .size(size)
                .isEnd((page + 1) * size >= totalCount)
                .list(list)
                .build();
    }

    private static String extractThumbnail(Post post) {
        List<PostImage> images = post.getPostImages();
        return (images != null && !images.isEmpty()) ? images.get(0).getImageUrl() : null;
    }
}
