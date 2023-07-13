<template>
  <Transition @enter="enter" @afterEnter="afterEnter" @beforeLeave="beforeLeave" :name="panel.direction.value">
    <div class="r-panel-item" v-if="active">
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { panelKey } from "@/injectionKeys";
import type { PanelInject } from "@/types";
import { inject, computed } from "vue";

export interface Props {
  value: string | number;
}

defineOptions({
  isPanelItem: true,
});

const panel = inject(panelKey) as PanelInject;

const props = defineProps<Props>();

const enter = (el: Element) => {
  const { height } = el.getBoundingClientRect();
  setTimeout(() => {
    panel.setHeight(`${height}px`);
  }, 0);
};
const afterEnter = () => {
  panel.setHeight(`auto`);
};
const beforeLeave = (el: Element) => {
  const { height } = el.getBoundingClientRect();
  panel.setHeight(`${height}px`);
};

const active = computed(() => panel.activeTab.value === props.value);
// const renderTransitionName = computed(() => panel.direction.value);
</script>

<style lang="scss"></style>
