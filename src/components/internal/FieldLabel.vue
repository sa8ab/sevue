<script setup lang="ts">
const props = defineProps<{
  label?: string | null | number;
  error?: boolean | null;
  focused?: boolean | null;
}>();
</script>

<template>
  <span :class="['r-field-label', { 'r-field-label_error': error, 'r-field-label_focused': focused }]">
    <slot>{{ label }}</slot>
  </span>
</template>

<style lang="scss">
.r-field-label {
  display: flex;
  font-size: var(--r-font-small);
  transition: color var(--r-duration);
  padding: 2px;
  &_focused {
    color: color();
  }
  &_error {
    color: color(red);
  }
}
</style>
