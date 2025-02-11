package com.ssafy.iscream.common.config;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.iscream.chat.listener.RedisSubscriber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;


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
     * ✅ Redis에서 Pub/Sub 메시지를 구독할 수 있도록 설정하는 컨테이너
     * - 메시지가 특정 채널(채팅방)에서 발행되었을 때 이를 감지하여 처리
     * - `RedisSubscriber`를 메시지 리스너로 등록하여 WebSocket 전송 가능하도록 함
     */
    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainer(
            RedisConnectionFactory connectionFactory,
            MessageListenerAdapter messageListenerAdapter) {

        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);

        // ✅ 모든 채팅방의 메시지를 구독하도록 설정 (chatroom-* 채널)
        container.addMessageListener(messageListenerAdapter, new PatternTopic("chatroom-*"));

        return container;
    }

    /**
     * ✅ Redis Pub/Sub 메시지를 처리하는 리스너
     * - `RedisSubscriber`의 `onMessage()` 메서드를 실행하도록 설정
     */
    @Bean
    public MessageListenerAdapter messageListenerAdapter(RedisSubscriber redisSubscriber) {
        return new MessageListenerAdapter(redisSubscriber, "onMessage");
    }
    /**
     * ✅ Redis에서 문자열(String) 데이터를 저장하고 조회할 수 있도록 지원
     * - 일반적인 Key-Value 저장 용도로 사용됨 (예: "user:1001" -> "online")
     */
    @Bean
    public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory connectionFactory) {
        return new StringRedisTemplate(connectionFactory);
    }

    /**
     * ✅ 기존 RedisTemplate을 JSON 직렬화 방식으로 변경
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        // ✅ Jackson ObjectMapper 설정
        ObjectMapper objectMapper = new ObjectMapper()
                .registerModule(new JavaTimeModule()) // LocalDateTime 지원
                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS) // ISO 8601 포맷 유지
                .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES); // 알 수 없는 필드 무시

        // ✅ JSON 직렬화 설정
        Jackson2JsonRedisSerializer<Object> serializer = new Jackson2JsonRedisSerializer<>(objectMapper, Object.class);

        template.setKeySerializer(new StringRedisSerializer());  // Key 직렬화
        template.setValueSerializer(serializer); // Value 직렬화
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(serializer);

        template.afterPropertiesSet();
        return template;
    }
}
