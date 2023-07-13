import type { InjectionKey, Ref, ComputedRef } from "vue";
import type {
  LoadingOptions,
  NotificationOptions,
  Notification,
  LoadingInject,
  Sevue,
  SelectInject,
  NotificationInject,
  SliderInject,
  TabInject,
  PanelInject,
} from "@/types";

export const notificationKey = Symbol() as InjectionKey<NotificationInject>;

export const sevueKey = Symbol() as InjectionKey<Sevue>;

export const rSelectKey = Symbol() as InjectionKey<SelectInject>;

export const loadingKey = Symbol() as InjectionKey<LoadingInject>;

export const sliderKey = Symbol() as InjectionKey<SliderInject>;

export const tabKey = Symbol() as InjectionKey<TabInject>;

export const panelKey = Symbol() as InjectionKey<PanelInject>;
