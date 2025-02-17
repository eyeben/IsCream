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

    // reissue 요청 자체가 실패하면 더 이상 재시도하지 않음
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/users/reissue")
    ) {
      // 여기를 수정
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post("/users/reissue");
        const newAccessToken = refreshResponse.headers["access"];

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          api.defaults.headers.common["access"] = newAccessToken;
          originalRequest.headers["access"] = newAccessToken;
          return api(originalRequest);
        }
      } catch (reissueError) {
        // 토큰 재발급 실패시 로그아웃 처리
        localStorage.removeItem("accessToken");
        queryClient.setQueryData(["auth"], { isAuthenticated: false });
        // 로그인 페이지로 리다이렉트 하는 로직 추가
        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  }
);
