import { useCallback } from "react";
import { notificationAPI } from "../../api/notification/notification";
import {
  requestNotificationPermission,
  registerServiceWorker
} from "../../utils/fcm";

interface UseFCMReturn {
  initializeFCM: () => Promise<void>;
  saveToken: (token: string) => Promise<void>;
  deleteToken: () => Promise<void>;
}

export const useFCM = (): UseFCMReturn => {
  const initializeFCM = async () => {
    try {
      await registerServiceWorker();
      const token = await requestNotificationPermission();

      if (token) {
        // 토큰을 서버에 저장
        await notificationAPI.saveToken(token);
        console.log("FCM 토큰 서버 저장 성공");
      }
    } catch (error) {
      console.error("FCM 초기화 실패:", error);
    }
  };

  const saveToken = useCallback(async (token: string) => {
    try {
      await notificationAPI.saveToken(token);
    } catch (error) {
      console.error("FCM 토큰 저장 실패:", error);
      throw error;
    }
  }, []);

  const deleteToken = useCallback(async () => {
    try {
      await notificationAPI.deleteToken();
    } catch (error) {
      console.error("FCM 토큰 삭제 실패:", error);
      throw error;
    }
  }, []);

  return {
    initializeFCM,
    saveToken,
    deleteToken
  };
};
