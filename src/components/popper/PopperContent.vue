<script lang="ts"></script>

<script setup lang="ts">
import { watch } from "vue";
import { injectPopperRootContext } from "./PopperRoot.vue";
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { useForwardRef } from "@/composables/useForwardRef";
import { useFloating } from "@floating-ui/vue";

export interface PopperContentProps extends PrimitiveProps {}

const props = defineProps<PrimitiveProps>();

const { forwardRef } = useForwardRef();

const rootContext = injectPopperRootContext();
</script>

<template>
  <Primitive :ref="forwardRef" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
