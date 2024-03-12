<template>
  <div :class="['r-tab-item', { 'r-tab-item-active': active, disabled }]" ref="elementRef" :tabindex="tabindex">
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
  setMoverStyle: [HTMLElement | undefined];
}>();

const elementRef = ref<HTMLElement | undefined>();

const tabindex = computed(() => (props.active ? "0" : "-1"));

const tryUpdateMover = () => {
  if (props.active) emit("setMoverStyle", elementRef.value);
};

onMounted(() => tryUpdateMover());

watch(
  () => props.active,
  () => {
    tryUpdateMover();
  }
);
</script>

<style lang="scss">
.r-tab-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--r-normal-padding);
  transition: background var(--r-duration), box-shadow var(--r-duration);
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
    background: color(hover, var(--r-hover-alpha));
  }

  &-active {
    color: color();
    pointer-events: none;
    // background: color(color, var(--r-light-alpha));
  }
}
</style>
