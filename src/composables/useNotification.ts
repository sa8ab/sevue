import { notificationKey } from "@/injectionKeys";
import { inject } from "vue";
import type { NotificationOptions } from "@/types";

const useNotification = () => {
  const notification = inject(notificationKey) as (options: NotificationOptions) => void;
  return notification;
};

export default useNotification;
