import React from "react";
import { useNavigate } from "react-router-dom";
import type { NotifyItem } from "../../types/notification";

interface NotificationModalProps {
  notifications: NotifyItem[];
  onClose: () => void;
  onMarkAsRead: (notifyId: number) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onClose,
  onMarkAsRead
}) => {
  const navigate = useNavigate();

  const handleNotificationClick = (notification: NotifyItem) => {
    onMarkAsRead(notification.notifyId);

    if (notification.postId) {
      navigate(`/board/detail/${notification.postId}`);
    } else if (notification.chatId) {
      navigate(`/chat/room/${notification.chatId}`);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16">
      <div className="bg-black bg-opacity-50 fixed inset-0" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-md max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">알림</h2>
        </div>
        <div className="p-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.notifyId}
                onClick={() => handleNotificationClick(notification)}
                className={`p-4 mb-2 rounded-lg cursor-pointer hover:bg-gray-50 ${
                  !notification.isRead ? "bg-blue-50" : "bg-white"
                }`}
              >
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {notification.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">알림이 없습니다</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
