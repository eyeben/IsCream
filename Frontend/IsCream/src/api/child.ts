import { api } from "../utils/common/axiosInstance";
import { Child } from "../types/child";

export const childApi = {
  async getChildren(): Promise<Child[]> {
    try {
      const response = await api.get("/children");

      if (response.data.code === "S0000") {
        return response.data.data;
      }

      return [];
    } catch (error) {
      console.error("자녀 목록 조회 실패:", error);
      throw error;
    }
  }
};
