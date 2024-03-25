<script lang="ts" setup>
import type { PrimitiveProps } from "@/components/primitive";
import { Primitive } from "@/components/primitive";
// import { useForwardExpose } from "@/composables/useForwardExpose";
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
  <div>
    <Primitive v-bind="props" :ref="forwardRef">
      <slot />
    </Primitive>
  </div>
</template>
