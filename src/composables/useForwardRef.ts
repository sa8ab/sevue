import { type ComponentPublicInstance, getCurrentInstance } from "vue";

export function useForwardRef() {
  const instance = getCurrentInstance()!;
  function handleRefChange(ref: Element | ComponentPublicInstance | null) {
    if (typeof ref === "object") {
      instance.exposed = ref;
      instance.exposeProxy = ref;
    }
  }
  return handleRefChange;
}
