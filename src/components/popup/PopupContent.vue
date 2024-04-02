<script setup lang="ts">
import { watch, nextTick } from "vue";

import { useForwardRef } from "@/composables/useForwardRef";
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { injectPopupRoot } from "./PopupRoot.vue";
import { useFocusTrap } from "@/composables/useFocusTrap";

export interface PopupContentProps extends PrimitiveProps {}

const props = withDefaults(defineProps<PrimitiveProps>(), {});

const { forwardRef, currentElement } = useForwardRef();

const rootContext = injectPopupRoot();

const handleKeydown = (e: KeyboardEvent) => {
  const code = e.code;

  if (code === "Escape") {
    if (e.defaultPrevented) return;
    e.stopPropagation();
    rootContext.tryClose();
  }
};

const { deactivate, activate } = useFocusTrap(currentElement, {
  clickOutsideDeactivates: false,
  escapeDeactivates: false,
  allowOutsideClick: true,
  immediate: false,
  fallbackFocus: () => currentElement.value,
});

watch(
  () => rootContext.active,
  async (active) => {
    await nextTick();
    if (active) activate();
    else deactivate();
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <Primitive :as="as" :asChild="asChild" :ref="forwardRef" tabindex="-1" @keydown="handleKeydown">
    <slot />
  </Primitive>
</template>
