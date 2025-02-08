import axios from "axios";
import {
  CalendarDay,
  CalendarDetail,
  ApiResponse,
  CalendarQuery,
  CalendarDetailQuery,
  MemoCreate,
  MemoUpdate
} from "./types";

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

// hooks/useCalendar.ts
import { useState, useCallback } from "react";

export const useCalendar = (childId: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 달력 데이터 조회
  const fetchCalendar = useCallback(
    async (yearMonth: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await calendarApi.getCalendar({ childId, yearMonth });
        return response.data;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "달력 데이터 조회 중 오류가 발생했습니다."
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [childId]
  );

  // 상세 데이터 조회
  const fetchCalendarDetail = useCallback(
    async (selectedDate: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await calendarApi.getCalendarDetail({
          childId,
          selectedDate
        });
        return response.data;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "상세 데이터 조회 중 오류가 발생했습니다."
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [childId]
  );

  // 메모 생성
  const createMemo = useCallback(
    async (selectedDate: string, memo: string) => {
      try {
        setLoading(true);
        setError(null);
        await calendarApi.createMemo({ childId, selectedDate, memo });
        return true;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "메모 작성 중 오류가 발생했습니다."
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [childId]
  );

  // 메모 수정
  const updateMemo = useCallback(async (memoId: number, memo: string) => {
    try {
      setLoading(true);
      setError(null);
      await calendarApi.updateMemo({ memoId, memo });
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "메모 수정 중 오류가 발생했습니다."
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // 메모 삭제
  const deleteMemo = useCallback(async (memoId: number) => {
    try {
      setLoading(true);
      setError(null);
      await calendarApi.deleteMemo(memoId);
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "메모 삭제 중 오류가 발생했습니다."
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchCalendar,
    fetchCalendarDetail,
    createMemo,
    updateMemo,
    deleteMemo
  };
};
