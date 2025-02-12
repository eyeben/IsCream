// hooks/useAuth.ts
import { api } from "../utils/common/axiosInstance";
import type { LoginRequest, LoginResponse } from "../types/auth";

interface AuthHook {
  isAuthenticated: boolean;
  login: (loginData: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
}

export const useAuth = (): AuthHook => {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/users/login", loginData);

    console.log('전체 응답 헤더:', response.headers); // 디버깅용
    console.log('access token:', response.headers["access"]);

    if (response.data.code === "S0000") {
      const accessToken = response.headers["access"];
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      }else{
        console.error('Access token이 응답 헤더에 없습니다.')
      }
    }

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    delete api.defaults.headers.common["Authorization"];
  };

  return {
    isAuthenticated,
    login,
    logout
  };
};
