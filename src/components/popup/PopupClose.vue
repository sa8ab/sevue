<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { injectPopupRoot } from "./PopupRoot.vue";

export interface PopupCloseProps extends PrimitiveProps {}

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: "button",
});

const rootContext = injectPopupRoot();

const handleClick = () => {
  rootContext.tryClose();
};
</script>

<template>
  <Primitive :as="as" :asChild="asChild" :type="as === 'button' ? 'button' : undefined" @click="handleClick">
    <slot />
  </Primitive>
</template>
