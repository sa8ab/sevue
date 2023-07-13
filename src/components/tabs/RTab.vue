<template>
  <div
    :class="['r-tab', { fit, bordered, scrollable, moverFull, noBorder }]"
    :style="{ '--r-color': color || 'var(--r-prm)', '--r-active-text': activeTextColor }"
  >
    <div class="r-tabbar-container" ref="tabbarContainer">
      <div class="r-tabbar" ref="tabbar">
        <slot />
        <div class="mover" :style="{ width: state.moverWidth, left: state.moverLeft }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useColor from "@/composables/useColor";
import useDynamicSlots from "@/composables/useDynamicSlots";
import { nextTick, onMounted, reactive, ref, toRef, computed, provide, onBeforeUnmount, watch } from "vue";
import type { Props as Tab } from "./RTabItem.vue";
import getRelatedChildren from "@/utils/getRelatedChildren";
import { tabKey } from "@/injectionKeys";

export interface Props {
  modelValue: string | number;
  fit?: boolean;
  bordered?: boolean;
  scrollable?: boolean;
  moverFull?: boolean;
  color?: string;
  activeTextColor?: string;
  noBorder?: boolean;
}

type State = {
  direction: "forward" | "backward";
  moverWidth: string;
  moverLeft: string;
  // moverTop: string,
  observerInstance?: ResizeObserver;
  lastActiveElement?: HTMLElement;
};

const props = withDefaults(defineProps<Props>(), {
  activeTextColor: "#fff",
});
const emit = defineEmits<{
  (e: "tabChange", params: { name: string }): void;
  (e: "update:modelValue", arg0: string): void;
}>();
const color = useColor(toRef(props, "color"));
const activeTextColor = useColor(toRef(props, "activeTextColor"));

const defaultSlot = useDynamicSlots();

const state = reactive<State>({
  direction: "forward",
  moverWidth: "0",
  moverLeft: "0",
  // moverTop: "0",
  observerInstance: undefined,
  lastActiveElement: undefined,
});
const tabBarItems = ref<HTMLElement[]>([]);
const tabbarContainer = ref();
const tabbar = ref<Element>();

onMounted(async () => {
  runObserver();
});

onBeforeUnmount(() => {
  state.observerInstance?.disconnect();
});

const tabs = computed<Tab[]>(() => children.value.map(({ props }) => <Tab>props));

const runObserver = () => {
  state.observerInstance = new ResizeObserver(() => {
    setMoverStyle();
  });

  state.observerInstance.observe(tabbar.value!);
};

const onItemClick = (item: Tab) => {
  emit("update:modelValue", item.value);
};

const setMoverStyle = async (el?: HTMLElement) => {
  if (el) state.lastActiveElement = el;
  if (!el) {
    el = state.lastActiveElement;
  }

  if (!el) return;

  const { width } = el.getBoundingClientRect();

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

provide(tabKey, {
  activeTab: toRef(props, "modelValue"),
  direction: toRef(state, "direction"),
  onItemClick,
  setMoverStyle,
});
</script>

<style lang="scss">
.r-tab {
  min-width: 100%;
  --radius: var(--r-radius);
  .r-tabbar {
    display: flex;
    position: relative;
  }
  .r-tabbar-container {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid color(border-color, var(--border-alpha));
  }

  .mover {
    position: absolute;
    bottom: 0;
    height: 2px;
    border-radius: var(--radius);
    background: color(color);
    transition: all var(--r-duration);
  }

  &.fit {
    .r-tabbar {
      flex: 1;
    }
    .r-tab-item {
      flex: 1;
    }
  }

  &.bordered {
    overflow: hidden;
    border-radius: var(--r-radius);
    box-shadow: var(--border);
    .r-tab-item {
      padding: var(--r-space-2);
    }
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
      box-shadow: 0 0 6px -2px color();
    }

    .r-tab-item {
      position: relative !important;
      z-index: 2;

      &-active {
        background: transparent;
        color: color(active-text);
      }
    }
  }

  &.noBorder {
    .r-tabbar-container {
      border: none;
      border-radius: var(--r-radius);
      // padding: var(--r-space-1);
    }
  }
}

.r-tab-item {
  padding: var(--r-space-2) 0;
}
</style>
