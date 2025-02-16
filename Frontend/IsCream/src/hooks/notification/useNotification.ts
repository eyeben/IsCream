import { useState, useEffect } from "react";
import { notificationAPI } from "../../api/notification/notification";
import type { NotifyItem } from "../../types/notification";

export const useNotification = () => {
  const [notifications, setNotifications] = useState<NotifyItem[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      // 토큰 확인 및 로깅
      const token = localStorage.getItem("accessToken");
      console.log("📋 현재 토큰 상태:", {
        token: token ? "존재함" : "없음",
        tokenLength: token ? token.length : 0
      });

      // API 호출
      const response = await notificationAPI.getNotifications();

      // 전체 응답 로깅
      console.log("📥 알림 API 전체 응답:", JSON.stringify(response, null, 2));

      // 응답 데이터 구조 검증
      if (response.data) {
        console.log("📊 응답 데이터:", {
          code: response.data.code,
          dataLength: response.data.data ? response.data.data.length : 0
        });
      }

      // 성공 케이스 처리
      if (response.data?.code === "S0000") {
        const notifyData = response.data.data || [];

        console.log("✅ 알림 데이터 처리:", {
          totalNotifications: notifyData.length,
          unreadCount: notifyData.filter((n) => !n.isRead).length
        });

        setNotifications(notifyData);
        setHasUnread(notifyData.some((notify) => !notify.isRead));
      } else {
        // API 응답 코드가 성공이 아닌 경우
        const errorMsg = response.data?.message || "알림 조회에 실패했습니다.";
        console.warn(`❌ API 응답 오류: ${errorMsg}`);

        throw new Error(errorMsg);
      }
    } catch (error: any) {
      // 에러 상세 로깅
      console.group("❌ 알림 조회 에러");
      console.error("에러 객체:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알림을 불러오는데 실패했습니다.";

      console.log("에러 메시지:", errorMessage);
      console.log("에러 상태:", {
        responseStatus: error.response?.status,
        responseData: error.response?.data
      });
      console.groupEnd();

      // 상태 업데이트
      setError(errorMessage);
      setNotifications([]);
      setHasUnread(false);
    } finally {
      // 로딩 상태 종료
      setLoading(false);
    }
  };

  // 초기 로드 및 의존성 배열 없는 최초 1회 실행
  useEffect(() => {
    fetchNotifications();
  }, []);

  // 수동 새로고침 함수
  const refresh = () => {
    fetchNotifications();
  };

  return {
    notifications, // 알림 목록
    hasUnread, // 읽지 않은 알림 존재 여부
    loading, // 로딩 상태
    error, // 에러 메시지
    refresh, // 수동 새로고침 함수
    fetchNotifications, // API 호출 함수
    markAsRead: notificationAPI.markAsRead // 알림 읽음 처리 함수
  };
};
