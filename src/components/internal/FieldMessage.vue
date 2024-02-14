<script setup lang="ts">
const props = defineProps<{
  message?: string | boolean | null | number;
  error?: boolean;
}>();
</script>

<template>
  <div :class="['r-field-message', { 'r-field-message_error': error }]">
    <div class="r-field-message_padding">
      <slot>{{ message }}</slot>
    </div>
  </div>
</template>

<style lang="scss">
.r-field-message {
  display: flex;
  font-size: var(--r-font-small);
  transition: all var(--r-duration);
  color: color(disabled);

  &_padding {
    padding-top: 4px;
  }

  &_error {
    color: color(red);
  }
}
</style>
