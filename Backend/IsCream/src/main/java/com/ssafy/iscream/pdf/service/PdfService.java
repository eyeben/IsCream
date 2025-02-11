package com.ssafy.iscream.pdf.service;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.*;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.ssafy.iscream.common.exception.NotFoundException;
import com.ssafy.iscream.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class PdfService {

    private final S3Service s3Service;

    public String generatePdf(String text) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try (PdfWriter writer = new PdfWriter(outputStream);
             PdfDocument pdfDocument = new PdfDocument(writer);
             Document document = new Document(pdfDocument)) {

            // 한글 폰트 설정
            InputStream fontStream = getClass().getClassLoader().getResourceAsStream("static/NanumGothic.ttf");

            PdfFont font = PdfFontFactory.createFont(fontStream.readAllBytes(), "Identity-H");
            document.setFont(font);

            // PDF에 텍스트 추가
            document.add(new Paragraph(text));
        }catch (Exception e){
            e.printStackTrace();
        }

        return s3Service.uploadPdfFile(outputStream.toByteArray()); // PDF 데이터를 byte[]로 반환
    }
}
