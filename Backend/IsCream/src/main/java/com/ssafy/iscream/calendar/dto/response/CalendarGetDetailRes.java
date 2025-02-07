package com.ssafy.iscream.calendar.dto.response;

import com.ssafy.iscream.calendar.domain.Memo;
import com.ssafy.iscream.htpTest.domain.HtpTest;
import lombok.Data;

@Data
public class CalendarGetDetailRes {
    boolean isMemo = false;
    boolean isHtp = false;
    String houseUrl;
    String treeUrl;
    String personUrl;
    String report;
    int memoId;
    String memoContent;

    public CalendarGetDetailRes(HtpTest htpTest, Memo memo) {
        if (htpTest != null) {
            isHtp = true;
            houseUrl = htpTest.getHouseDrawingUrl();
            treeUrl = htpTest.getTreeDrawingUrl();
            personUrl = htpTest.getPersonDrawingUrl();
            report = htpTest.getAnalysisResult();
        }
        if (memo != null) {
            memoId = memo.getMemoId();
            isMemo = true;
            memoContent = memo.getContent();
        }

    }
}
