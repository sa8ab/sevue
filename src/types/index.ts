import type { RTabProps } from "@/components";
import type { ComputedRef } from "vue";
import type { CSSProperties, Ref, VNode } from "vue";

export type Picked<T, K extends keyof T> = T[K];
export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export type Orientation = "horizontal" | "vertical";
export type Dir = "ltr" | "rtl";

export type Direction = "forward" | "backward";

export type Sevue = {
  setDark: (dark: boolean) => void;
  nuxtOptions: {
    isNuxt: boolean;
    NuxtLink?: unknown;
  };
};

export type Colors = {
  red?: string;
  yellow?: string;
  prm?: string;
  green?: string;
  [otherOptions: string]: unknown;
};
export interface SevueOptions {
  ripple?: boolean;
  colors?: Colors;
  dark?: boolean;
  nuxtOptions?: {
    isNuxt: boolean;
    NuxtLink?: unknown;
  };
}

type NotificationPlacement = "top-left" | "top" | "top-right" | "bottom-right" | "bottom" | "bottom-left";
export interface NotificationOptions {
  placement?: NotificationPlacement;
  title?: string | VNode;
  text?: string | VNode;
  color?: string;
  textColor?: string;
  duration?: number;
  pauseOnHover?: boolean;
  noCloseButton?: boolean;
  noPadding?: boolean;
  width?: string;
  before?: string | VNode;
  containerClass?: string;
  onClose?: () => void;
}
export interface Notification {
  close: () => void;
}
export type NotificationInject = (options: NotificationOptions) => Notification;

export type LoadingOptions = {
  text?: VNode | string;
  color?: string;
  background?: string;
  scale?: string | number;
  target?: HTMLElement | string;
  spinner?: VNode;
  onlySingleLoading?: boolean;
  containerClass?: string;
  containerStyle?: CSSProperties;
};
export interface Loading {
  close: () => void;
}

export interface LoadingInject {
  loading: (options?: LoadingOptions) => Loading;
  close: () => void;
}

export interface SelectInject {
  modelValue: Ref<Array<number | string | undefined | null> | number | string | null | undefined>;
  multiple: Ref<boolean | undefined>;
  search: Ref<string>;
  color: Ref<string | undefined>;
  customSearch: ((parameter: string) => void) | undefined;
  focusedItemValue: ComputedRef<{ value?: string | number | null; text?: string; disabled?: boolean } | undefined>;
  onSelectValue: (...args: any) => void;
  lastSelectedValue: Ref<number | string | null | undefined>;
}

export interface SliderInject {
  transition: Ref<string>;
  showTickLabels: ComputedRef<boolean>;
  min: Ref<number>;
  max: Ref<number>;
  hideFirstAndLastTickLabel: Ref<boolean>;
  getPositionFromValue: (arg1: { value: number }) => number;
}

export interface TabInject {
  activeTab: Ref<string | number>;
  onItemClick: (item: any) => void;
  setMoverStyle: (item: HTMLElement) => void;
}
export interface PanelInject {
  activeTab: Ref<string | number>;
  setHeight: (height: string) => void;
  direction: Ref<"forward" | "backward">;
}

export interface RTabItemType {
  value: string | number;
  label?: string | number;
  disabled?: boolean;
}
