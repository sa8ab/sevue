import { notificationKey } from "@/injectionKeys";
import { inject } from "vue";
import type { NotificationOptions, Notification } from "@/types";

const useNotification = () => {
  const notification = inject(notificationKey) as (options: NotificationOptions) => Notification;
  return notification;
};

export default useNotification;
