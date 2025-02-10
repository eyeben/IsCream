package com.ssafy.iscream.chat.service;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ChatRoomService {
    private final RedisMessageListenerContainer listenerContainer;
    private final MessageListenerAdapter messageListener;
    private final Map<String, ChannelTopic> topicMap = new ConcurrentHashMap<>();

    public ChatRoomService(RedisMessageListenerContainer listenerContainer, MessageListenerAdapter messageListener) {
        this.listenerContainer = listenerContainer;
        this.messageListener = messageListener;
    }

    /**
     * 새로운 채팅방을 생성할 때 Redis Pub/Sub 채널을 동적으로 추가
     */
    public void createChatRoom(String roomId) {
        String topicName = "chatroom-" + roomId;
        topicMap.computeIfAbsent(topicName, key -> {
            ChannelTopic topic = new ChannelTopic(key);
            listenerContainer.addMessageListener(messageListener, topic);
            System.out.println("새로운 채팅방 생성 및 구독: " + topicName);
            return topic;
        });
    }



}
