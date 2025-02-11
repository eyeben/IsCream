package com.ssafy.iscream.htpTest.service;

import com.ssafy.iscream.calendar.dto.request.CalendarGetReq;
import com.ssafy.iscream.common.exception.ErrorCode;
import com.ssafy.iscream.common.exception.NotFoundException;
import com.ssafy.iscream.common.exception.UnauthorizedException;
import com.ssafy.iscream.common.response.ResponseData;
import com.ssafy.iscream.htpTest.domain.HtpTest;
import com.ssafy.iscream.htpTest.domain.request.HtpTestDiagnosisReq;
import com.ssafy.iscream.htpTest.domain.request.HtpTestReq;
import com.ssafy.iscream.htpTest.repository.HtpTestRepository;
import com.ssafy.iscream.s3.service.S3Service;
import com.ssafy.iscream.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

import java.time.LocalTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Transactional
public class HtpTestService {
    private final HtpTestRepository htpTestRepository;
    private final S3Service s3Service;

    private Map<Integer, ArrayList<HtpTestDiagnosisReq>> imageMap = new ConcurrentHashMap<>();

    private final ImageServeService imageServeService;

    public List<HtpTest> getByYearMonth(Integer userId, CalendarGetReq calendarGetReq) {
        LocalDateTime startDate = LocalDateTime.of(calendarGetReq.getYear(), calendarGetReq.getMonth(), 1, 0, 0);
        LocalDateTime endDate = startDate.plusMonths(1); // 다음 달 1일 (해당 월의 끝까지 포함)

        // 권한 없는 경우
        List<HtpTest> htpTests = htpTestRepository.findByChildIdAndCreatedAtBetween( calendarGetReq.getChildId(), startDate, endDate);
        if (!htpTests.isEmpty() && !userId.equals(htpTests.get(0).getChildId())) {
            throw new UnauthorizedException(new ResponseData<>(ErrorCode.DATA_FORBIDDEN_ACCESS.getCode(), ErrorCode.DATA_FORBIDDEN_ACCESS.getMessage(), null));
        }

        return htpTests;
    }

    // house, tree, male, female
    public String htpTestCycle(User user, HtpTestReq req) {
        String result = "";
        if (req.getType().equals("house")) {
            checkTodayHtpTest(req.getChildId());
            init(user, req);
            testHouse(user, req);
        } else if (req.getType().equals("tree")) {
            testTree(user, req);
        } else if (req.getType().equals("male")) {
            result = testMale(user, req);
        } else if (req.getType().equals("female")) {
            result = testFemale(user, req);
        }
        return result;
    }

    public void testHouse(User user, HtpTestReq req) {
        HtpTest htpTest = getHtpTestByChildIdAndDate(req.getChildId()).get(0);
        String url = s3Service.uploadImage(req.getFile());
        htpTest.setHouseDrawingUrl(url);
        imageMap.get(user.getUserId()).add(new HtpTestDiagnosisReq(req.getTime(), req.getType(), htpTest.getHouseDrawingUrl()));
    }

    public void testTree(User user, HtpTestReq req) {
        HtpTest htpTest = getHtpTestByChildIdAndDate(req.getChildId()).get(0);
        String url = s3Service.uploadImage(req.getFile());
        htpTest.setTreeDrawingUrl(url);
        imageMap.get(user.getUserId()).add(new HtpTestDiagnosisReq(req.getTime(), req.getType(), htpTest.getTreeDrawingUrl()));
    }

    public String testMale(User user, HtpTestReq req) {
        HtpTest htpTest = getHtpTestByChildIdAndDate(req.getChildId()).get(0);
        String url = s3Service.uploadImage(req.getFile());
        htpTest.setMaleDrawingUrl(url);
        imageMap.get(user.getUserId()).add(new HtpTestDiagnosisReq(req.getTime(), req.getType(), htpTest.getMaleDrawingUrl()));
        String result = "";
        if (req.getIndex().equals(4)) {
            ArrayList<HtpTestDiagnosisReq> files = imageMap.get(user.getUserId());
            result = imageServeService.sendImageData(user, files);
            htpTest.setAnalysisResult(result);
        }
        return result;
    }

    public String testFemale(User user, HtpTestReq req) {
        HtpTest htpTest = getHtpTestByChildIdAndDate(req.getChildId()).get(0);
        String url = s3Service.uploadImage(req.getFile());
        htpTest.setFemaleDrawingUrl(url);
        imageMap.get(user.getUserId()).add(new HtpTestDiagnosisReq(req.getTime(), req.getType(), htpTest.getFemaleDrawingUrl()));
        String result = "";
        if (req.getIndex().equals(4)) {
            ArrayList<HtpTestDiagnosisReq> files = imageMap.get(user.getUserId());
            result = imageServeService.sendImageData(user, files);
            htpTest.setAnalysisResult(result);
        }
        return result;
    }


    public void init(User user, HtpTestReq req) {
        HtpTest htpTest = new HtpTest();
        htpTest.setChildId(req.getChildId());
        htpTestRepository.save(htpTest);
        if (imageMap.containsKey(user.getUserId())) {
            imageMap.get(user.getUserId()).clear();
        } else {
            imageMap.put(user.getUserId(), new ArrayList<>());
        }
    }

    public void checkTodayHtpTest(Integer childId) {
        List<HtpTest> htpTest = getHtpTestByChildIdAndDate(childId);
        if (!htpTest.isEmpty()) {
            HtpTest todayHtpTest = htpTest.get(0);
            htpTestRepository.delete(todayHtpTest);
        }
    }


    public List<HtpTest> getHtpTestByChildIdAndDate(Integer childId) {
        LocalDate today = LocalDate.now();  // 오늘 날짜
        LocalDateTime startOfDay = today.atStartOfDay();  // 오늘 00:00:00
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX); // 오늘 23:59:59.999999999
        return htpTestRepository.findByChildIdAndCreatedAtBetween(childId, startOfDay, endOfDay);
    }

    public HtpTest getByChildIdAndDate(Integer childId, LocalDate selectedDate) {
        return htpTestRepository.findByChildIdAndDate(childId, selectedDate).orElse(null);

    }

    public HtpTest getLastHtpTest(Integer childId) {
        return htpTestRepository.findFirstByChildIdOrderByCreatedAtDesc(childId).orElse(null);
    }
}
