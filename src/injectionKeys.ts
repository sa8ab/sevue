import type { InjectionKey, Ref, ComputedRef } from "vue";
import type { LoadingOptions, NotificationOptions, Notification, Loading } from "@/types";

export const notificationKey = Symbol() as InjectionKey<(options: NotificationOptions) => Notification>;
export const sevueKey = Symbol() as InjectionKey<{
  iconPrefix: string;
  setDark: (dark: boolean) => void;
}>;

export const rSelectKey = Symbol() as InjectionKey<{
  modelValue: Ref<string | number | (string | number)[]>;
  multiple: Ref<boolean | undefined>;
  search: Ref<string>;
  color: Ref<string | undefined>;
  customSearch: ((parameter: string) => void) | undefined
  focusedItemValue: ComputedRef<
    { value: string | number; text?: string; disabled?: boolean } | undefined
  >;
  onSelectValue: (...args: any) => void;
}>;

export const loadingKey = Symbol() as InjectionKey<(options?: LoadingOptions) => Loading>;
