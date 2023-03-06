import type { InjectionKey } from "vue";
import type { NotificationOptions } from "@/types";

export const notificationKey = Symbol() as InjectionKey<(options: NotificationOptions) => void>;
export const sevueKey = Symbol() as InjectionKey<{
  iconPrefix: string;
  getColor: (color?: string) => string;
  setDark: (dark: boolean) => void;
}>;
