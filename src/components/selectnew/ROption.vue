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
  cursor: pointer;
  transition: all var(--r-duration);
  border-radius: var(--r-radius);
  &:hover {
    background: color(hover, var(--r-hover-alpha));
  }
}
</style>
