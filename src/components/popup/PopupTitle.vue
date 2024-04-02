<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { injectPopupRoot } from "./PopupRoot.vue";

export interface PopupTitleProps extends PrimitiveProps {}

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: "h2",
});

const rootContext = injectPopupRoot();
</script>

<template>
  <Primitive :as="as" :asChild="asChild" :id="rootContext.titleId">
    <slot />
  </Primitive>
</template>
