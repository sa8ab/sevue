<template>
  <div
    :class="['r-tab', { fit, bordered, iconOnly, scrollable, moverFull }]"
    :style="{ '--r-color': color || 'var(--r-prm)' }"
  >
    <!-- tabbar -->
    <div class="tabbar" ref="tabbar">
      <div
        v-for="({ title, icon, disabled }, i) in tabs"
        :key="i"
        :class="['tab-button r', { tabactive: state.activeTab === title, disabled }]"
        :icon="icon"
        ref="tabBarItems"
        @click="setActiveTab(title)"
        v-ripple
      >
        <slot :name="`icon-${i}`">
          <i :class="[iconPrefix, icon]" v-if="icon"></i>
        </slot>
        <span class="title" v-if="!iconOnly">
          {{ title }}
        </span>
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
import { useSevue } from "@/main";
import { nextTick, onMounted, reactive, ref, toRef, computed, useSlots, watch, type VNode, provide } from "vue";

export interface Props {
  fit?: boolean;
  bordered?: boolean;
  iconOnly?: boolean;
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
  children: VNode[];
};
type Tab = {
  title: string;
  icon?: string;
  disabled?: boolean;
};
const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(["tabChange"]);
const color = useColor(toRef(props, "color"));
const { iconPrefix } = useSevue();
const state = reactive<State>({
  activeTab: "",
  height: "auto",
  direction: "forward",
  moverWidth: "0",
  moverLeft: "0",
  children: [],
});
const tabBarItems = ref<HTMLElement[]>([]);
const tabbar = ref();

const { default: defaultSlot } = useSlots();

onMounted(() => {
  setActiveTab(tabs.value[props.initialActiveTab ?? 0]?.title);
});
watch(
  () => defaultSlot!(),
  (defSlot) => (state.children = defSlot),
  { immediate: true }
);
const tabs = computed<Tab[]>(() => state.children.map(({ props }) => <Tab>props));

const setActiveTab = (tab: string) => {
  const oldTabIndex = tabs.value.findIndex(({ title }) => state.activeTab === title);
  const newTabIndex = tabs.value.findIndex(({ title }) => tab === title);

  if (oldTabIndex < newTabIndex) state.direction = "forward";
  else state.direction = "backward";
  setMoverStyle({ index: newTabIndex });
  nextTick(() => {
    state.activeTab = tab;
    emit("tabChange", { title: tab, index: newTabIndex });
  });
};

const setMoverStyle = ({ index }: { index: number }) => {
  const { width } = tabBarItems.value[index]?.getBoundingClientRect();
  const newTabBarItemOffset = tabBarItems.value[index].offsetLeft;
  state.moverWidth = `${width}px`;
  state.moverLeft = `${newTabBarItemOffset}px`;

  if (props.scrollable) {
    //   TODO: fix for rtl version
    tabbar.value.scrollTo({
      left: newTabBarItemOffset - 80,
      behavior: "smooth",
    });
  }
};
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
$duration: $duration * 1.5;

.r-tab {
  min-width: 100%;

  .tabbar {
    display: flex;
    position: relative;
    overflow: hidden;
  }

  .tab-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--r-space-1);
    padding: var(--r-normal-padding);
    border-radius: 0;

    .title {
      font-size: $fsmall;
    }

    &.tabactive {
      color: color();
      background: color(color, var(--light-alpha));
    }

    &.disabled {
      color: color(disabled);
      pointer-events: none;
    }
  }

  .mover {
    position: absolute;
    bottom: 0;
    height: 2px;
    border-radius: 2px;
    background: color(color);
    transition: width $duration, left $duration;
  }

  .tabs-container {
    border-radius: var(--r-radius);
    overflow: hidden;
    position: relative;
    transition: all $duration;
  }

  &.fit {
    .tab-button {
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

  &.iconOnly {
    .tab-button {
      width: 40px;
      height: 40px;
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

    .tab-button {
      position: relative !important;
      z-index: 2;

      &.tabactive {
        transition-delay: math.div($duration, 2);
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
    transition: all $duration;
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
    transition: all $duration;
  }
}
</style>
