<script setup lang="ts">
import { TabsItem, type TabsItemProps } from "./index";

export interface RTabItemProps extends TabsItemProps {}

const props = defineProps<RTabItemProps>();
</script>

<template>
  <TabsItem :class="['r-tab-item', { 'r-tab-item-disabled': disabled }]" v-bind="props" v-slot="{ isSelected }">
    <slot :isSelected="isSelected"></slot>
  </TabsItem>
</template>

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

  &-disabled {
    color: color(disabled);
    pointer-events: none;
  }

  &:hover {
    color: color();
  }

  &[data-selected] {
    color: color();
  }
}
</style>
