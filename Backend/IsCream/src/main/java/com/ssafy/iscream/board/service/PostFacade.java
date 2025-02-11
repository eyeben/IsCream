package com.ssafy.iscream.board.service;

import com.ssafy.iscream.board.domain.Post;
import com.ssafy.iscream.board.dto.request.PostReq;
import com.ssafy.iscream.board.dto.response.PostDetail;
import com.ssafy.iscream.board.dto.response.PostList;
import com.ssafy.iscream.comment.service.CommentService;
import com.ssafy.iscream.user.domain.User;
import com.ssafy.iscream.user.dto.response.UserProfile;
import com.ssafy.iscream.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PostFacade {

    private final PostService postService;
    private final CommentService commentService;
    private final UserService userService;

    // 게시글 상세 조회
    public PostDetail getPostDetail(Integer postId, User user, HttpServletRequest request) {
        Post post = postService.getPost(postId, user, request);

        Boolean userLiked = postService.isUserLiked(post, user);
        Integer viewCount = postService.getViews(post.getPostId());
        Integer likes = postService.getPostLikes(post.getPostId());

        List<String> images = postService.getPostImages(post.getPostId());

        UserProfile author = userService.getUserProfile(post.getUserId());

        return new PostDetail(post, user, userLiked, viewCount, author, images, likes);
    }

    // 게시글 목록 조회 (검색 포함)
    public PostList getPostList(User user, PostReq req) {
        Page<Post> posts = postService.getPostPage(req);

        boolean hasNext = posts.hasNext();

        List<PostList.PostInfo> postList = posts.stream()
                .map(post -> new PostList.PostInfo(
                        post,
                        postService.isUserLiked(post, user),
                        postService.getPostThumbnail(post.getPostId()),
                        userService.getUserNickname(post.getUserId()),
                        postService.getPostLikes(post.getPostId()),
                        commentService.getCommentCount(post.getPostId())
                        )
                )
                .toList();

        PostList.PostInfo lastPost = !postList.isEmpty() ? postList.get(postList.size() - 1) : null;

        Integer newLastId = lastPost != null ? lastPost.postId() : null;
        Integer newLikeCount = lastPost != null ? lastPost.likes() : null;

        return PostList.of(newLastId, newLikeCount, postList.size(), hasNext, postList);
    }

    // 메인 페이지 게시글 조회
    public Map<String, List<PostList.PostInfo>> getMainPostList(User user) {
        List<PostList.PostInfo> hotPosts = postService.getHotPost().stream()
                .map(post -> new PostList.PostInfo(
                        post,
                        postService.isUserLiked(post, user),
                        postService.getPostThumbnail(post.getPostId()),
                        userService.getUserNickname(post.getUserId()),
                        postService.getPostLikes(post.getPostId()),
                        commentService.getCommentCount(post.getPostId())
                        )
                )
                .toList();

        List<PostList.PostInfo> latestPosts = postService.getLatestPost().stream()
                .map(post -> new PostList.PostInfo(
                        post,
                        postService.isUserLiked(post, user),
                        postService.getPostThumbnail(post.getPostId()),
                        userService.getUserNickname(post.getUserId()),
                        postService.getPostLikes(post.getPostId()),
                        commentService.getCommentCount(post.getPostId())
                        )
                )
                .toList();

        Map<String, List<PostList.PostInfo>> result = new HashMap<>();

        result.put("hot", hotPosts);
        result.put("latest", latestPosts);

        return result;
    }

}
