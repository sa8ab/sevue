import { notificationKey } from "@/injectionKeys";
import { inject } from "vue";
import type { NotificationInject } from "@/types";

const useNotification = () => {
  const notification = inject(notificationKey) as NotificationInject
  return notification;
};

export default useNotification;
