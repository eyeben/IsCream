package com.ssafy.iscream.calendar.dto.response;

import com.ssafy.iscream.htpTest.domain.Emoji;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CalendarGetRes {

    Emoji emoji;
    boolean isMemo;
    boolean isHtp;

    public void updateIsMemo(boolean isMemo) {
        this.isMemo = isMemo;
    }

    public void updateIsHtp(boolean isHtp) {
        this.isHtp = isHtp;
    }


}
