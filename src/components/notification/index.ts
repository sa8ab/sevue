import Notification from "./Notification.vue";
import NotificationContainer from "./NotificationContainer.vue";
import mounter from "@/utils/mountComponent";
import type { App } from "vue";
import type { NotificationOptions } from "@/types";

const notificationFactory = (app: App) => {
  const defaultProps = {
    placement: "bottom-right",
  };
  const _app = app;
  return (data: NotificationOptions) => {
    const propsData = {
      ...defaultProps,
      ...data,
    };

    const appendName = propsData.placement.includes("top") ? "prepend" : "append";

    const container = document.querySelector(`.r-notifications-container.${propsData.placement}`);

    if (container) {
      const { element } = mounter(Notification, {
        props: propsData,
        app: _app,
      });
      container[appendName](element);
    } else {
      const { el: mountedContainer } = mounter(NotificationContainer, {
        props: propsData,
        app: _app,
      });

      document.body.append(mountedContainer);

      const { element } = mounter(Notification, {
        props: propsData,
        app: _app,
      });

      mountedContainer[appendName](element);
    }
  };
};

export default notificationFactory;
