export interface NotifyItem {
  notifyId: number;
  title: string;
  content: string;
  type: string;
  isRead: boolean;
  postId?: number;
  chatId?: number;
}

export interface NotifyResponse {
  code: "S0000" | "E4001";
  message: string;
  data: NotifyItem[];
}
