<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { injectPopupRoot } from "./PopupRoot.vue";

export interface PopupDescriptionProps extends PrimitiveProps {}

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: "p",
});

const rootContext = injectPopupRoot();
</script>

<template>
  <Primitive :as="as" :asChild="asChild" :id="rootContext.descriptionId">
    <slot />
  </Primitive>
</template>
