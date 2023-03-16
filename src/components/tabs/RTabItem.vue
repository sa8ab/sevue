<template>
  <Transition
    @enter="enter"
    @afterEnter="afterEnter"
    @beforeLeave="beforeLeave"
    :name="renderTransitionName"
  >
    <div class="r-tab-item" v-if="active">
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";

const tab = inject("tab") as any;
const props = defineProps<{
  title?: string;
  icon?: string;
}>();

const enter = (el: HTMLElement) => {
  const { height } = el.getBoundingClientRect();
  setTimeout(() => {
    tab.setHeight(`${height}px`);
  }, 0);
};
const afterEnter = () => {
  tab.setHeight(`auto`);
};
const beforeLeave = (el: HTMLElement) => {
  // because auto to px does not translate
  const { height } = el.getBoundingClientRect();
  tab.setHeight(`${height}px`);
};

const active = computed(() => tab.activeTab.value === props.title);
const renderTransitionName = computed(() => tab.direction.value);
</script>

<style lang="scss"></style>
