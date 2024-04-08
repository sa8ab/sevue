<script lang="ts" setup>
import type { PrimitiveProps } from "@/components/primitive";
import { Primitive } from "@/components/primitive";
import { useForwardRef } from "@/composables/useForwardRef";

export interface LabelProps extends PrimitiveProps {
  for?: string;
}

const props = withDefaults(defineProps<LabelProps>(), {
  as: "label",
});

const { forwardRef } = useForwardRef();
</script>

<template>
  <Primitive v-bind="props" :ref="forwardRef">
    <slot />
  </Primitive>
</template>
