<script setup lang="ts">
import { reactive } from "vue";

interface Props {}

interface State {
  height: string;
}

const props = defineProps<Props>();

const state = reactive<State>({
  height: "auto",
});

// const moveTab = async (tab: string, prev: string) => {
//   if (!tabs.value.length) return;
//   const oldTabIndex = tabs.value.findIndex(({ value }) => prev === value);
//   const newTabIndex = tabs.value.findIndex(({ value }) => tab === value);

//   if (oldTabIndex < newTabIndex) state.direction = "forward";
//   else state.direction = "backward";
//   emit("tabChange", { name: tab });
// };

const setHeight = (height: string) => {
  state.height = height;
};
</script>

<template>
  <div class="r-panel" :style="{ height: state.height }">
    <slot />
  </div>
</template>
