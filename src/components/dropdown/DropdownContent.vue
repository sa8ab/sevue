<script lang="ts">
export const [injectDropdownContent, provideDropdownContent] = useContext<DropdownContentContext>("DropdownContent");
</script>

<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { RovingFocusRoot } from "@/components/roving-focus";
import { injectDropdownRoot } from "./DropdownRoot.vue";
import { ref, computed, watch, nextTick } from "vue";
import { useFloating, offset, flip, shift, size, autoUpdate } from "@floating-ui/vue";
import { useForwardRef } from "@/composables/useForwardRef";
import { useFocusTrap } from "@/composables/useFocusTrap";
import { useId } from "@/composables/useId";
import { useContext } from "@/composables/useContext";
import { useCollection } from "@/composables/useCollection";

export interface DropdownContentProps extends PrimitiveProps {}

export interface DropdownContentContext {
  focusContent: (options?: FocusOptions) => void;
}

const props = withDefaults(defineProps<PrimitiveProps>(), {});

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

const handleKeydown = (e: KeyboardEvent) => {
  if (e.defaultPrevented) return;

  const code = e.code;

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

const { floatingStyles, isPositioned } = useFloating(dropdownRoot.reference, floatingRef, {
  placement: "bottom",
  whileElementsMounted: autoUpdate,
  open: dropdownRoot.active,
  middleware,
});

const { deactivate, activate } = useFocusTrap(currentElement, {
  clickOutsideDeactivates: false,
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
  <RovingFocusRoot asChild>
    <div
      data-sevue-floating-content
      ref="floatingRef"
      :style="{
        ...floatingStyles,
      }"
    >
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
    </div>
  </RovingFocusRoot>
</template>
