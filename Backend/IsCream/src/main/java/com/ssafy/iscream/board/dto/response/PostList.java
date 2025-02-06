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
        public PostInfo(Post post, User user) {
            this(
                    post.getPostId(),
                    post.getTitle(),
                    post.getContent(),
                    extractThumbnail(post),
                    post.getPostLikes().size(),
                    isUserLiked(post, user),
                    post.getViewCount(),
                    DateUtil.format(post.getCreatedAt()),
                    post.getUser().getNickname()
            );
        }
    }

    public static PostList of(List<Post> list, User user, int totalCount, int page, int size) {
        return PostList.builder()
                .totalCount(totalCount)
                .page(page)
                .size(size)
                .isEnd((page + 1) * size >= totalCount)
                .list(list.stream()
                        .map(post -> new PostInfo(post, user))
                        .collect(Collectors.toList()))
                .build();
    }

    public static boolean isUserLiked(Post post, User user) {
        if (user == null) {
            return false;
        }

        return post.getPostLikes().stream()
                .anyMatch(like -> like.getUser().getUserId().equals(user.getUserId()));
    }

    private static String extractThumbnail(Post post) {
        List<PostImage> images = post.getPostImages();
        return (images != null && !images.isEmpty()) ? images.get(0).getImageUrl() : null;
    }
}
