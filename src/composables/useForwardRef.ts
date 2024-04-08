import { type ComponentPublicInstance, getCurrentInstance, ref, computed } from "vue";
import { unrefElement } from "@vueuse/core";

export function useForwardRef() {
  const instance = getCurrentInstance()!;

  const currentRef = ref<Element | ComponentPublicInstance | null>();
  const currentElement = computed<HTMLElement>(() => {
    // $el could be text/comment for non-single root normal or text root, thus we retrieve the nextElementSibling
    // @ts-expect-error ignore ts error
    return ["#text", "#comment"].includes(currentRef.value?.$el.nodeName)
      ? // @ts-expect-error ignore ts error
        currentRef.value?.$el.nextElementSibling
      : // @ts-expect-error ignore ts error
        unrefElement(currentRef);
  });

  function forwardRef(ref: Element | ComponentPublicInstance | null) {
    currentRef.value = ref;
    if (typeof ref === "object") {
      instance.exposed = ref;
      instance.exposeProxy = ref;
    }
  }
  return { forwardRef, currentRef, currentElement };
}
