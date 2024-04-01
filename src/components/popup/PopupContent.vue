<script setup lang="ts">
import { watch, nextTick } from "vue";

import { useContext } from "@/composables/useContext";
import { useForwardRef } from "@/composables/useForwardRef";
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { type PopupRootContext, injectPopupRoot } from "./PopupRoot.vue";
import { useFocusTrap } from "@/composables/useFocusTrap";

export interface PopupContentProps extends PrimitiveProps {}

const props = withDefaults(defineProps<PrimitiveProps>(), {});

const { forwardRef, currentElement } = useForwardRef();

const rootContext = injectPopupRoot();

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
    console.log(currentElement.value);

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
  <Primitive :as="as" :asChild="asChild" :ref="forwardRef" tabindex="-1">
    <slot />
  </Primitive>
</template>
