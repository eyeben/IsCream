package com.ssafy.iscream.board.dto.response;

import com.ssafy.iscream.board.domain.Post;
import com.ssafy.iscream.board.domain.PostImage;
import com.ssafy.iscream.user.dto.response.UserProfile;

import java.util.List;
import java.util.stream.Collectors;

public record PostDetail(
        Integer postId,
        String title,
        String content,
        Integer likes,
        Boolean userLiked,
        Integer viewCount,
        List<String> images,
        UserProfile author
) {
    public PostDetail(Post post, Integer userId) {
        this(
                post.getPostId(),
                post.getTitle(),
                post.getContent(),
                post.getPostLikes().size(),
                isUserLiked(post, userId),
                post.getViewCount(),
                extractImageUrls(post),
                new UserProfile(post.getUser())
        );
    }

    private static boolean isUserLiked(Post post, Integer userId) {
        if (userId == null) {
            return false;
        }

        return post.getPostLikes().stream()
                .anyMatch(like -> like.getUser().getUserId().equals(userId));
    }

    private static List<String> extractImageUrls(Post post) {
        return post.getPostImages().stream()
                .map(PostImage::getImageUrl)
                .collect(Collectors.toList());
    }
}
