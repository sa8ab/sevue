import type { InjectionKey, Ref, ComputedRef } from "vue";
import type { LoadingOptions, NotificationOptions } from "@/types";

export const notificationKey = Symbol() as InjectionKey<(options: NotificationOptions) => void>;
export const sevueKey = Symbol() as InjectionKey<{
  iconPrefix: string;
  getColor: (color?: string) => string | undefined;
  setDark: (dark: boolean) => void;
}>;

export const RSelectKey = Symbol() as InjectionKey<{
  modelValue: Ref<string | number | (string | number)[]>;
  multiple: Ref<boolean>;
  search: Ref<string>;
  color: Ref<string>;
  focusedItemValue: ComputedRef<
    { value: string | number; text?: string; disabled?: boolean } | undefined
  >;
  onSelectValue: (...args: any) => void;
}>;

export const LoadingKey = Symbol() as InjectionKey<(options?: LoadingOptions) => () => {}>;
