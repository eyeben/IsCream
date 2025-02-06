package com.ssafy.iscream.board.service;

import com.ssafy.iscream.board.domain.*;
import com.ssafy.iscream.board.dto.request.PostCreateReq;
import com.ssafy.iscream.board.dto.request.PostUpdateReq;
import com.ssafy.iscream.board.dto.response.PostDetail;
import com.ssafy.iscream.board.dto.response.PostList;
import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.MinorException.*;
import com.ssafy.iscream.s3.service.S3Service;
import com.ssafy.iscream.user.domain.User;
import com.ssafy.iscream.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;
    private final PostLikeRepository postLikeRepository;
    private final UserRepository userRepository;

    private final S3Service s3Service;

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
    public PostDetail getPostDetail(Integer postId, User user) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new DataException(ErrorCode.DATA_NOT_FOUND));

        return new PostDetail(post, user, isUserLiked(post, user));
    }

    // 게시글 목록 조회
    public PostList getPostList(User user, Integer page, Integer size) {
        int totalCount = (int) postRepository.count();

        Pageable pageable = PageRequest.of(page - 1, size);

        Page<Post> postPage = postRepository.findAllByOrderByCreatedAtDesc(pageable);

        List<PostList.PostInfo> postInfoList = postPage.getContent().stream()
                .map(post -> new PostList.PostInfo(post, isUserLiked(post, user)))
                .collect(Collectors.toList());

        return PostList.of(postInfoList, (int) postPage.getTotalElements(), pageable.getPageNumber() + 1, pageable.getPageSize());


//        int offset = (page - 1) * size;
//
//        List<Post> postList = postRepository.findPostsWithPagination(offset, size);
//
//        List<PostList.PostInfo> postInfoList = postList.stream()
//                .map(post -> new PostList.PostInfo(post,isUserLiked(post, user)))
//                .toList();
//
//        return PostList.of(postInfoList, totalCount, page, postList.size());
    }

    // 메인 페이지 게시글 조회
    public Map<String, List<PostList.PostInfo>> getMainPost(User user) {
        Map<String, List<PostList.PostInfo>> result = new HashMap<>();

        List<PostList.PostInfo> hotPosts = postRepository.findTop5ByLikes().stream()
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
