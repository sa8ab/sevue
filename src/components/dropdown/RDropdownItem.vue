<script setup lang="ts">
import { useEmitsAsProps } from "@/composables/useEmitsAsProps";
import { DropdownItem, type DropdownItemProps } from "./index";

export interface RDropdownItemProps extends DropdownItemProps {}

const props = defineProps<RDropdownItemProps>();
</script>

<template>
  <DropdownItem :class="['r-dropdown-item', { 'r-dropdown-item_disabled': disabled }]" v-bind="props">
    <template #default="{ focused }">
      <slot :focused="focused"></slot>
    </template>
  </DropdownItem>
</template>

<style lang="scss">
.r-dropdown-item {
  padding: var(--r-normal-padding-y);
  cursor: pointer;
  transition: all var(--r-duration);
  border-radius: var(--r-radius);
  font-size: var(--r-font-small);
  min-width: 160px;
  &:focus {
    background: color(hover, var(--r-hover-alpha));
  }
  &_disabled {
    pointer-events: none;
    opacity: 0.7;
  }
}
</style>
