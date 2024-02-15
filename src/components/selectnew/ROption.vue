<script setup lang="ts">
import { toRef } from "vue";
import useColor from "@/composables/useColor";

export interface Props {
  value?: string | number | null;
  text?: string | number | null;
  isSelected?: boolean;
  isFocused?: boolean;
  color?: string;
}

const props = defineProps<Props>();

const { color } = useColor(toRef(props, "color"));
</script>

<template>
  <div
    :class="['r-optionnew', { 'r-optionnew_selected': isSelected, 'r-optionnew_focused': isFocused }]"
    :style="{ '--r-color': color || 'var(--r-prm)' }"
    @click="$emit('click')"
  >
    <slot>{{ text }}</slot>
  </div>
</template>

<style lang="scss">
.r-optionnew {
  padding: var(--r-normal-padding-y);
  cursor: pointer;
  transition: all var(--r-duration);
  border-radius: var(--r-radius);

  &_selected {
    color: color();
    background: color(color, var(--r-light-alpha));
  }

  &_focused {
    background: color(hover, var(--r-hover-alpha));
  }
}
</style>
