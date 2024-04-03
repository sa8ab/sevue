<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { injectPopupRoot } from "./PopupRoot.vue";
import { computed } from "vue";

export interface PopupDescriptionProps extends PrimitiveProps {}

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: "p",
});

const rootContext = injectPopupRoot();

const id = computed(() => rootContext.descriptionId.value);
</script>

<template>
  <Primitive :as="as" :asChild="asChild" :id="id">
    <slot />
  </Primitive>
</template>
