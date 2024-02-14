<script setup lang="ts">
const props = defineProps<{
  label?: string | null | number;
}>();
</script>

<template>
  <label :class="['r-field-label']">
    <slot>{{ label }}</slot>
  </label>
</template>

<style lang="scss">
.r-field-label {
  display: flex;
  font-size: var(--r-font-small);
  transition: color var(--r-duration);
  padding-bottom: 4px;
}
</style>
