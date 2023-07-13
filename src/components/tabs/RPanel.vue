<script setup lang="ts">
import { computed, reactive, provide, watch } from "vue";
import getRelatedChildren from "@/utils/getRelatedChildren";
import useDynamicSlots from "@/composables/useDynamicSlots";
import type { Props as Panel } from "./RPanelItem.vue";
import { panelKey } from "@/injectionKeys";
import { toRef } from "vue";

interface Props {
  modelValue: string | number;
}

interface State {
  height: string;
  direction: "forward" | "backward";
}

const props = defineProps<Props>();

const state = reactive<State>({
  height: "auto",
  direction: "forward",
});

const movePanel = async (tab: Props["modelValue"], prev: Props["modelValue"]) => {
  if (!panels.value.length) return;
  const oldTabIndex = panels.value.findIndex(({ value }) => prev === value);
  const newTabIndex = panels.value.findIndex(({ value }) => tab === value);

  if (oldTabIndex < newTabIndex) state.direction = "forward";
  else state.direction = "backward";
};

const panels = computed<Panel[]>(() => children.value.map(({ props }) => props as Panel));

const setHeight = (height: string) => {
  state.height = height;
};

const defaultSlot = useDynamicSlots();
const children = computed(() => {
  return getRelatedChildren(defaultSlot.value, "isPanelItem");
});

watch(
  () => props.modelValue,
  (current, prev) => movePanel(current, prev)
);

provide(panelKey, {
  activeTab: toRef(props, "modelValue"),
  setHeight,
  direction: toRef(state, "direction"),
});
</script>

<template>
  <div class="r-panel" :style="{ height: state.height }">
    <slot />
  </div>
</template>

<style lang="scss">
.r-panel {
  overflow: hidden;
  position: relative;
  transition: all var(--r-duration);
}
.forward {
  &-enter-from {
    left: 100%;
  }

  &-enter-to {
    left: 0;
  }

  &-leave-from {
    left: 0;
  }

  &-leave-to {
    left: -100%;
  }

  &-enter-active,
  &-leave-active {
    position: absolute;
    width: 100%;
    transition: all var(--r-duration);
  }
}

.backward {
  &-enter-from {
    left: -100%;
  }

  &-enter-to {
    left: 0;
  }

  &-leave-from {
    left: 0;
  }

  &-leave-to {
    left: 100%;
  }

  &-enter-active,
  &-leave-active {
    position: absolute;
    width: 100%;
    transition: all var(--r-duration);
  }
}
</style>
