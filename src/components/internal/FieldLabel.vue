<script setup lang="ts">
const props = defineProps<{
  label?: string | null | number;
  hint?: string | null | number;
  labelFor?: string;
}>();
</script>

<template>
  <div class="r-field-label">
    <label class="r-field-label-label" :for="labelFor" v-if="label || $slots.default">
      <slot>{{ label }}</slot>
    </label>
    <span class="r-field-label-hint" v-if="hint || $slots.hint">
      <slot name="hint">{{ hint }}</slot>
    </span>
  </div>
</template>

<style lang="scss">
.r-field-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--r-font-small);
  padding-bottom: 4px;
  &-label {
  }
  &-hint {
    color: color(disabled);
  }
}
</style>
