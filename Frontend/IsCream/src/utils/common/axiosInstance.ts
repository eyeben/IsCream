import axios from "axios";
import { queryClient } from "./queryClient";

const { VITE_BASE_API } = import.meta.env;

export const api = axios.create({
  baseURL: VITE_BASE_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// 요청 전에 토큰을 헤더에 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["access"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 발생 시 토큰 재발급
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        // 🔹 토큰 재발급 요청
        const refreshResponse = await api.post("/users/reissue"); // 쿠키 기반이므로 자동으로 Refresh Token 전송됨

        // 🔹 새로운 Access Token을 저장
        const newAccessToken = refreshResponse.headers["access"];
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          api.defaults.headers.common["access"] = newAccessToken;
        }

        // 🔹 실패했던 요청을 새로운 Access Token으로 재시도
        originalRequest.headers["access"] = newAccessToken;
        return api(originalRequest);
      } catch (reissueError) {
        console.error("토큰 재발급 실패, 로그아웃 처리", reissueError);
        localStorage.removeItem("accessToken");
        queryClient.setQueryData(["auth"], { isAuthenticated: false });
      }
    }

    return Promise.reject(error);
  }
);
