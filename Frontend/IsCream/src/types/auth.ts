export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  code:
    | "S0000"
    | "E6001"
    | "E5011"
    | "E5012"
    | "E3001"
    | "E3002"
    | "E3003"
    | "E3004";
  message: string;
}

export const ERROR_CODES = {
  SUCCESS: "S0000",
  INVALID_REQUEST: "E6001",
  SYSTEM_ERROR: "E5011",
  DB_ERROR: "E5012",
  INVALID_EMAIL: "E3001",
  INVALID_PASSWORD: "E3002",
  USER_NOT_FOUND: "E3003",
  AUTH_FAILED: "E3004"
} as const;
