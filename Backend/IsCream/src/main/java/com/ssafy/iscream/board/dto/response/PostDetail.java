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
    public PostDetail(Post post, User user, Boolean userLiked, Integer viewCount,
                      UserProfile author, List<String> images, Integer likes) {
        this(
                post.getPostId(),
                post.getTitle(),
                post.getContent(),
                likes,
                userLiked,
                viewCount,
                images,
                DateUtil.format(post.getCreatedAt()),
                author,
                user != null ? user.getImageUrl() : null
        );
    }
}
