import { api } from "../utils/common/axiosInstance";
import { LoginRequest, LoginResponse } from "../types/auth";
import { AxiosError } from "axios";

export const login = async (
  loginData: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/users/login", loginData);

    // AccessToken을 헤더에서 가져와서 저장
    const accessToken = response.headers["access"];
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      // authorization 헤더 설정
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data as LoginResponse;
    }
    throw error;
  }
};
