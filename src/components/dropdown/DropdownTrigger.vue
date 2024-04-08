<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { useForwardRef } from "@/composables/useForwardRef";
import { injectDropdownRoot } from "./DropdownRoot.vue";
import { watch, computed } from "vue";
import { useId } from "@/composables/useId";

export interface DropdownTriggerProps extends PrimitiveProps {}

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: "button",
});

const { forwardRef, currentElement } = useForwardRef();

const dropdownRoot = injectDropdownRoot();

const handleClick = () => {
  if (dropdownRoot.active.value) {
    dropdownRoot.close();
  } else {
    dropdownRoot.open();
  }
};

const id = computed(() => dropdownRoot.triggerId.value);
const contentId = computed(() => dropdownRoot.contentId.value);

dropdownRoot.triggerId.value = useId(undefined, "sevue-dropdown-trigger");

watch(currentElement, (el) => {
  dropdownRoot.setReference(el);
});
</script>

<template>
  <Primitive
    :as="as"
    :asChild="asChild"
    :ref="forwardRef"
    :id="id"
    :aria-controls="dropdownRoot.active.value ? contentId : undefined"
    aria-haspopup="menu"
    :aria-expanded="dropdownRoot.active.value"
    @click="handleClick"
  >
    <slot />
  </Primitive>
</template>
