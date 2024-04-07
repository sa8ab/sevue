<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { RovingFocusItem } from "@/components/roving-focus";
import { useForwardRef } from "@/composables/useForwardRef";
import { injectDropdownRoot } from "./DropdownRoot.vue";
import { injectDropdownContent } from "./DropdownContent.vue";
import { watch } from "vue";
import { type Ref } from "vue";

export interface DropdownItemProps extends PrimitiveProps {
  disabled?: boolean;
}

const props = withDefaults(defineProps<DropdownItemProps>(), {});

const { forwardRef, currentElement } = useForwardRef();

const rootContext = injectDropdownRoot();
const contentContext = injectDropdownContent();

const handleClick = (e: Event) => {
  if (props.disabled || e.defaultPrevented) return;
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
      @click="handleClick"
      :aria-disabled="disabled ? '' : undefined"
      :data-disabled="disabled ? '' : undefined"
      :tabindex="disabled ? '-1' : '0'"
      @pointerenter="handlePointerEnter"
      @pointerleave="handlePointerLeave"
    >
      <slot />
    </Primitive>
  </RovingFocusItem>
</template>
