import type { App } from "vue";

// components
import notificationFactory from "./components/notification";
import loadingFactory from "./components/loading";
import { RButton, RSelect, ROption, RSelectGroup, RInput, RPopup, RCheckbox, RPagination, RSlider, RTab, RTabItem } from './components'

// directives
import ripple from "./directives/ripple";
import clickOutside from "./directives/clickOutside";
import appendToBody from "./directives/appendToBody";

// composables
import useNotification from "./composables/useNotification";
import useLoading from "./composables/useLoading";
import useSevue from "./composables/useSevue";
import useTimer from './composables/useTimer'

import { setDark, setOptions } from "./utils";
import { loadingKey, notificationKey, sevueKey } from "./injectionKeys";

// styles
import "./styles/index.scss";

import type { SevueOptions } from "./types";

const defaultOptions: SevueOptions = {
  ripple: true,
  iconPrefix: "bx",
  colors: {},
  dark: false,
  nuxtOptions: {
    isNuxt: false,
    NuxtLink: undefined
  }
};

export default {
  install: (app: App, userOptions: SevueOptions = {}) => {
    const options = { ...defaultOptions, ...userOptions };
    setOptions(options);

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
    app.directive("ripple", options.ripple ? ripple : {});
    app.directive("click-outside", clickOutside);
    app.directive("append-to-body", appendToBody);

    // instance
    // @ts-ignore
    app.config.globalProperties.$r = {};
    app.config.globalProperties.$r.iconPrefix = options.iconPrefix;
    app.config.globalProperties.$r.setDark = setDark;
    app.config.globalProperties.$r.notification = notificationFactory(app);
    app.config.globalProperties.$r.loading = loadingFactory(app);

    app.provide(sevueKey, {
      iconPrefix: options.iconPrefix as string,
      nuxtOptions: options.nuxtOptions!,
      setDark,
    });
    app.provide(notificationKey, notificationFactory(app));
    app.provide(loadingKey, loadingFactory(app));
  },
};

// components & composables
export { RButton, RSelect, useNotification, useLoading, useSevue, useTimer };

// inject keys
export { notificationKey, sevueKey, loadingKey };

// types
export type { RButtonProps, RCheckboxProps, RInputProps, RPaginationProps, RPopupProps, RSelectProps, ROptionProps, RSliderProps, RTabProps } from './components'
export type { Colors, LoadingOptions, Loading, NotificationOptions, Notification, Sevue, SevueOptions, LoadingInject, NotificationInject, SelectInject } from './types'


// Global Types Definitions
import '@vue/runtime-core'
declare module "vue" {
  export interface ComponentCustomProperties {
    $r: {
      iconPrefix: string | undefined,
      setDark: (dark: boolean) => void,
      notification: ReturnType<typeof notificationFactory>,
      loading: ReturnType<typeof loadingFactory>
    }
  }
}
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    HeightTransition: typeof import('./../src/components/HeightTransition.vue')['default']
    Notification: typeof import('./../src/components/notification/Notification.vue')['default']
    NotificationContainer: typeof import('./../src/components/notification/NotificationContainer.vue')['default']
    RButton: typeof import('./../src/components/button/RButton.vue')['default']
    RCheckbox: typeof import('./../src/components/checkbox/RCheckbox.vue')['default']
    RInput: typeof import('./../src/components/input/RInput.vue')['default']
    RLoading: typeof import('./../src/components/loading/RLoading.vue')['default']
    ROption: typeof import('./../src/components/select/ROption.vue')['default']
    RPagination: typeof import('./../src/components/pagination/RPagination.vue')['default']
    RPopup: typeof import('./../src/components/popup/RPopup.vue')['default']
    RSelect: typeof import('./../src/components/select/RSelect.vue')['default']
    RSelectGroup: typeof import('./../src/components/select/RSelectGroup.vue')['default']
    RSlider: typeof import('./../src/components/slider/RSlider.vue')['default']
    RSliderDot: typeof import('./../src/components/slider/RSliderDot.vue')['default']
    RSliderTick: typeof import('./../src/components/slider/RSliderTick.vue')['default']
    RTab: typeof import('./../src/components/tabs/RTab.vue')['default']
    RTabItem: typeof import('./../src/components/tabs/RTabItem.vue')['default']
  }
}
