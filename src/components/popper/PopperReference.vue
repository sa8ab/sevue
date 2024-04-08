<script lang="ts"></script>

<script setup lang="ts">
import { watch } from "vue";
import { injectPopperRootContext, type Measurable } from "./PopperRoot.vue";
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { useForwardRef } from "@/composables/useForwardRef";

export interface PopperReferenceProps extends PrimitiveProps {}

const props = defineProps<PrimitiveProps>();

const { forwardRef, currentElement } = useForwardRef();

const rootContext = injectPopperRootContext();

watch(currentElement, () => {
  rootContext.setReference(currentElement.value);
});
</script>

<template>
  <Primitive :ref="forwardRef" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
