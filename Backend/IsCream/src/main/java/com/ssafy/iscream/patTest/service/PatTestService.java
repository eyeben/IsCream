package com.ssafy.iscream.patTest.service;

import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.MinorException.*;
import com.ssafy.iscream.patTest.domain.PatQuestion;
import com.ssafy.iscream.patTest.domain.PatTest;
import com.ssafy.iscream.patTest.dto.request.PatTestCreateReq;
import com.ssafy.iscream.patTest.dto.response.PatTestQuestionRes;
import com.ssafy.iscream.patTest.dto.response.PatTestRes;
import com.ssafy.iscream.patTest.repository.PatQuestionRepository;
import com.ssafy.iscream.patTest.repository.PatTestRepository;
import com.ssafy.iscream.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatTestService {

    private final PatQuestionRepository patQuestionRepository;
    private final PatTestRepository patTestRepository;

    // PAT 검사 질문 조회
    public List<PatTestQuestionRes> getPatTestList(User user) {
        List<PatQuestion> questions = patQuestionRepository.findAll();
        return questions.stream()
                .map(q -> new PatTestQuestionRes(
                        q.getQuestion(),
                        q.getAnswer1(),
                        q.getAnswer2(),
                        q.getAnswer3()
                ))
                .collect(Collectors.toList());
    }

    // PAT 검사 결과 제출
    @Transactional
    public PatTestRes postPatTestResult(User user, PatTestCreateReq patTestCreateReq) {
        PatTest patTest = PatTest.builder()
                .user(user)
                .testDate(LocalDate.now().toString())
                .aScore(patTestCreateReq.getScoreA())
                .bScore(patTestCreateReq.getScoreB())
                .cScore(patTestCreateReq.getScoreC())
                .result(calculateResult(patTestCreateReq.getScoreA(), patTestCreateReq.getScoreB(), patTestCreateReq.getScoreC()))
                .build();

        patTestRepository.save(patTest);

        return new PatTestRes(
                patTest.getTestDate(),
                patTest.getAScore(),
                patTest.getBScore(),
                patTest.getCScore(),
                patTest.getResult().getDescription()
        );
    }

    // PAT 검사 결과 조회
    public PatTestRes getPatTestResult(User user) {
        PatTest patTest = patTestRepository.findByUser(user)
                .orElseThrow(() -> new DataException(ErrorCode.DATA_NOT_FOUND));


        return new PatTestRes(
                patTest.getTestDate(),
                patTest.getAScore(),
                patTest.getBScore(),
                patTest.getCScore(),
                patTest.getResult().getDescription()
        );
    }

    private PatTest.ResultType calculateResult(int scoreA, int scoreB, int scoreC){
        int maxScore = Math.max(Math.max(scoreA, scoreB), scoreC);
        if (maxScore == scoreA) return PatTest.ResultType.A;
        if (maxScore == scoreB) return PatTest.ResultType.B;
        return PatTest.ResultType.C;
    }
}
