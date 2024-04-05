<script setup lang="ts">
import { type PrimitiveProps, Primitive } from "@/components/primitive";
import { RovingFocusItem } from "@/components/roving-focus";
import { useForwardRef } from "@/composables/useForwardRef";
import { injectTabsRootContext } from "./TabsRoot.vue";
import { computed } from "vue";

export interface TabsItemProps extends PrimitiveProps {
  value: string | number;
  disabled?: boolean;
}

// export type TabsRootEmits = {
// };

const props = withDefaults(defineProps<TabsItemProps>(), {});

// const emit = defineEmits<TabsRootEmits>();

const { forwardRef } = useForwardRef();

const rootContext = injectTabsRootContext();

const isSelected = computed(() => rootContext.modelValue.value === props.value);

const tabindex = computed(() => (isSelected.value ? "0" : "-1"));
</script>

<template>
  <RovingFocusItem asChild>
    <Primitive
      :asChild="asChild"
      :as="as"
      :ref="forwardRef"
      :tabindex="tabindex"
      :disabled="disabled"
      :data-disabled="disabled"
    >
      <slot />
    </Primitive>
  </RovingFocusItem>
</template>
