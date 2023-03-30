import type { App } from "vue";

// components
import RButton, { type Props as RButtonProps } from "./components/button";
import { RSelect, ROption, RSelectGroup } from "./components/select";
import notificationFactory from "./components/notification";
import RInput from "./components/input";
import RPopup from "./components/popup";
import RCheckbox from "./components/checkbox";
import RPagination from "./components/pagination";
import RSlider from "./components/slider";
import { RTab, RTabItem } from "./components/tabs";

// directives
import ripple from "./directives/ripple";
import clickOutside from "./directives/clickOutside";
import appendToBody from "./directives/appendToBody";

// composables
import useNotification from "./composables/useNotification";
import useLoading from "./composables/useLoading";

import { getColor, setDark, setOptions } from "./utils";
import { loadingKey, notificationKey, sevueKey } from "./injectionKeys";

// styles
import "./styles/index.scss";

import type { SevueOptions } from "./types";
import loadingFactory from "./components/loading";

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
    app.component("RSelectGroup", RSelectGroup);
    app.component("RInput", RInput);
    app.component("RPopup", RPopup);
    app.component("RCheckbox", RCheckbox);
    app.component("RPagination", RPagination);
    app.component("RSlider", RSlider);
    app.component("RTab", RTab);
    app.component("RTabItem", RTabItem);

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
    app.config.globalProperties.$r.loading = loadingFactory(app);
    // app.config.globalProperties.$r.loading = loading;

    app.provide(sevueKey, {
      iconPrefix: options.iconPrefix as string,
      getColor,
      setDark,
    });
    app.provide(notificationKey, notificationFactory(app));
    app.provide(loadingKey, loadingFactory(app));
  },
};
// components & composables
export { RButton, useNotification, useLoading };

// inject keys
export { notificationKey, sevueKey, loadingKey };

// types
export { RButtonProps }

declare module "vue" {
  interface ComponentCustomProperties {
    $r: any
  }
}