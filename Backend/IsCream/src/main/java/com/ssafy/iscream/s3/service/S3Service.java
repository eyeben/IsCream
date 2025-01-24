package com.ssafy.iscream.s3.service;

import com.ssafy.iscream.common.util.FileUtil;
import io.awspring.cloud.s3.S3Exception;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class S3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${s3.upload.file.url}")
    private String baseUrl;

    @Value("${s3.upload.folder.image}")
    private String imageDir; // 이미지 저장 폴더

    @Value("${s3.upload.folder.result}")
    private String resultDir; // 검사 결과 pdf 저장 폴더

    private final S3Client s3Client;

    // TODO: pdf 파일 업로드

    // 단일 파일 업로드
    public String uploadFile(MultipartFile multipartFile) throws IOException {
        String fileKey = imageDir + FileUtil.createFileName(multipartFile);

        // 임시 파일 생성
        File tempFile = File.createTempFile("upload-", ".tmp");
        multipartFile.transferTo(tempFile);

        try {
            // S3에 업로드
            s3Client.putObject(
                    PutObjectRequest.builder().bucket(bucket).key(fileKey).build(),
                    RequestBody.fromFile(tempFile)
            );
        } finally {
            tempFile.delete(); // 임시 파일 삭제
        }

        return baseUrl + fileKey; // 만들어진 url 반환
    }

    // 여러 파일 업로드
    public List<String> uploadFile(List<MultipartFile> files) throws IOException {
        List<String> result = new ArrayList<>();

        for (MultipartFile file : files) {
            result.add(uploadFile(file));
        }

        return result;
    }

    // 파일 삭제
    public void deleteFile(String fileUrl) {
        try {
            String fileKey = extractFileKeyFromUrl(fileUrl);

            if (fileExists(fileKey)) {
                s3Client.deleteObject(DeleteObjectRequest.builder().bucket(bucket).key(fileKey).build());
                System.out.println("파일이 성공적으로 삭제되었습니다: " + fileKey);
            } else {
                System.out.println("파일이 존재하지 않습니다: " + fileKey);
            }
        } catch (S3Exception e) {
            System.err.println("파일 삭제 중 오류 발생: " + e.getMessage());
        }
    }

    // 파일 존재 여부 확인
    public boolean fileExists(String fileKey) {
        try {
            s3Client.headObject(HeadObjectRequest.builder().bucket(bucket).key(fileKey).build());
            return true;
        } catch (NoSuchKeyException e) {
            return false;
        }
    }


    // URL에서 fileKey 추출
    private String extractFileKeyFromUrl(String fileUrl) {
        return fileUrl.replace(baseUrl, "");
    }

}
