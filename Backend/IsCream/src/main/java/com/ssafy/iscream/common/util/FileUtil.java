package com.ssafy.iscream.common.util;

import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

public class FileUtil {

    public static String createFileName(MultipartFile file) {
        String extension = getFileExtension(file.getOriginalFilename());

        return UUID.randomUUID() + "_" + System.currentTimeMillis() + (extension.isEmpty() ? "" : "." + extension);
    }

    // 허용된 파일 확장자 리스트
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "png", "jpeg", "gif", "pdf");

    // 파일 확장자 체크 메서드
    public static boolean isValidExtension(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return false;
        }

        // 파일 확장자 추출
        String extension = getFileExtension(fileName);

        // 확장자가 허용된 리스트에 포함되어 있는지 확인
        return ALLOWED_EXTENSIONS.contains(extension.toLowerCase());
    }

    // 파일 확장자 추출 메서드
    private static String getFileExtension(String originalFilename) {
        if (originalFilename == null || !originalFilename.contains(".")) {
            return ""; // 확장자가 없으면 빈 문자열 반환
        }

        return originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
    }

}
