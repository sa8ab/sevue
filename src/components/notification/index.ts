import Notification from "./Notification.vue";
import NotificationContainer from "./NotificationContainer.vue";
import mounter from "@/utils/mountComponent";
import type { App } from "vue";
import type { Notification as NotificationType, NotificationOptions } from "@/types";

const notificationFactory = (app: App) => {
  const defaultProps = {
    placement: "bottom-right",
  };
  const _app = app;
  return (data: NotificationOptions): NotificationType => {
    const propsData = {
      ...defaultProps,
      ...data,
    };

    const appendName = propsData.placement.includes("top") ? "prepend" : "append";

    const container = document.querySelector(`.r-notifications-container.${propsData.placement}`);

    if (container) {
      const { element, vNode } = mounter(Notification, {
        props: propsData,
        app: _app,
      });
      container[appendName](element);

      return {
        close: vNode.component?.exposed?.close
      }
    } else {
      const { elementChild } = mounter(NotificationContainer, {
        props: propsData,
        app: _app,
      });

      document.body.append(elementChild);

      const { element, vNode } = mounter(Notification, {
        props: propsData,
        app: _app,
      });

      elementChild[appendName](element);

      return {
        close: vNode.component?.exposed?.close
      }
    }
  };
};

export default notificationFactory;
