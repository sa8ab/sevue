<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { injectPopupRoot } from "./PopupRoot.vue";

export interface PopupOverlayProps extends PrimitiveProps {}

const props = defineProps<PrimitiveProps>();

const rootContext = injectPopupRoot();

const handlePointerDown = (e: PointerEvent) => {
  const isRightClick = e.button === 2;

  if (isRightClick) return;

  rootContext.tryClose();
};
</script>

<template>
  <Primitive :as="as" :asChild="asChild" @pointerdown="handlePointerDown">
    <slot />
  </Primitive>
</template>
