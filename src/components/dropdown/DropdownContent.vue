<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { injectDropdownRoot } from "./DropdownRoot.vue";
import { ref, computed, watch, nextTick } from "vue";
import { useFloating, offset, flip, shift, size, autoUpdate } from "@floating-ui/vue";
import { useForwardRef } from "@/composables/useForwardRef";
import { useFocusTrap } from "@/composables/useFocusTrap";
import { useId } from "@/composables/useId";

export interface DropdownContentProps extends PrimitiveProps {}

const props = withDefaults(defineProps<DropdownContentProps>(), {});

const dropdownRoot = injectDropdownRoot();

const { forwardRef, currentElement } = useForwardRef();

const handleFocusout = (e: FocusEvent) => {
  const relatedTarget = e.relatedTarget as HTMLElement | null;

  const isInContent = currentElement.value.contains(relatedTarget);

  const isTrigger = dropdownRoot.reference.value?.contains(relatedTarget);

  if (isInContent || isTrigger) return;

  dropdownRoot.close();
};

const handleKeydown = (e: KeyboardEvent) => {
  const code = e.code;

  if (e.defaultPrevented) return;

  if (code === "Escape") {
    e.preventDefault();
    dropdownRoot.close();
  }
};

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

const { deactivate, activate } = useFocusTrap(currentElement, {
  clickOutsideDeactivates: false,
  escapeDeactivates: false,
  allowOutsideClick: true,
  immediate: false,
  fallbackFocus: () => currentElement.value,
});

const id = computed(() => dropdownRoot.contentId.value);
const triggerId = computed(() => dropdownRoot.triggerId.value);

dropdownRoot.contentId.value = useId(undefined, "sevue-dropdown-content");

watch(
  () => dropdownRoot.active.value,
  async (active) => {
    await nextTick();

    if (active) activate();
    else deactivate();
  },
  { immediate: true }
);
</script>

<template>
  <Primitive
    :as="as"
    :asChild="asChild"
    :ref="forwardRef"
    tabindex="-1"
    :style="{
      ...floatingStyles,
    }"
    :id="id"
    :aria-labelledby="triggerId"
    @focusout="handleFocusout"
    @keydown="handleKeydown"
  >
    <slot />
  </Primitive>
</template>
