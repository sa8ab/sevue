<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { RovingFocusItem } from "@/components/roving-focus";
import { useForwardRef } from "@/composables/useForwardRef";
import { injectDropdownRoot } from "./DropdownRoot.vue";
import { injectDropdownContent } from "./DropdownContent.vue";
import { ref } from "vue";

export interface DropdownItemProps extends PrimitiveProps {
  disabled?: boolean;
}

const props = withDefaults(defineProps<DropdownItemProps>(), {});

const { forwardRef, currentElement } = useForwardRef();

const contentContext = injectDropdownContent();
const rootContext = injectDropdownRoot();

const isFocused = ref();

const handleClick = (e: Event) => {
  if (props.disabled || e.defaultPrevented || rootContext.closeOnClick.value) return;
  rootContext.close();
};

const handlePointerEnter = (e: PointerEvent) => {
  if (e.defaultPrevented) return;

  if (props.disabled) {
    contentContext.focusContent();
    return;
  }

  currentElement.value.focus({ preventScroll: true });
};

const handlePointerLeave = (e: PointerEvent) => {
  if (e.defaultPrevented) return;
  contentContext.focusContent();
};
</script>

<template>
  <RovingFocusItem asChild>
    <Primitive
      :as="as"
      :asChild="asChild"
      :ref="forwardRef"
      :aria-disabled="disabled ? '' : undefined"
      :data-disabled="disabled ? '' : undefined"
      :disabled="disabled"
      tabindex="-1"
      @click="handleClick"
      @pointerenter="handlePointerEnter"
      @pointerleave="handlePointerLeave"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <slot :focused="isFocused" />
    </Primitive>
  </RovingFocusItem>
</template>
