<script setup lang="ts">
import { type PrimitiveProps, Primitive } from "@/components/primitive";
import { RovingFocusItem } from "@/components/roving-focus";
import { useForwardRef } from "@/composables/useForwardRef";

export interface TabsRootProps extends PrimitiveProps {}

// export type TabsRootEmits = {
// };

const props = withDefaults(defineProps<PrimitiveProps>(), {});

// const emit = defineEmits<TabsRootEmits>();

const { forwardRef } = useForwardRef();
</script>

<template>
  <RovingFocusItem asChild>
    <Primitive :asChild="asChild" :as="as" :ref="forwardRef">
      <slot />
    </Primitive>
  </RovingFocusItem>
</template>
