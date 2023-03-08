import type { InjectionKey, Ref, ComputedRef } from "vue";
import type { NotificationOptions } from "@/types";

export const notificationKey = Symbol() as InjectionKey<(options: NotificationOptions) => void>;
export const sevueKey = Symbol() as InjectionKey<{
  iconPrefix: string;
  getColor: (color?: string) => string;
  setDark: (dark: boolean) => void;
}>;

export const RSelectKey = Symbol() as InjectionKey<{
  modelValue: Ref<string | number | (string | number)[]>;
  multiple: Ref<boolean>;
  search: Ref<string>;
  focusedItemValue: ComputedRef<
    { value: string | number; text?: string; disabled?: boolean } | undefined
  >;
  onSelectValue: (...args: any) => void;
}>;
