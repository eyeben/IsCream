package com.ssafy.iscream.common.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    SYSTEM_ERROR("E2001", "시스템 에러 발생"),

    INVALID_TOKEN("E3001", "토큰 유효성 검증에 실패하였습니다."),
    TOKEN_EXPIRED("E3002", "토큰 유효기간이 만료되었습니다."),

    DATA_NOT_FOUND("E4001", "데이터 조회에 실패했습니다."),
    DATA_SAVE_FAILED("E4002", "데이터 저장, 업데이트에 실패했습니다."),
    DATA_DELETE_FAILED("E4003", "데이터 삭제에 실패했습니다."),
    DATA_FORBIDDEN_ACCESS("E4004", "데이터에 대한 접근 권한이 없습니다."),

    DUPLICATE_EMAIL("E5001", "이미 존재하는 이메일입니다."),
    DUPLICATE_NICKNAME("E5002", "이미 존재하는 닉네임입니다."),
    SEND_EMAIL_CODE_FAILED("E5003", "인증 코드 전송 실패"),
    EMAIL_CERTIFICATION_FAILED("E5004", "이메일 인증 실패"),
    DUPLICATE_USER("E5005", "이미 가입된 회원입니다."),
    JOIN_SOCIAL_FAILED("E5006", "간편 회원가입 실패"),
    MEMBER_NOT_FOUND("E5007", "존재하지 않는 회원입니다."),

    LOGIN_FAILED("E6001", "로그인에 실패하였습니다."),
    LOGIN_SOCIAL_FAILED("E6002", "간편 로그인 실패"),
    INVALID_PASSWORD("E6003", "현재 비밀번호가 올바르지 않습니다."),
    SAME_PASSWORD("E6004", "현재 비밀번호와 동일한 비밀번호입니다."),

    IMAGE_UPLOAD_FAILED("E7001", "이미지 업로드 실패"),
    IMAGE_ANALYZE_FAILED("E7002", "이미지 분석 실패"),
    FILE_URL_CONVERSION_FAILED("E7003", "파일 URL 변환 실패"),
    FILE_URL_NOT_FOUND("E7004", "파일 URL 조회 실패"),
    INVALID_FILE_URL_FORMAT("E7005", "잘못된 형식의 이미지 URL입니다.");

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
