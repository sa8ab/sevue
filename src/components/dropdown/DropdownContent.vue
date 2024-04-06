<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { injectDropdownRoot } from "./DropdownRoot.vue";
import { ref, computed } from "vue";
import { useFloating, offset, flip, shift, size, autoUpdate } from "@floating-ui/vue";
import { useForwardRef } from "@/composables/useForwardRef";

export interface DropdownContentProps extends PrimitiveProps {}

const props = withDefaults(defineProps<DropdownContentProps>(), {});

const dropdownRoot = injectDropdownRoot();

const { forwardRef, currentElement } = useForwardRef();

const middleware = computed(() => [
  offset(4),
  flip({
    crossAxis: false,
  }),
  shift(),
  size({
    apply: ({ availableHeight, availableWidth, elements }) => {
      Object.assign(elements.floating.style, { maxWidth: `${availableWidth}px`, maxHeight: `${availableHeight}px` });
    },
  }),
]);
const { floatingStyles, isPositioned } = useFloating(dropdownRoot.reference, currentElement, {
  placement: "bottom",
  whileElementsMounted: autoUpdate,
  open: dropdownRoot.active,
  middleware,
});
</script>

<template>
  <Primitive
    :as="as"
    :asChild="asChild"
    :ref="forwardRef"
    :style="{
      ...floatingStyles,
      background: '#034242',
    }"
  >
    <slot />
  </Primitive>
</template>
