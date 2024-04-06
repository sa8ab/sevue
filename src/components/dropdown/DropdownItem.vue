<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { useForwardRef } from "@/composables/useForwardRef";
import { injectDropdownRoot } from "./DropdownRoot.vue";
import { watch } from "vue";
import { type Ref } from "vue";

export interface DropdownItemProps extends PrimitiveProps {}

const props = withDefaults(defineProps<DropdownItemProps>(), {});

const { forwardRef } = useForwardRef();

const dropdownRoot = injectDropdownRoot();

const handleClick = () => {};
</script>

<template>
  <Primitive :as="as" :asChild="asChild" :ref="forwardRef" @click="handleClick">
    <slot />
  </Primitive>
</template>
