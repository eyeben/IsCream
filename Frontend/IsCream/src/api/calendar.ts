import axios from "axios";
import {
  CalendarDay,
  CalendarDetail,
  ApiResponse,
  CalendarQuery,
  CalendarDetailQuery,
  MemoCreate,
  MemoUpdate
} from "../types/calendar";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
  // 필요한 경우 여기에 headers 등 추가
});

export const calendarApi = {
  // 달력 조회
  getCalendar: async (params: CalendarQuery) => {
    const response = await api.get<ApiResponse<Record<number, CalendarDay>>>(
      "/calendars",
      { params }
    );
    return response.data;
  },

  // 상세 조회
  getCalendarDetail: async (params: CalendarDetailQuery) => {
    const response = await api.post<ApiResponse<CalendarDetail>>(
      "/calendars/detail",
      params
    );
    return response.data;
  },

  // 메모 작성
  createMemo: async (data: MemoCreate) => {
    const response = await api.post<ApiResponse<void>>("/calendars/memo", data);
    return response.data;
  },

  // 메모 수정
  updateMemo: async (data: MemoUpdate) => {
    const response = await api.put<ApiResponse<void>>("/calendars/memo", data);
    return response.data;
  },

  // 메모 삭제
  deleteMemo: async (memoId: number) => {
    const response = await api.delete<ApiResponse<void>>(
      `/calendars/memo/${memoId}`
    );
    return response.data;
  }
};
