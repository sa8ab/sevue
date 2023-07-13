<template>
  <div :class="['r-tab-item', { 'r-tab-item-active': active, disabled }]" @click="onClick" ref="elementRef" v-ripple>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { tabKey } from "@/injectionKeys";
import type { TabInject } from "@/types";
import { inject, computed, ref, watch, onMounted } from "vue";

export interface Props {
  value: string;
  title?: string;
  disabled?: boolean;
}

const tab = inject(tabKey) as TabInject;

defineOptions({
  isTabItem: true,
});

const props = defineProps<Props>();

const elementRef = ref<HTMLElement | undefined>();

const onClick = () => {
  tab.onItemClick(props);
};

const active = computed(() => tab.activeTab.value === props.value);

const setStyle = () => {
  if (!active.value) return;
  tab.setMoverStyle(elementRef.value!);
};

onMounted(() => setStyle());

watch(tab.activeTab, () => {
  setStyle();
});
</script>

<style lang="scss">
.r-tab-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--r-normal-padding);
  transition: background var(--r-duration);
  border-radius: var(--radius);
  cursor: pointer;
  user-select: none;

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
    // background: color(color, var(--light-alpha));
  }
}
</style>
