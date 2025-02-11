package com.ssafy.iscream.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostRedisService {

    private final RedisTemplate<String, Object> redisTemplate;

}
