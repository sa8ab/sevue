import type { App } from "vue";

// components
import RButton from "./components/button";
import { RSelect, ROption } from "./components/select";
import notificationFactory from "./components/notification";
import RInput from "./components/input";
import RPopup from "./components/popup";
import RCheckbox from "./components/checkbox";

// directives
import ripple from "./directives/ripple";
import clickOutside from "./directives/clickOutside";
import appendToBody from "./directives/appendToBody";

// composables
import useNotification from "./composables/useNotification";

import { getColor, setDark, setOptions } from "./utils";
import { notificationKey, sevueKey } from "./injectionKeys";

// styles
import "./styles/index.scss";

import type { SevueOptions } from "./types";

const defaultOptions: SevueOptions = {
  ripple: true,
  iconPrefix: "bx",
  colors: {},
  dark: false,
};

export default {
  install: (app: App, userOptions: SevueOptions) => {
    const options = { ...defaultOptions, ...userOptions };
    setOptions(app, options);

    // components
    app.component("RButton", RButton);
    app.component("RSelect", RSelect);
    app.component("ROption", ROption);
    app.component("RInput", RInput);
    app.component("RPopup", RPopup);
    app.component("RCheckbox", RCheckbox);

    // directives
    app.directive("ripple", ripple);
    app.directive("click-outside", clickOutside);
    app.directive("append-to-body", appendToBody);

    // instance
    app.config.globalProperties.$r = {};
    app.config.globalProperties.$r.iconPrefix = options.iconPrefix;
    app.config.globalProperties.$r.getColor = getColor;
    app.config.globalProperties.$r.setDark = setDark;
    app.config.globalProperties.$r.notification = notificationFactory(app);
    // app.config.globalProperties.$r.loading = loading;

    app.provide(sevueKey, {
      iconPrefix: options.iconPrefix as string,
      getColor,
      setDark,
    });
    app.provide(notificationKey, notificationFactory(app));
  },
};
export { RButton, useNotification };
// inject keys
export { notificationKey, sevueKey };
