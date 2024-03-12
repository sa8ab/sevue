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
          @setValue="setValue(item.value)"
          ref="itemRefs"
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
import { onMounted, reactive, ref, toRef, onBeforeUnmount, nextTick } from "vue";
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
});

const tabbarContainer = ref<HTMLElement>();
const tabbar = ref<Element>();
const itemRefs = ref<HTMLElement[]>([]);

onMounted(async () => {
  runObserver();
  maybeSetInitialValue();
});

const currentIndex = computed(() => props.items?.findIndex((item) => item.value === model.value));

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

const setMoverStyle = async (options?: { focus: boolean }) => {
  if (currentIndex.value === undefined) return;
  // @ts-ignore
  const tab = itemRefs.value[currentIndex.value]?.$el;

  if (!tab) return;

  if (options?.focus) {
    tab.focus();
  }

  state.moverWidth = `${tab.offsetWidth}px`;
  state.moverLeft = `${tab.offsetLeft}px`;

  // if (props.scrollable) {
  //   //   TODO: fix for rtl version
  //   tabbarContainer.value?.scrollTo({
  //     left: newTabBarItemOffset - 80,
  //     behavior: "smooth",
  //   });
  // }
};

const setValue = (value: string | number, options?: { focus: boolean }) => {
  model.value = value;
  emit("change", value);
  nextTick(() => setMoverStyle(options));
};

const getIsActive = (value: RTabItemType["value"]) => {
  return value === model.value;
};

const selectNextItem = () => {
  const items = props.items;

  if (!items?.length || currentIndex.value === undefined || currentIndex.value === -1) return;

  const next = items.find((item, index) => !item.disabled && index > currentIndex.value!);

  if (next) {
    setValue(next.value, {
      focus: true,
    });
  }
};

const selectPrevItem = () => {
  const items = props.items;

  if (!items?.length) return;

  const reversedList = [...items].reverse();

  const currentReversedIndex = reversedList.findIndex((item) => item.value === model.value);
  if (currentReversedIndex === -1) return;

  const previous = reversedList.find((item, index) => !item.disabled && index > currentReversedIndex);

  if (previous) {
    setValue(previous.value, {
      focus: true,
    });
  }
};
const handleKeyDown = (e: KeyboardEvent) => {
  const code = e.code;
  if (code === "ArrowLeft") {
    selectPrevItem();
  }
  if (code === "ArrowRight") {
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
