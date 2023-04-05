import type { ComputedRef } from "vue";
import type { CSSProperties, Ref, VNode } from "vue";

export type Picked<T, K extends keyof T> = T[K]
export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

export type Sevue = {
  iconPrefix: string;
  setDark: (dark: boolean) => void;
  isNuxt: boolean
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
  iconPrefix?: string;
  colors?: Colors;
  dark?: boolean;
  isNuxt?: boolean;
}

type NotificationPlacement =
  | "top-left"
  | "top"
  | "top-right"
  | "bottom-right"
  | "bottom"
  | "bottom-left";
export interface NotificationOptions {
  placement?: NotificationPlacement
  title?: string | VNode
  text?: string | VNode
  color?: string
  textColor?: string
  duration?: number
  pauseOnHover?: boolean
  noCloseButton?: boolean
  onClose?: () => void
}
export interface Notification {
  close: () => void;
}
export type NotificationInject = (options: NotificationOptions) => Notification

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
  loading: (options?: LoadingOptions) => Loading
  close: () => void
}

export interface SelectInject {
  modelValue: Ref<string | number | (string | number)[]>;
  multiple: Ref<boolean | undefined>;
  search: Ref<string>;
  color: Ref<string | undefined>;
  customSearch: ((parameter: string) => void) | undefined
  focusedItemValue: ComputedRef<
    { value: string | number; text?: string; disabled?: boolean } | undefined
  >;
  onSelectValue: (...args: any) => void;
}
