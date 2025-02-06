package com.ssafy.iscream.board.dto.response;

import com.ssafy.iscream.board.domain.Post;
import com.ssafy.iscream.board.domain.PostImage;
import com.ssafy.iscream.common.util.DateUtil;
import com.ssafy.iscream.user.domain.User;
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
        String createdAt,
        UserProfile author,
        String userImageUrl
) {
    public PostDetail(Post post, User user) {
        this(
                post.getPostId(),
                post.getTitle(),
                post.getContent(),
                post.getPostLikes().size(),
                PostList.isUserLiked(post, user),
                post.getViewCount(),
                extractImageUrls(post),
                DateUtil.format(post.getCreatedAt()),
                new UserProfile(post.getUser()),
                user.getImageUrl()
        );
    }

    private static List<String> extractImageUrls(Post post) {
        return post.getPostImages().stream()
                .map(PostImage::getImageUrl)
                .collect(Collectors.toList());
    }
}
