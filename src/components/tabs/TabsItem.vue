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

const props = withDefaults(defineProps<TabsItemProps>(), {
  as: "span",
});

const { forwardRef } = useForwardRef();

const rootContext = injectTabsRootContext();

const isSelected = computed(() => rootContext.modelValue.value === props.value);

const tabindex = computed(() => (isSelected.value ? "0" : "-1"));

const handleClick = () => {
  if (isSelected.value || props.disabled) return;
  rootContext.setModelValue(props.value);
};

const handleFocus = (e: FocusEvent) => {
  if (isSelected.value || props.disabled) return;
  rootContext.setModelValue(props.value);
};

const handleMousedown = (e: MouseEvent) => {
  if (props.disabled) {
    // don't focus when disabled
    e.preventDefault();
  }
};
</script>

<template>
  <RovingFocusItem asChild>
    <Primitive
      :asChild="asChild"
      :as="as"
      :ref="forwardRef"
      :tabindex="tabindex"
      :disabled="disabled"
      :data-disabled="disabled ? '' : undefined"
      :data-selected="isSelected ? '' : undefined"
      role="tab"
      :aria-selected="isSelected ? '' : undefined"
      @click="handleClick"
      @focus="handleFocus"
      @mousedown="handleMousedown"
    >
      <slot :isSelected="isSelected" />
    </Primitive>
  </RovingFocusItem>
</template>
