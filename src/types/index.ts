import type { VNode } from "vue";

export type Picked<T, K extends keyof T> = T[K]
export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

export type Sevue = {
  iconPrefix: string;
  getColor: (color?: string) => string | undefined;
  setDark: (dark: boolean) => void;
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
}

type NotificationPlacement =
  | "top-left"
  | "top"
  | "top-right"
  | "bottom-right"
  | "bottom"
  | "bottom-left";
export interface NotificationOptions {
  placement?: NotificationPlacement;
  title?: string | VNode,
  text?: string | VNode,
  color?: string,
  textColor?: string,
  duration?: number
  pauseOnHover?: boolean
  noCloseButton?: boolean
  onClose?: () => void
}
export interface Notification {
  close: () => void;
}

export type LoadingOptions = {
  text?: string;
  color?: string;
  background?: string;
  scale?: number;
  target?: string | HTMLElement;
};
export interface Loading {
  close: () => void;
}
