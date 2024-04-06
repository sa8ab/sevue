<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { useForwardRef } from "@/composables/useForwardRef";
import { injectDropdownRoot } from "./DropdownRoot.vue";
import { watch } from "vue";
import { type Ref } from "vue";

export interface DropdownTriggerProps extends PrimitiveProps {}

const props = withDefaults(defineProps<DropdownTriggerProps>(), {});

const { forwardRef, currentElement } = useForwardRef();

const dropdownRoot = injectDropdownRoot();

const handleClick = () => {
  if (dropdownRoot.active.value) {
    dropdownRoot.close();
  } else {
    dropdownRoot.open();
  }
};

watch(currentElement, (el) => {
  dropdownRoot.setReference(el);
});
</script>

<template>
  <Primitive :as="as" :asChild="asChild" :ref="forwardRef" @click="handleClick">
    <slot />
  </Primitive>
</template>
