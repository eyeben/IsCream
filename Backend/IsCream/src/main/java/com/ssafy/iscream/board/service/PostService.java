package com.ssafy.iscream.board.service;

import com.ssafy.iscream.board.domain.*;
import com.ssafy.iscream.board.dto.request.PostCreateReq;
import com.ssafy.iscream.board.dto.request.PostUpdateReq;
import com.ssafy.iscream.board.dto.response.PostDetail;
import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.MinorException.*;
import com.ssafy.iscream.s3.service.S3Service;
import com.ssafy.iscream.user.domain.User;
import com.ssafy.iscream.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
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

        Integer postId = postRepository.save(post).getPostId();

        if (postId == null) {
            throw new DataException(ErrorCode.DATA_SAVE_FAILED);
        }

        saveImage(post, files); // 게시글 이미지 저장

        return postId;
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

        return new PostDetail(post, user);
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

}
