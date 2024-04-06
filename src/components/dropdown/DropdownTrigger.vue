<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { type Ref } from "vue";

export interface DropdownTriggerProps extends PrimitiveProps {}

const props = withDefaults(defineProps<DropdownTriggerProps>(), {});
</script>

<template>
  <Primitive :as="as" :asChild="asChild">
    <slot />
  </Primitive>
</template>
