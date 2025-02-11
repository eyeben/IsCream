package com.ssafy.iscream.board.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.iscream.board.domain.Post;
import com.ssafy.iscream.board.dto.request.PostReq;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import java.util.List;
import static com.ssafy.iscream.board.domain.QPost.post;
import static com.ssafy.iscream.board.domain.QPostLike.postLike;

@Repository
@RequiredArgsConstructor
public class PostQueryRepository {
    private final JPAQueryFactory queryFactory;

    public Page<Post> searchPosts(PostReq req, Pageable pageable) {
        BooleanBuilder predicate = new BooleanBuilder();

        String title = req.getTitle();
        String content = req.getContent();
        String sort = req.getSort();
        Integer lastLikeCount = req.getLastLikeCount();
        Integer lastId = req.getLastId();

        if (title != null) {
            predicate.and(post.title.contains(title));
        }

        if (content != null) {
            predicate.and(post.content.contains(content));
        }

        if (lastId != null && "create".equals(sort)) {
            predicate.and(post.postId.lt(lastId));
        }

        JPAQuery<Post> query = queryFactory
                .selectFrom(post)
                .leftJoin(postLike).on(postLike.post.eq(post))
                .where(predicate)
                .groupBy(post);

        if ("like".equals(sort)) {
            if (lastLikeCount != null) {
                query.having(postLike.count().loe(Long.valueOf(lastLikeCount)));
            }

            if (lastId != null) {
                query.having(postLike.count().eq(postLike.count())
                        .and(post.postId.lt(lastId)));
            }

            query.orderBy(postLike.count().desc(), post.createdAt.desc(), post.postId.desc());
        } else {
            query.orderBy(post.createdAt.desc(), post.postId.desc());
        }

        List<Post> posts = query.limit(pageable.getPageSize()).fetch();

        return PageableExecutionUtils.getPage(posts, pageable, query::fetchCount);
    }

    public List<Post> findTop5LikePost() {
        return queryFactory
                .select(post)
                .from(post)
                .leftJoin(post.postLikes, postLike)
                .groupBy(post)
                .orderBy(postLike.count().desc(), post.createdAt.desc())
                .limit(5)
                .fetch();
    }
}
