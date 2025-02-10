package com.ssafy.iscream.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;


@Configuration
public class RedisConfig {

    @Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.port}")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(host, port);
    }

    /**
     * Redis에서 Pub/Sub 메시지를 구독할 수 있도록 설정하는 컨테이너
     * - 메시지가 특정 채널(채팅방)에서 발행되었을 때 이를 감지하여 처리
     * - 기본적으로 채널을 설정하지 않으며, 채팅방이 생성될 때 서비스 레이어에서 동적으로 추가할 예정
     */
    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainer(RedisConnectionFactory connectionFactory) {

        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);

        return container;
    }

    /**
     * Redis Pub/Sub 메시지를 처리하는 리스너
     * - 특정 채널(채팅방)에서 메시지가 수신될 때 실행됨
     * - 메시지가 수신되면, 이를 WebSocket을 통해 클라이언트에게 전달하는 역할을 함
     */
    @Bean
    public MessageListenerAdapter messageListener() {
        return new MessageListenerAdapter();
    }

    /**
     * Redis에서 문자열(String) 데이터를 저장하고 조회할 수 있도록 지원
     * - 일반적인 Key-Value 저장 용도로 사용됨 (예: "user:1001" -> "online")
     * - 주로 접속자 관리, 세션 정보 저장 등에 활용
     */
    @Bean
    public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory connectionFactory) {
        return new StringRedisTemplate(connectionFactory);
    }

    /**
     * Redis에서 객체(JSON)를 저장하고 조회할 수 있도록 지원
     * - 일반적인 문자열이 아닌, 직렬화된 객체 데이터를 Redis에 저장할 때 사용됨
     * - 채팅 메시지 등을 JSON 형태로 저장할 때 유용
     */
    @Bean
    public RedisTemplate<?, ?> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<byte[], byte[]> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        return template;
    }
}
