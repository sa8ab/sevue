<template>
  <div
    :class="['r-tab', { fit, bordered, scrollable, moverFull, noBorder }]"
    :style="{ '--r-color': color || 'var(--r-prm)', '--r-active-text': activeTextColor }"
    @keydown="handleKeyDown"
  >
    <div class="r-tabbar-container" ref="tabbarContainer">
      <div class="r-tabbar" ref="tabbar">
        <RTabItem
          v-for="item in items"
          :value="item.value"
          :disabled="item.disabled"
          :active="getIsActive(item.value)"
          @setMoverStyle="setMoverStyle"
          @click="setValue(item.value)"
        >
          {{ item.label }}
        </RTabItem>
        <div class="r-tab-mover" :style="{ width: state.moverWidth, left: state.moverLeft }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useColor from "@/composables/useColor";
import { onMounted, reactive, ref, toRef, provide, onBeforeUnmount } from "vue";
import type { RTabItemType } from "@/types";
import { computed } from "vue";

export interface Props {
  items?: RTabItemType[];
  initialValue?: number | string;
  fit?: boolean;
  bordered?: boolean;
  scrollable?: boolean;
  moverFull?: boolean;
  color?: string;
  activeTextColor?: string;
  noBorder?: boolean;
}

type State = {
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
  change: [RTabItemType["value"]];
}>();
const model = defineModel<string | number>({
  required: false,
});

const { color } = useColor(toRef(props, "color"));
const { color: activeTextColor } = useColor(toRef(props, "activeTextColor"));

const state = reactive<State>({
  moverWidth: "0",
  moverLeft: "0",
  // moverTop: "0",
  observerInstance: undefined,
  lastActiveElement: undefined,
});

const tabbarContainer = ref<HTMLElement>();
const tabbar = ref<Element>();

onMounted(async () => {
  runObserver();
  maybeSetInitialValue();
});

const maybeSetInitialValue = () => {
  // if already has modelValue
  if (model.value) return;

  // if has requested initalValue
  if (props.initialValue !== undefined) {
    model.value = props.initialValue;
    return;
  }

  // pick first item
  const firstActiveIndex = props.items?.findIndex(({ disabled }) => !disabled);

  if (firstActiveIndex == -1 || firstActiveIndex === undefined) return;

  model.value = props.items?.[firstActiveIndex].value;
};

onBeforeUnmount(() => {
  state.observerInstance?.disconnect();
});

const runObserver = () => {
  state.observerInstance = new ResizeObserver(() => {
    setMoverStyle();
  });

  state.observerInstance.observe(tabbar.value!);
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
    tabbarContainer.value?.scrollTo({
      left: newTabBarItemOffset - 80,
      behavior: "smooth",
    });
  }
};

const setValue = (value: string | number) => {
  model.value = value;
  emit("change", value);
};

const currentIndex = computed(() => props.items?.findIndex((item) => item.value === model.value));

const getIsActive = (value: RTabItemType["value"]) => {
  return value === model.value;
};

const selectNextItem = () => {
  const items = props.items;

  if (!items?.length || currentIndex.value === undefined || currentIndex.value === -1) return;

  const next = items.find((item, index) => !item.disabled && index > currentIndex.value!);

  if (next) {
    setValue(next.value);
  }
};

const selectPrevItem = () => {
  const items = props.items;

  const currentReversedIndex = props.items?.findIndex((item) => item.value === model.value);

  if (!items?.length || currentReversedIndex === undefined || currentReversedIndex === -1) return;

  const reversedList = [...items].reverse();

  const previous = reversedList.find((item, index) => !item.disabled && index > currentReversedIndex);

  console.log(reversedList, previous, currentIndex.value);
  if (previous) {
    setValue(previous.value);
  }
};
const handleKeyDown = (e: KeyboardEvent) => {
  const code = e.code;
  if (code === "ArrowLeft") {
    // go to next item
    selectPrevItem();
  }
  if (code === "ArrowRight") {
    // go to prev item
    selectNextItem();
  }
};
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
    border-bottom: 1px solid color(border-color, var(--r-border-alpha));
  }

  &-mover {
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
    box-shadow: 0 0 0 var(--r-border-width) rgba(var(--r-border-color), var(--r-border-alpha));
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
    .r-tab-mover {
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
