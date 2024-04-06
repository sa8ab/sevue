<template>
  <TabsItem :class="['r-tab-item', { 'r-tab-item-active': active, disabled }]" :value="value" :disabled="disabled">
    <slot></slot>
  </TabsItem>
</template>

<script setup lang="ts">
import { TabsItem, type TabsItemProps } from "./index";

export interface Props extends TabsItemProps {
  active?: boolean;
}

const props = defineProps<Props>();
</script>

<style lang="scss">
.r-tab-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--r-normal-padding);
  transition: color var(--r-duration), box-shadow var(--r-duration);
  border-radius: var(--radius);
  cursor: pointer;
  user-select: none;

  &:focus-visible {
    box-shadow: var(--r-focused-box-shadow-specs) color();
  }

  &.disabled {
    color: color(disabled);
    pointer-events: none;
  }

  &:hover {
    color: color();
  }

  &-active {
    color: color();
  }
}
</style>
