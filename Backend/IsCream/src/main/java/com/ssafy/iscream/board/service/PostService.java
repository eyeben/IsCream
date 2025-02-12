package com.ssafy.iscream.board.service;

import com.ssafy.iscream.board.domain.*;
import com.ssafy.iscream.board.dto.request.PostCreateReq;
import com.ssafy.iscream.board.dto.request.PostReq;
import com.ssafy.iscream.board.dto.request.PostUpdateReq;
import com.ssafy.iscream.board.repository.PostImageRepository;
import com.ssafy.iscream.board.repository.PostLikeRepository;
import com.ssafy.iscream.board.repository.PostQueryRepository;
import com.ssafy.iscream.board.repository.PostRepository;
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
import java.util.List;
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
                .userId(user.getUserId())
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

        if (!userId.equals(post.getUserId())) {
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

        if (!userId.equals(post.getUserId())) {
            throw new DataException(ErrorCode.DATA_FORBIDDEN_UPDATE);
        }

        // s3에서 이미지 삭제
        List<PostImage> images = postImageRepository.findAllByPostId(postId);
        s3Service.deleteFile(images.stream().map(PostImage::getImageUrl).collect(Collectors.toList()));

        postRepository.deleteById(postId);
    }

    // 게시글 상세 조회
    public Post getPost(Integer postId, User user, HttpServletRequest request) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new DataException(ErrorCode.DATA_NOT_FOUND));

        checkPostView(post, user, request);

        return post;
    }

    // 사용자 조회수 중복 확인
    public void checkPostView(Post post, User user, HttpServletRequest request) {
        String key = "post:viewed:" + post.getPostId() + ":" + getViewUserId(user, request);

        Boolean isNotViewed = redisTemplate.opsForValue().setIfAbsent(key, "Viewed", Duration.ofHours(24));

        // 24시간 내에 조회한 적이 없을 경우 조회수 증가
        if (Boolean.TRUE.equals(isNotViewed)) {
            incrementViewCount(post.getPostId());
        }
    }

    // 게시글 이미지 목록 조회
    public List<String> getPostImages(Integer postId) {
        List<PostImage> images = postImageRepository.findAllByPostId(postId);
        return images.stream().map(PostImage::getImageUrl).collect(Collectors.toList());
    }

    // 게시글 썸네일 조회
    public String getPostThumbnail(Integer postId) {
        PostImage image = postImageRepository.findFirstByPostId(postId);
        return image != null ? image.getImageUrl() : null;
    }

    // 게시글 목록 조회
    public Page<Post> getPostPage(PostReq req) {
        Pageable pageable = PageRequest.of(0, req.getSize());
        return postQueryRepository.searchPosts(req, pageable);
    }

    // 인기글
    public List<Post> getHotPost() {
        return postQueryRepository.findTop5LikePost();
    }

    // 최신글
    public List<Post> getLatestPost() {
        return postRepository.findTop5ByOrderByCreatedAtDesc();
    }

    // 게시글 좋아요 개수
    public Integer getPostLikes(Integer postId) {
        return postLikeRepository.countByPostId(postId);
    }

    // 게시글 좋아요
    public void addPostLike(Integer postId, User user) {
        // Redis에 좋아요 상태 저장
        String key = "post:" + postId + ":likes";
        redisTemplate.opsForSet().add(key, user.getUserId().toString());

        // Redis에서 좋아요 개수 증가
        getLikeCount(postId);
        redisTemplate.opsForValue().increment(key + ":count", 1);

        postLikeRepository.save(PostLike.builder().userId(user.getUserId()).postId(postId).build());
    }

    // 게시글 좋아요 취소
    @Transactional
    public void deletePostLike(Integer postId, Integer userId) {
        postLikeRepository.deleteByPostIdAndUserId(postId, userId);
    }

    // 사용자 좋아요 여부 확인
    public boolean isUserLiked(Post post, User user) {
        if (user == null) {
            return false;
        }

        return postLikeRepository.existsByPostIdAndUserId(post.getPostId(), user.getUserId());
    }

    // 게시글 이미지 저장
    private void saveImage(Post post, List<MultipartFile> files) {
        if (files != null && !files.isEmpty()) {
            List<String> imageUrls = s3Service.uploadImage(files);

            List<PostImage> postImages = imageUrls.stream()
                    .map(url -> PostImage.builder().imageUrl(url).postId(post.getPostId()).build())
                    .collect(Collectors.toList());

            postImageRepository.saveAll(postImages);
        }
    }

    // 조회수 증가
    public void incrementViewCount(Integer postId) {
        String key = "post:views:" + postId;
        getViewCount(postId); // Redis에 조회수 저장되어 있는지 확인

        redisTemplate.opsForValue().increment(key); // 조회수 증가
    }

    // Redis에 저장된 게시글 조회수 가져오기
    public Integer getViewCount(Integer postId) {
        String key = "post:views:" + postId;
        Integer viewCount = (Integer) redisTemplate.opsForValue().get(key);

        if (viewCount == null) {
            viewCount = postRepository.findById(postId)
                    .map(Post::getViewCount)
                    .orElse(0);

            redisTemplate.opsForValue().set(key, viewCount);
        }

        return viewCount;
    }

    // 좋아요 개수 가져오기
    public int getLikeCount(Integer postId) {
        String key = "post:" + postId + ":likes";
        Integer likeCount = (Integer) redisTemplate.opsForValue().get(key + ":count");

        if (likeCount == null) {
            likeCount = postRepository.findById(postId)
                    .map(Post::getLikeCount)
                    .orElse(0);

            redisTemplate.opsForValue().set(key + ":count", likeCount);
        }

        return likeCount;
    }

    // 일정 시간마다 DB에 조회수 저장
    @Scheduled(cron = "0 */30 * * * ?")
    @Transactional
    public void updateViewCountToDatabase() {
        Set<String> keys = redisTemplate.keys("post:views:*");

        for (String key : keys) {
            Integer postId = Integer.parseInt(key.split(":")[2]);
            Integer viewCount = (Integer) redisTemplate.opsForValue().get(key);

            if (viewCount != null) {
                Post post = postRepository.findById(postId).orElseThrow(() -> new DataException(ErrorCode.DATA_NOT_FOUND));

                Integer dbViewCount = post.getViewCount();

                // Redis 조회수와 DB와 일치하지 않을 경우에만 업데이트
                if (!viewCount.equals(dbViewCount)) {
                    post.updateViewCount(viewCount);
                }
            }
        }

        redisTemplate.delete(keys);
    }

    // 조회수 증가 시 Redis에 저장될 사용자 아이디 만들기
    private String getViewUserId(User user, HttpServletRequest request) {
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

    // TODO: Redis 게시글 좋아요 개수 감소, 좋아요 취소 시에 어떻게 삭제할지 생각해야함

    // TODO: 일정 시간마다 좋아요 수, 좋아요 상태 DB에 저장


}
