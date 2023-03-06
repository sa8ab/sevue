import NotificationsContainer from "../components/notification/NotificationContainer.vue";
import Notification from "../components/notification/Notification.vue";
import { inject } from "vue";

export const useNotification = () => {
  const defaultProps = {
    placement: "bottom-right",
  };
  const mounter: any = inject("mounter");

  const notification = undefined;

  return notification;
};
