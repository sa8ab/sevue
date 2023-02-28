import type { App } from "vue";

// components
import RButton from "./components/button";

// directives
import ripple from "./directives/ripple";
import clickOutside from "./directives/clickOutside";
import appendToBody from "./directives/appendToBody";

// styles
import "./styles/index.scss";

import type { SevueOptions } from "./types";
import { getColor, setDark, setOptions } from "./utils";

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

    // directives
    app.directive("ripple", ripple);
    app.directive("click-outside", clickOutside);
    app.directive("append-to-body", appendToBody);

    // instance
    app.config.globalProperties.$r = {};
    app.config.globalProperties.$r.iconPrefix = options.iconPrefix;
    app.config.globalProperties.$r.getColor = getColor;
    app.config.globalProperties.$r.setDark = setDark;
    // app.config.globalProperties.$r.notification = notification;
    // app.config.globalProperties.$r.loading = loading;

    app.provide("r", {
      iconPrefix: options.iconPrefix,
      getColor,
      setDark,
    });
  },
};
export { RButton };
