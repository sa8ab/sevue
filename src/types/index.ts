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
  title?: string;
  text: string;
  color?: string;
  textColor?: string;
  duration?: number;
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
