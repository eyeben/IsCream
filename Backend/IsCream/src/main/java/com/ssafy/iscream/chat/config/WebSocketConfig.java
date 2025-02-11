package com.ssafy.iscream.chat.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketConfig.class);

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        logger.info("✅ WebSocket /ws 엔드포인트 등록됨");
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*"); // CORS 허용
        //.withSockJS(); // WebSocket 미지원 브라우저 대응

    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        logger.info("✅ 메시지 브로커 설정 시작");
        registry.enableSimpleBroker("/sub") // 구독 경로 설정
                .setTaskScheduler(taskScheduler())
                .setHeartbeatValue(new long[]{10000, 10000}); // 10초마다 하트비트 설정


        registry.setApplicationDestinationPrefixes("/pub"); // 발행 경로 설정
    }

    @Bean
    public ThreadPoolTaskScheduler taskScheduler() {
        logger.info("✅ TaskScheduler 설정됨");
        ThreadPoolTaskScheduler taskScheduler = new ThreadPoolTaskScheduler();
        taskScheduler.setPoolSize(10);
        taskScheduler.setThreadNamePrefix("wss-heartbeat-thread-");
        taskScheduler.initialize();
        return taskScheduler;
    }
}
