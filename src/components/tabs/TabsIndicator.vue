<script setup lang="ts">
import { type PrimitiveProps, Primitive } from "@/components/primitive";
import { injectTabsRootContext } from "./TabsRoot.vue";
import { ref, watch } from "vue";
import { useResizeObserver } from "@vueuse/core";

const props = withDefaults(defineProps<PrimitiveProps>(), {});

const rootContext = injectTabsRootContext();

const indicatorSize = ref<number>(0);
const indicatorIndent = ref<number>(0);

const activeTab = ref<HTMLElement>();

watch(
  () => rootContext.modelValue.value,
  () => {
    updateIndicatorStyle();
  }
);

useResizeObserver([rootContext.tabbar, activeTab], () => {
  updateIndicatorStyle();
});

const updateIndicatorStyle = () => {
  if (!rootContext.tabbar.value) return;

  activeTab.value = rootContext.tabbar.value.querySelector('[role="tab"][data-selected]') as HTMLElement;

  if (!activeTab.value) return;

  indicatorSize.value =
    rootContext.orientation.value === "horizontal" ? activeTab.value.offsetWidth : activeTab.value.offsetHeight;
  indicatorIndent.value =
    rootContext.orientation.value === "horizontal" ? activeTab.value.offsetLeft : activeTab.value.offsetTop;
};
</script>

<template>
  <Primitive
    :asChild="asChild"
    :as="as"
    :style="{
      '--sevue-tab-indicator-size': `${indicatorSize}px`,
      '--sevue-tab-indicator-indent': `${indicatorIndent}px`,
    }"
  >
    <slot />
  </Primitive>
</template>
