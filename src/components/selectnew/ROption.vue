<script setup lang="ts">
export interface Props {
  value?: string | number | null;
  text?: string | number | null;
  isSelected?: boolean;
  isFocused?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="r-optionnew">
    <slot>{{ text }}</slot>
  </div>
</template>

<style lang="scss">
.r-optionnew {
  padding: var(--r-normal-padding-y);
}
</style>
