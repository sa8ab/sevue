<script setup lang="ts">
const props = defineProps<{
  message?: string | boolean | null | number;
}>();
</script>

<template>
  <span class="r-field-message">
    <span class="r-field-message_padding">
      <slot>{{ message }}</slot>
    </span>
  </span>
</template>

<style lang="scss">
.r-field-message {
  display: flex;
  font-size: var(--r-font-small);
  transition: all var(--r-duration);
  color: color(disabled);

  &_padding {
    padding: 2px;
  }
}
</style>
