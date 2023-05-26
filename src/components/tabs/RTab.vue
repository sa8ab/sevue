<template>
  <div :class="['r-tab', { fit, bordered, scrollable, moverFull }]" :style="{ '--r-color': color || 'var(--r-prm)' }">
    <!-- tabbar -->
    <div class="tabbar" ref="tabbar">
      <div
        v-for="{ title, name, disabled } in tabs"
        :class="['r-tab-button', { tabactive: state.activeTab === name, disabled }]"
        ref="tabBarItems"
        @click="setActiveTab(name)"
        v-ripple
      >
        <slot :name="`icon-${name}`"></slot>
        <slot :name="`content-${name}`">
          {{ title }}
        </slot>
      </div>
      <div class="mover" :style="{ width: state.moverWidth, left: state.moverLeft }"></div>
    </div>
    <!-- tabs -->
    <div class="tabs-container" :style="{ height: state.height }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import useColor from "@/composables/useColor";
import useDynamicSlots from "@/composables/useDynamicSlots";
import { nextTick, onMounted, reactive, ref, toRef, computed, useSlots, watch, type VNode, provide } from "vue";
import type { Props as Tab } from "./RTabItem.vue";
import getRelatedChildren from "@/utils/getRelatedChildren";

export interface Props {
  fit?: boolean;
  bordered?: boolean;
  scrollable?: boolean;
  moverFull?: boolean;
  color?: string;
  initialActiveTab?: number;
}

type State = {
  activeTab: string;
  height: string | number;
  direction: "forward" | "backward";
  moverWidth: string;
  moverLeft: string;
};

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(["tabChange"]);
const color = useColor(toRef(props, "color"));

const defaultSlot = useDynamicSlots();

const state = reactive<State>({
  activeTab: "",
  height: "auto",
  direction: "forward",
  moverWidth: "0",
  moverLeft: "0",
});
const tabBarItems = ref<HTMLElement[]>([]);
const tabbar = ref();

onMounted(() => {
  setActiveTab(tabs.value[props.initialActiveTab ?? 0]?.name);
});

const tabs = computed<Tab[]>(() => children.value.map(({ props }) => <Tab>props));

const setActiveTab = async (tab: string) => {
  if (!tabs.value.length) return;
  const oldTabIndex = tabs.value.findIndex(({ name }) => state.activeTab === name);
  const newTabIndex = tabs.value.findIndex(({ name }) => tab === name);

  if (oldTabIndex < newTabIndex) state.direction = "forward";
  else state.direction = "backward";
  setMoverStyle({ index: newTabIndex });
  await nextTick();
  state.activeTab = tab;
  emit("tabChange", { name: tab });
};

const setMoverStyle = async ({ index }: { index: number }) => {
  const el = tabBarItems.value[index];
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const { width } = el?.getBoundingClientRect();

      const newTabBarItemOffset = el.offsetLeft;

      state.moverWidth = `${width}px`;
      state.moverLeft = `${newTabBarItemOffset}px`;
      if (props.scrollable) {
        //   TODO: fix for rtl version
        tabbar.value.scrollTo({
          left: newTabBarItemOffset - 80,
          behavior: "smooth",
        });
      }
    });
  });
};

const children = computed(() => {
  return getRelatedChildren(defaultSlot.value, "isTabItem");
});

const setHeight = (height: number | string) => {
  state.height = height;
};

provide("tab", {
  setHeight,
  activeTab: toRef(state, "activeTab"),
  direction: toRef(state, "direction"),
});

defineExpose({
  setActiveTab,
});
// provide() {
//   return {
//     tab: this,
//   };
// }
</script>

<style lang="scss">
.r-tab {
  min-width: 100%;
  --r-duration: calc(var(var(--r-duration)) * 1.2);
  .tabbar {
    display: flex;
    position: relative;
    overflow: hidden;
  }

  .r-tab-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--r-normal-padding);
    transition: background var(--r-duration);
    cursor: pointer;
    user-select: none;

    &.disabled {
      color: color(disabled);
      pointer-events: none;
    }

    &:hover {
      background: color(hover, var(--hover-alpha));
    }

    &.tabactive {
      color: color();
      background: color(color, var(--light-alpha));
    }
  }

  .mover {
    position: absolute;
    bottom: 0;
    height: 2px;
    border-radius: 2px;
    background: color(color);
    transition: width var(--r-duration), left var(--r-duration);
  }

  .tabs-container {
    border-radius: var(--r-radius);
    overflow: hidden;
    position: relative;
    transition: all var(--r-duration);
  }

  &.fit {
    .r-tab-button {
      flex: 1;
    }
  }

  &.bordered {
    overflow: hidden;
    border-radius: var(--r-radius);
    box-shadow: var(--border);

    .tabbar {
      border-bottom: 1px solid color(border-color, var(--border-alpha));
    }
  }

  &.scrollable {
    .tabbar {
      overflow-x: auto;
      white-space: nowrap;
      @extend .scroll-bar;
    }
  }

  &.moverFull {
    .mover {
      height: 100%;
      z-index: 0;
    }

    .r-tab-button {
      position: relative !important;
      z-index: 2;

      &.tabactive {
        transition-delay: calc(var(--r-duration) / 2);
        color: white;
        background: transparent;
      }
    }
  }
}

.r-tab-item {
  padding: var(--r-space-2);
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
