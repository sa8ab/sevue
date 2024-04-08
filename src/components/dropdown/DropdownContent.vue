<script lang="ts">
export const [injectDropdownContent, provideDropdownContent] = useContext<DropdownContentContext>("DropdownContent");
</script>

<script setup lang="ts">
import { ref, computed, watch, nextTick, toRef } from "vue";
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { RovingFocusRoot } from "@/components/roving-focus";
import { injectDropdownRoot } from "./DropdownRoot.vue";
import { useFloating, type Options as FloatingOptions } from "@/composables/useFloating";
import { useForwardRef } from "@/composables/useForwardRef";
import { useFocusTrap } from "@/composables/useFocusTrap";
import { useId } from "@/composables/useId";
import { useContext } from "@/composables/useContext";
import { onClickOutside } from "@vueuse/core";

export interface DropdownContentProps extends PrimitiveProps, FloatingOptions {}

export interface DropdownContentContext {
  focusContent: (options?: FocusOptions) => void;
}

const props = withDefaults(defineProps<PrimitiveProps & FloatingOptions>(), {});

defineOptions({
  inheritAttrs: false,
});

const dropdownRoot = injectDropdownRoot();

const { forwardRef, currentElement } = useForwardRef();

const floatingRef = ref<HTMLDivElement>();

const handleFocusout = (e: FocusEvent) => {
  const relatedTarget = e.relatedTarget as HTMLElement | null;

  const isInContent = currentElement.value.contains(relatedTarget);

  const isTrigger = dropdownRoot.reference.value?.contains(relatedTarget);

  if (isInContent || isTrigger) return;

  dropdownRoot.close();
};

// Might face issue when showing the content using v-show
onClickOutside(
  currentElement,
  () => {
    dropdownRoot.close();
  },
  {
    ignore: [dropdownRoot.reference],
  }
);

const handleKeydown = (e: KeyboardEvent) => {
  if (e.defaultPrevented) return;

  const code = e.code;

  if (code === "Escape") {
    e.preventDefault();
    dropdownRoot.close();
    nextTick(() => dropdownRoot.reference.value?.focus({}));
  }
};

const { floatingStyles, isPositioned } = useFloating(
  dropdownRoot.reference,
  floatingRef,
  computed(() => ({
    open: dropdownRoot.active,
    boundry: props.boundry,
    rootBoundry: props.rootBoundry,
    offset: props.offset,
    placement: props.placement,
  }))
);

const { deactivate, activate } = useFocusTrap(currentElement, {
  clickOutsideDeactivates: true,
  escapeDeactivates: false,
  allowOutsideClick: true,
  returnFocusOnDeactivate: false,
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

provideDropdownContent({
  focusContent: (options) => {
    currentElement.value.focus(options);
  },
});
</script>

<template>
  <div
    data-sevue-floating-content
    ref="floatingRef"
    :style="{
      ...floatingStyles,
      'z-index': '10',
    }"
  >
    <RovingFocusRoot asChild>
      <Primitive
        :as="as"
        :asChild="asChild"
        :ref="forwardRef"
        v-bind="$attrs"
        tabindex="-1"
        :id="id"
        :aria-labelledby="triggerId"
        @focusout="handleFocusout"
        @keydown="handleKeydown"
      >
        <slot />
      </Primitive>
    </RovingFocusRoot>
  </div>
</template>
