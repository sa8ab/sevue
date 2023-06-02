<template>
  <div
    :class="['r-tab', { fit, bordered, scrollable, moverFull, segmented }]"
    :style="{ '--r-color': color || 'var(--r-prm)', '--r-active-text': activeTextColor }"
  >
    <!-- tabbar -->
    <div class="r-tabbar-container" ref="tabbarContainer">
      <div class="r-tabbar" ref="tabbar">
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
import { nextTick, onMounted, reactive, ref, toRef, computed, provide, onBeforeUnmount } from "vue";
import type { Props as Tab } from "./RTabItem.vue";
import getRelatedChildren from "@/utils/getRelatedChildren";

export interface Props {
  fit?: boolean;
  bordered?: boolean;
  scrollable?: boolean;
  moverFull?: boolean;
  color?: string;
  activeTextColor?: string;
  segmented?: boolean;
  initialActiveTab?: number;
}

type State = {
  activeTab: string;
  height: string | number;
  direction: "forward" | "backward";
  moverWidth: string;
  moverLeft: string;
  // moverTop: string,
  observerInstance?: ResizeObserver;
};

const props = withDefaults(defineProps<Props>(), {
  activeTextColor: "#fff",
});
const emit = defineEmits(["tabChange"]);
const color = useColor(toRef(props, "color"));
const activeTextColor = useColor(toRef(props, "activeTextColor"));

const defaultSlot = useDynamicSlots();

const state = reactive<State>({
  activeTab: "",
  height: "auto",
  direction: "forward",
  moverWidth: "0",
  moverLeft: "0",
  // moverTop: "0",
  observerInstance: undefined,
});
const tabBarItems = ref<HTMLElement[]>([]);
const tabbarContainer = ref();
const tabbar = ref<Element>();

onMounted(async () => {
  await setActiveTab(tabs.value[props.initialActiveTab ?? 0]?.name);
  runObserver();
});

onBeforeUnmount(() => {
  state.observerInstance?.disconnect();
});

const tabs = computed<Tab[]>(() => children.value.map(({ props }) => <Tab>props));
const activeTabIndex = computed(() => tabs.value.findIndex(({ name }) => state.activeTab === name));

const runObserver = () => {
  state.observerInstance = new ResizeObserver(() => {
    console.log("size changed");
    setMoverStyle(activeTabIndex.value);
  });

  state.observerInstance.observe(tabbar.value!);
};

const setActiveTab = async (tab: string) => {
  if (!tabs.value.length) return;
  const oldTabIndex = tabs.value.findIndex(({ name }) => state.activeTab === name);
  const newTabIndex = tabs.value.findIndex(({ name }) => tab === name);

  if (oldTabIndex < newTabIndex) state.direction = "forward";
  else state.direction = "backward";
  setMoverStyle(newTabIndex);
  state.activeTab = tab;
  emit("tabChange", { name: tab });
};

const setMoverStyle = async (index: number) => {
  await nextTick();
  const el = tabBarItems.value[index];
  const { width } = el?.getBoundingClientRect();

  const newTabBarItemOffset = el.offsetLeft;

  // const top = el.offsetTop + (props.moverFull ? 0 : el.clientHeight);
  // state.moverTop = `${top}px`;

  state.moverWidth = `${width}px`;
  state.moverLeft = `${newTabBarItemOffset}px`;
  if (props.scrollable) {
    //   TODO: fix for rtl version
    tabbarContainer.value.scrollTo({
      left: newTabBarItemOffset - 80,
      behavior: "smooth",
    });
  }
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
</script>

<style lang="scss">
.r-tab {
  min-width: 100%;
  --r-duration: calc(var(var(--r-duration)) * 1.2);
  --radius: calc(var(--r-radius) / 2);
  .r-tabbar {
    display: flex;
    position: relative;
  }
  .r-tabbar-container {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid color(border-color, var(--border-alpha));
  }

  .r-tab-button {
    display: flex;
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
      background: color(hover, var(--hover-alpha));
    }

    &.tabactive {
      color: color();
      pointer-events: none;
      background: color(color, var(--light-alpha));
    }
  }

  .mover {
    position: absolute;
    bottom: 0;
    height: 2px;
    border-radius: var(--radius);
    background: color(color);
    transition: all var(--r-duration);
  }

  .tabs-container {
    border-radius: var(--r-radius);
    overflow: hidden;
    position: relative;
    transition: all var(--r-duration);
  }

  &.fit {
    .r-tabbar {
      flex: 1;
    }
    .r-tab-button {
      flex: 1;
    }
  }

  &.bordered {
    overflow: hidden;
    border-radius: var(--r-radius);
    box-shadow: var(--border);
  }

  &.scrollable {
    .r-tabbar {
      white-space: nowrap;
    }
    .r-tabbar-container {
      overflow-x: auto;
      @extend .scroll-bar;
    }
  }

  &.moverFull {
    .mover {
      height: 100%;
      z-index: 0;
      border-radius: var(--radius);
    }

    .r-tab-button {
      position: relative !important;
      z-index: 2;
      background: transparent;

      &.tabactive {
        color: color(active-text);
      }
    }
  }

  &.segmented {
    .r-tabbar-container {
      border: none;
      border-radius: var(--r-radius);
      padding: var(--r-space-1);
    }
    .r-tab-button {
      padding: var(--r-space-1) var(--r-space-3);
      background-color: transparent;
      border-radius: var(--r-radius);
      z-index: 2;
    }
    .mover {
      border-radius: var(--r-radius);
      height: 100%;
      z-index: 0;
      box-shadow: 0 0 6px -2px color();
    }
    .tabactive {
      color: color(active-text);
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
