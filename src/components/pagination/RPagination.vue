<template>
  <div
    :class="['r-pagination notRTL', { bordered, disabled, compact }]"
    :style="{
      '--r-prm': getColor(color),
      '--r-active-text-color': getColor(activeTextColor),
    }"
  >
    <RButton
      class="r-pagination-item r-pagination-navigation prev"
      @click="decrease"
      v-bind="buttonProps"
      v-if="!noNavigation"
    >
      <slot name="prev"><ChevronLeft /></slot>
    </RButton>
    <div class="r-pagination-main">
      <template v-for="(item, i) in items">
        <RButton
          :class="['r-pagination-item', { active: item === modelValue }]"
          :key="i"
          @click="setValue(item as number)"
          v-bind="buttonProps"
          v-if="item !== 'blank'"
        >
          {{ item }}
        </RButton>
        <RButton
          :key="i + 'blank'"
          iconOnly
          v-bind="buttonProps"
          class="r-pagination-item r-pagination-item-blank"
          v-else
        >
          ...
        </RButton>
      </template>
    </div>
    <RButton
      class="r-pagination-item r-pagination-navigation next"
      @click="increase"
      v-bind="buttonProps"
      v-if="!noNavigation"
    >
      <slot name="next"><ChevronRight /></slot>
    </RButton>
    <!-- <div class="r-pagination-compact-navigation" v-if="compact">
    </div> -->

    <!-- <div class="logger">
    <pre>{{
      {
        shouldCreateSpaceOnLeft,
        shouldCreateSpaceOnRight,
        value,
        mainRange,
        sideRange,
      }
    }}</pre>
    {{ items }} - count: {{ items.length }}
  </div> -->
  </div>
</template>

<script setup lang="ts">
import RButton from "../button/RButton.vue";
import ChevronRight from "../icons/ChevronRight.vue";
import ChevronLeft from "../icons/ChevronLeft.vue";
import { getColor } from "@/utils";
import { computed, watch } from "vue";

const props = withDefaults(
  defineProps<{
    color?: string;
    activeTextColor?: string;
    count: number;
    sideRange?: number;
    mainRange?: number;
    modelValue: number;
    bordered?: boolean;
    buttonProps?: any;
    disabled?: boolean;
    noNavigation?: boolean;
    compact?: boolean;
  }>(),
  {
    activeTextColor: "#fff",
    sideRange: 2,
    mainRange: 1,
    modelValue: 1,
    buttonProps: { noColor: true, flat: true },
    disabled: false,
    noNavigation: false,
    compact: false,
  }
);
const emit = defineEmits(["update:modelValue"]);
const setValue = (val: number) => {
  emit("update:modelValue", val);
};
const decrease = () => {
  const res = props.modelValue - 1;
  res !== 0 && emit("update:modelValue", res);
};

const increase = () => {
  const res = props.modelValue + 1;
  res <= props.count && emit("update:modelValue", res);
};

const items = computed(() => {
  const initialItems: Array<string | number> = [...Array(props.count).keys()].map((x) => x + 1);
  const toReturn = initialItems.filter((item) => {
    let isRemovedFromLeft;
    let isRemovedFromRight;
    if (shouldCreateSpaceOnLeft.value) {
      isRemovedFromLeft =
        item > props.sideRange &&
        item < props.modelValue - props.mainRange &&
        item < props.count - props.sideRange - props.mainRange * 2 - 1;
    }
    if (shouldCreateSpaceOnRight.value) {
      isRemovedFromRight =
        item > props.modelValue + props.mainRange &&
        item < props.count - props.sideRange + 1 &&
        item > props.sideRange + props.mainRange * 2 + 2;
    }
    return !isRemovedFromLeft && !isRemovedFromRight;
  });
  if (shouldCreateSpaceOnLeft.value) {
    toReturn.splice(props.sideRange, 0, "blank");
  }
  if (shouldCreateSpaceOnRight.value) {
    toReturn.splice(toReturn.length - props.sideRange, 0, "blank");
  }
  initialItems.forEach(() => {});
  return toReturn;
});

const cantAddSpace = computed(() => {
  return (
    props.count <= props.sideRange * 2 + props.mainRange * 2 + 3
  ); /* one for Selected number, two for blanks which could have been numbers */
});
const shouldCreateSpaceOnLeft = computed(() => {
  if (cantAddSpace.value) return false;
  return props.modelValue - props.mainRange > props.sideRange + 2;
});

const shouldCreateSpaceOnRight = computed(() => {
  if (cantAddSpace.value) return false;
  return props.modelValue + props.mainRange < props.count - props.sideRange - 1;
});

watch(
  () => props.modelValue,
  (val) => {
    if (val > props.count) {
      emit("update:modelValue", props.count);
    }
  }
);
watch(
  () => props.count,
  (c) => {
    if (props.modelValue > c) {
      emit("update:modelValue", c);
    }
  }
);
</script>

<style lang="scss">
.r-pagination {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  gap: $p;
  &-main {
    display: flex;
    align-items: center;
    gap: $p;
    flex-wrap: wrap;
  }
  &-item {
    padding: 0 $p2 !important;
    height: 32px;
    min-width: 32px;
    &.active {
      background: color() !important;
      color: color("active-text-color") !important;
    }
  }
  &-navigation {
    height: 100%;
    min-height: 32px;
  }
  &-item-blank {
    pointer-events: none !important;
    padding: 0 !important;
  }
  &.bordered {
    .r-pagination-item {
      box-shadow: var(--border);
    }
  }
  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  &.compact {
    grid-template-columns: auto auto;
    .r-pagination-main {
      grid-column: 1 / 3;
    }
    .prev {
      grid-row: 2 / 3;
    }
  }
}
</style>
