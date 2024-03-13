<template>
  <div :class="['r-tab-item', { 'r-tab-item-active': active, disabled }]" :tabindex="tabindex" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, ref, watch, onMounted } from "vue";

export interface Props {
  value: string | number;
  disabled?: boolean;
  active?: boolean;
}

defineOptions({
  isTabItem: true,
});

const props = defineProps<Props>();
const emit = defineEmits<{
  setValue: [];
}>();

const handleClick = () => {
  if (props.active) return;
  if (props.disabled) return;
  emit("setValue");
};

const tabindex = computed(() => (props.active ? "0" : "-1"));
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
