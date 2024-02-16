<script setup lang="ts">
export interface Props {
  title?: string | number | null;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="r-selectnew-group">
    <slot name="title">
      <div class="r-selectnew-group-title">{{ title }}</div>
    </slot>
    <div class="r-selectnew-options-list r-selectnew-group-options-list">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.r-selectnew-group {
  &-title {
    padding: 4px;
    color: color(disabled);
    font-size: var(--r-font-small);
  }
}
</style>
