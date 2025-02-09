export interface ApiResponse<T> {
  code: "S0000" | "E4001" | "E4002";
  message: string;
  data?: T;
}

export interface CalendarDay {
  emoji: string;
  isMemo: boolean;
  isHtp: boolean;
}

export interface CalendarDetail {
  isMemo: boolean;
  isHtp: boolean;
  houseUrl: string;
  treeUrl: string;
  personUrl: string;
  report: string;
  memoId: string;
  memo: string;
}

export interface CalendarQuery {
  childId: number;
  yearMonth: string; // YYYY-MM
}

export interface CalendarDetailQuery {
  childId: number;
  selectedDate: string; // YYYY-MM-DD
}

export interface MemoCreate {
  childId: number;
  selectedDate: string;
  memo: string;
}

export interface MemoUpdate {
  memoId: number;
  memo: string;
}
