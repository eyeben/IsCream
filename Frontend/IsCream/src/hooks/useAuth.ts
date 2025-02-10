import { useState, useEffect } from "react";
import axios from "axios"; // API 요청을 위한 axios

interface User {
  id: string;
  username: string;
  // 필요한 다른 사용자 정보 필드
}

interface AuthHook {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuth = (): AuthHook => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuth();
  });

  const checkAuth = async (): Promise<boolean> => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }

    try {
      const response = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsAuthenticated(true);
      setUser(response.data);
      return true;
    } catch (error) {
      console.error("Authentication failed", error);
      logout();
      return false;
    }
  };

  const login = async (token: string): Promise<void> => {
    localStorage.setItem("accessToken", token);
    await checkAuth();
  };

  const logout = (): void => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth
  };
};
