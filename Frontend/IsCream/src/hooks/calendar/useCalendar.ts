// hooks/Caadeelnrsu.ts;
import { useState, useCallback } from "react";
import { calendarApi } from "../../api/calendar";

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
