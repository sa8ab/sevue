<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "@/components/primitive";

export interface PopupOverlayProps extends PrimitiveProps {}

const props = defineProps<PopupOverlayProps>();
</script>

<template>
  <Primitive :as="as" :asChild="asChild">
    <slot />
  </Primitive>
</template>
