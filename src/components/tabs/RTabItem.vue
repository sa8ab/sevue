<template>
  <Transition @enter="enter" @afterEnter="afterEnter" @beforeLeave="beforeLeave" :name="renderTransitionName">
    <div class="r-tab-item" v-if="active">
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";

export interface Props {
  name: string;
  title?: string;
  disabled?: boolean;
}

const tab = inject("tab") as any;

defineOptions({
  isTabItem: true,
});

const props = defineProps<Props>();

const enter = (el: Element) => {
  const { height } = el.getBoundingClientRect();
  setTimeout(() => {
    tab.setHeight(`${height}px`);
  }, 0);
};
const afterEnter = () => {
  tab.setHeight(`auto`);
};
const beforeLeave = (el: Element) => {
  // because auto to px does not translate
  const { height } = el.getBoundingClientRect();
  tab.setHeight(`${height}px`);
};

const active = computed(() => tab.activeTab.value === props.name);
const renderTransitionName = computed(() => tab.direction.value);
</script>

<style lang="scss"></style>
