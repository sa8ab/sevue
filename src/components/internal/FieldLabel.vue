<script setup lang="ts">
const props = defineProps<{
  label?: string | null | number;
  focused?: boolean | null;
}>();
</script>

<template>
  <label :class="['r-field-label', { 'r-field-label_focused': focused }]">
    <slot>{{ label }}</slot>
  </label>
</template>

<style lang="scss">
.r-field-label {
  display: flex;
  font-size: var(--r-font-small);
  transition: color var(--r-duration);
  padding-bottom: 4px;
  &_focused {
    color: color();
  }
}
</style>
