// hooks/useAuth.ts
import { api } from "../utils/common/axiosInstance";
import type { LoginRequest, LoginResponse } from "../types/auth";

interface User {
  // 사용자 정보 타입 (필요에 따라 추가)
  id?: string;
  name?: string;
}

interface AuthHook {
  isAuthenticated: boolean;
  user?: User;
  login: (loginData: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
}

export const useAuth = (): AuthHook => {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/users/login", loginData);

    if (response.data.code === "S0000") {
      const accessToken = response.headers["access"];
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
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
