package com.ssafy.iscream.pdf.service;

import com.itextpdf.io.font.PdfEncodings;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.*;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.BorderRadius;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.ssafy.iscream.children.domain.Child;
import com.ssafy.iscream.htpTest.domain.HtpTest;
import com.ssafy.iscream.s3.service.S3Service;
import com.ssafy.iscream.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
@RequiredArgsConstructor
public class PdfService {

    private final S3Service s3Service;

    // 🎨 색상 정의 (DeviceRgb)
    private static final DeviceRgb LIGHT_BLUE = new DeviceRgb(173, 216, 230);
    private static final DeviceRgb LIGHT_YELLOW = new DeviceRgb(255, 255, 153);
    private static final DeviceRgb DARK_GRAY = new DeviceRgb(64, 64, 64);
    private static final DeviceRgb LIGHT_GRAY = new DeviceRgb(211, 211, 211);
    private static final DeviceRgb WHITE = new DeviceRgb(255, 255, 255);
    private static final DeviceRgb BLACK = new DeviceRgb(0, 0, 0);

    public String generatePdf(User user, Child child, String text, HtpTest htpTest) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try (PdfWriter writer = new PdfWriter(outputStream);
             PdfDocument pdfDocument = new PdfDocument(writer);
             Document document = new Document(pdfDocument)) {

            // ✅ 한글 폰트 설정
            PdfFont font = PdfFontFactory.createFont("static/NanumGothic.ttf", PdfEncodings.IDENTITY_H);
            document.setFont(font);

            // ✅ 제목 추가
            document.add(new Paragraph("< HTP 검사 보고서 >")
                    .setFontSize(22).setBold()
                    .setFontColor(WHITE)
                    .setBackgroundColor(DARK_GRAY)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setPadding(10).setMarginBottom(20));

            // ✅ 부모 정보
            document.add(getSectionTitle("부모 정보", DARK_GRAY, WHITE));
            document.add(getRoundedTable(new String[][]{
                    {"이름: " + user.getUsername(), "이메일: " + user.getEmail()},
                    {"전화번호: " + (user.getPhone() != null ? user.getPhone() : "미입력"), ""}
            }));

            // ✅ 자녀 정보
            document.add(getSectionTitle("자녀 정보", DARK_GRAY, WHITE));
            document.add(getRoundedTable(new String[][]{
                    {"닉네임: " + child.getNickname(), "생년월일: " + child.getBirthDate(), "성별: " + child.getGender()}
            }));

            // ✅ HTP 그림 (2×2 중앙 정렬)
            document.add(getSectionTitle("HTP 검사 그림", LIGHT_BLUE, BLACK));
            Table imageTable = new Table(UnitValue.createPercentArray(new float[]{1, 1}))
                    .useAllAvailableWidth().setMarginBottom(10);
            imageTable.addCell(getCenteredImageCell("집 그림", htpTest.getHouseDrawingUrl()));
            imageTable.addCell(getCenteredImageCell("나무 그림", htpTest.getTreeDrawingUrl()));
            imageTable.addCell(getCenteredImageCell("남자사람 그림", htpTest.getMaleDrawingUrl()));
            imageTable.addCell(getCenteredImageCell("여자사람 그림", htpTest.getFemaleDrawingUrl()));
            document.add(imageTable);

            // ✅ 검사 결과 분석 (텍스트를 4등분하여 표로 정리)
            String[] analysisParts = text.split("----");
            if (analysisParts.length < 4) {
                throw new IllegalArgumentException("텍스트는 4개 부분으로 나누어야 합니다.");
            }

            document.add(getSectionTitle("집 그림 검사 분석", LIGHT_YELLOW, BLACK));
            document.add(getAnalysisTable(analysisParts[0]));

            document.add(getSectionTitle("나무 그림 검사 분석", LIGHT_YELLOW, BLACK));
            document.add(getAnalysisTable(analysisParts[1]));

            document.add(getSectionTitle("남자사람 그림 검사 분석", LIGHT_YELLOW, BLACK));
            document.add(getAnalysisTable(analysisParts[2]));

            document.add(getSectionTitle("여자사람 그림 검사 분석", LIGHT_YELLOW, BLACK));
            document.add(getAnalysisTable(analysisParts[3]));

            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        // ✅ 생성된 PDF를 S3에 업로드 후 URL 반환
        return s3Service.uploadPdfFile(outputStream.toByteArray());
    }

    // 📌 둥근 테두리가 있는 표 생성
    private static Table getRoundedTable(String[][] data) {
        Table table = new Table(UnitValue.createPercentArray(data[0].length))
                .useAllAvailableWidth().setMarginBottom(10);
        for (String[] row : data) {
            for (String cellData : row) {
                table.addCell(new Cell().add(new Paragraph(cellData))
                        .setPadding(8).setBorderRadius(new BorderRadius(10))
                        .setBackgroundColor(LIGHT_GRAY));
            }
        }
        return table;
    }

    // 📌 검사 결과 분석 표 생성
    private static Table getAnalysisTable(String text) {
        Table table = new Table(UnitValue.createPercentArray(1))
                .useAllAvailableWidth().setMarginBottom(10);
        table.addCell(new Cell().add(new Paragraph(text.replace("\n", "\n")))
                .setPadding(10).setBorderRadius(new BorderRadius(10))
                .setBackgroundColor(LIGHT_YELLOW));
        return table;
    }

    // 📌 섹션 제목 생성
    private static Paragraph getSectionTitle(String title, DeviceRgb bgColor, DeviceRgb fontColor) {
        return new Paragraph(title)
                .setBold().setFontSize(16)
                .setFontColor(fontColor)
                .setBackgroundColor(bgColor)
                .setPadding(8).setMarginTop(10);
    }

    // 📌 중앙 정렬된 이미지 셀 생성
    private static Cell getCenteredImageCell(String title, String imageUrl) {
        Cell cell = new Cell().setPadding(5).setBorder(null).setTextAlignment(TextAlignment.CENTER);
        cell.add(new Paragraph(title).setBold().setFontSize(12).setMarginBottom(5));

        if (imageUrl != null && !imageUrl.isEmpty()) {
            try {
                Image image = new Image(ImageDataFactory.create(imageUrl));
                image.scaleToFit(200, 150);
                cell.add(image.setTextAlignment(TextAlignment.CENTER));
            } catch (Exception e) {
                cell.add(new Paragraph("이미지를 불러올 수 없습니다.").setFontSize(10));
            }
        } else {
            cell.add(new Paragraph("이미지 없음").setFontSize(10));
        }

        return cell;
    }
}
