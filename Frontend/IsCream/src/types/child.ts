export interface Child {
  childId: number;
  nickname: string;
  birthDate: string;
  gender: "M" | "F";
}

export interface ApiResponse<T> {
  code: string;
  message?: string;
  data?: T;
}