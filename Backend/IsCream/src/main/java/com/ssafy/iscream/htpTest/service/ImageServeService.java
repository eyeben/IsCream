package com.ssafy.iscream.htpTest.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.ssafy.iscream.htpTest.domain.request.HtpTestDiagnosisReq;
import com.ssafy.iscream.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class ImageServeService {
    private final WebClient webClient;

    /**
     * WebClient를 이용해 AI 서버와 통신할 서비스 객체 생성
     */
    public ImageServeService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://i12a407.p.ssafy.io/ai").build();
    }

    /**
     * AI 서버에 이미지 데이터를 전송하고 분석 결과를 반환
     */
    public String sendImageData(User user, List<HtpTestDiagnosisReq> data) {
        if (data == null || data.isEmpty()) {
            return "No data to send.";
        }

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode jsonObject = objectMapper.createObjectNode();
        jsonObject.set("files", objectMapper.valueToTree(data));

        try {
            return webClient.post()
                    .uri("/ai/predict")
                    .bodyValue(jsonObject)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
