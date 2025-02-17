import { getMessaging, getToken } from "firebase/messaging";
import { app } from "../firebase";

export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
        { scope: "/" }
      );

      console.log("Service Worker 등록 성공:", {
        scope: registration.scope,
        active: !!registration.active
      });

      return registration;
    } catch (error) {
      console.error("Service Worker 등록 실패:", error);
      throw error; // 에러 던지기
    }
  }

  throw new Error("Service Worker를 지원하지 않는 브라우저입니다.");
};

export const requestNotificationPermission = async () => {
  try {
    // 알림 권한 요청
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.warn("알림 권한이 거부되었습니다.");
      return null;
    }

    // 서비스워커 등록 확인
    const registration = await registerServiceWorker();
    const messaging = getMessaging(app);

    // 토큰 요청 옵션
    const tokenOptions = {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration
    };

    try {
      const token = await getToken(messaging, tokenOptions);

      if (!token) {
        console.warn("유효한 토큰을 받을 수 없습니다.");
        return null;
      }

      console.log("FCM 토큰 성공적으로 획득:", token);
      return token;
    } catch (tokenError) {
      console.error("FCM 토큰 생성 중 에러:", tokenError);
      return null;
    }
  } catch (error) {
    console.error("알림 권한 요청 중 에러:", error);
    return null;
  }
};
