package com.ssafy.iscream.board.service;

import com.ssafy.iscream.board.domain.*;
import com.ssafy.iscream.board.dto.request.PostCreateReq;
import com.ssafy.iscream.board.dto.request.PostReq;
import com.ssafy.iscream.board.dto.request.PostUpdateReq;
import com.ssafy.iscream.board.dto.response.PostDetail;
import com.ssafy.iscream.board.dto.response.PostList;
import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.MinorException.*;
import com.ssafy.iscream.s3.service.S3Service;
import com.ssafy.iscream.user.domain.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostQueryRepository postQueryRepository;
    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;
    private final PostLikeRepository postLikeRepository;

    private final S3Service s3Service;

    private final RedisTemplate<String, Object> redisTemplate;

    // 게시글 작성
    @Transactional
    public Integer createPost(User user, PostCreateReq postReq, List<MultipartFile> files) {
        Post post = Post.builder()
                .title(postReq.getTitle())
                .content(postReq.getContent())
                .user(user)
                .build();

        Post savePost = postRepository.save(post);

        saveImage(savePost, files); // 게시글 이미지 저장

        return savePost.getPostId();
    }

    // 게시글 수정
    @Transactional
    public void updatePost(Integer postId, Integer userId, PostUpdateReq postReq, List<MultipartFile> files) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new DataException(ErrorCode.DATA_NOT_FOUND));

        if (!userId.equals(post.getUser().getUserId())) {
            throw new DataException(ErrorCode.DATA_FORBIDDEN_UPDATE);
        }

        post.setTitle(postReq.getTitle());
        post.setContent(postReq.getContent());

        // 이미지 삭제
        if (!postReq.getDeleteUrls().isEmpty()) {
            s3Service.deleteFile(postReq.getDeleteUrls());
            postImageRepository.deleteByImageUrlIn(postReq.getDeleteUrls());
        }

        saveImage(post, files); // 게시글 이미지 저장
    }

    // 게시글 삭제
    @Transactional
    public void deletePost(Integer postId, Integer userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new DataException(ErrorCode.DATA_NOT_FOUND));

        if (!userId.equals(post.getUser().getUserId())) {
            throw new DataException(ErrorCode.DATA_FORBIDDEN_UPDATE);
        }

        // s3에서 이미지 삭제
        s3Service.deleteFile(post.getPostImages().stream()
                        .map(PostImage::getImageUrl)
                        .collect(Collectors.toList()));

        postRepository.deleteById(postId);
    }

    // 게시글 상세 조회
    public PostDetail getPostDetail(Integer postId, User user, HttpServletRequest request) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new DataException(ErrorCode.DATA_NOT_FOUND));

        increaseViewPost(post, user, request);

        return new PostDetail(post, user, isUserLiked(post, user));
    }

    @Transactional
    public void increaseViewPost(Post post, User user, HttpServletRequest request) {
        String key = "post:viewed:" + post.getPostId() + ":" + getUserId(user, request);

        Boolean isNotViewed = redisTemplate.opsForValue().setIfAbsent(key, "Viewed", Duration.ofHours(24));

        // 24시간 내에 조회한 적이 없을 경우 조회수 증가
        if (Boolean.TRUE.equals(isNotViewed)) {
            post.increaseViews();
        }
    }

    public int getView(Integer postId) {
        String key = "post:views:" + postId;
        Object currentViews = redisTemplate.opsForValue().get(key);

        if (currentViews == null) {
            int initialView = 0;
            redisTemplate.opsForValue().set(key, initialView);

            return initialView;
        }

        return (int) currentViews;
    }

    @Scheduled(cron = "0 */10 * * * ?")
    @Transactional
    public void updateViewCountToDatabase() {
        Set<String> keys = redisTemplate.keys("post:views:*");

        for (String key : keys) {
            Integer postId = Integer.parseInt(key.split(":")[2]);
            Integer views = (Integer) redisTemplate.opsForValue().get(key);

            if (views != null) {
                Post post = postRepository.findById(postId).orElseThrow(() -> new DataException(ErrorCode.DATA_NOT_FOUND));
                post.updateViews(views);
            }
        }

        redisTemplate.delete(keys);
    }

    private String getUserId(User user, HttpServletRequest request) {
        String userIdentifier;

        // 로그인한 경우 userId 사용, 비회원은 IP 주소와 User-Agent를 사용
        if (user != null) {
            userIdentifier = "user:" + user.getUserId();
        } else {
            String ipAddress = request.getHeader("X-Forwarded-For");
            if (ipAddress != null && !ipAddress.isEmpty()) {
                // 첫 번째 주소가 일반적으로 클라이언트의 공인 IP 주소
                ipAddress = ipAddress.split(",")[0].trim();
            } else {
                ipAddress = request.getRemoteAddr();
            }

            String userAgent = request.getHeader("User-Agent");
            if (userAgent == null || userAgent.isEmpty()) {
                userIdentifier = "guest:" + ipAddress.hashCode();
            } else {
                String identifier = ipAddress + userAgent;
                userIdentifier = "guest:" + (long) identifier.hashCode();
            }
        }

        return userIdentifier;
    }

    // 게시글 목록 조회 (검색 포함)
    public PostList getPostList(User user, PostReq req) {
        Pageable pageable = PageRequest.of(0, req.getSize());

        Page<Post> posts = postQueryRepository
                .searchPosts(req.getLastId(), req.getLastLikeCount(), req.getSort(),
                        req.getTitle(), req.getContent(), pageable);

        boolean hasNext = posts.hasNext();

        List<PostList.PostInfo> postList = posts.stream()
                .map(post -> new PostList.PostInfo(post,isUserLiked(post, user)))
                .toList();

        PostList.PostInfo lastPost = !postList.isEmpty() ? postList.get(postList.size() - 1) : null;

        Integer newLastId = lastPost != null ? lastPost.postId() : null;
        Integer newLikeCount = lastPost != null ? lastPost.likes() : null;

        return PostList.of(newLastId, newLikeCount, postList.size(), hasNext, postList);
    }

    // 메인 페이지 게시글 조회
    public Map<String, List<PostList.PostInfo>> getMainPost(User user) {
        Map<String, List<PostList.PostInfo>> result = new HashMap<>();

        List<PostList.PostInfo> hotPosts = postQueryRepository.findTop5LikePost().stream()
                .map(post -> new PostList.PostInfo(post, isUserLiked(post, user)))
                .toList();

        List<PostList.PostInfo> latestPosts = postRepository.findTop5ByOrderByCreatedAtDesc().stream()
                .map(post -> new PostList.PostInfo(post, isUserLiked(post, user)))
                .toList();

        result.put("hot", hotPosts);
        result.put("latest", latestPosts);

        return result;
    }

    private void saveImage(Post post, List<MultipartFile> files) {
        if (files != null && !files.isEmpty()) {
            List<String> imageUrls = s3Service.uploadImage(files);

            List<PostImage> postImages = imageUrls.stream()
                    .map(url -> PostImage.builder().imageUrl(url).post(post).build())
                    .collect(Collectors.toList());

            postImageRepository.saveAll(postImages);
        }
    }

    // 게시글 좋아요
    public void addPostLike(Integer postId, User user) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new DataException(ErrorCode.DATA_NOT_FOUND));

        postLikeRepository.save(PostLike.builder().user(user).post(post).build());
    }

    // 게시글 좋아요 취소
    @Transactional
    public void deletePostLike(Integer postId, Integer userId) {
        postLikeRepository.deleteByPost_PostIdAndUser_UserId(postId, userId);
    }

    private boolean isUserLiked(Post post, User user) {
        if (user == null) {
            return false;
        }

        return postLikeRepository.existsByPost_PostIdAndUser_UserId(post.getPostId(), user.getUserId());
    }


}
