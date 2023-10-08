<template>
  <div
    :class="['r-slider-dot', { focused: state.focused, active: state.isDragging, alwaysTooltip }]"
    @mousedown="onDragStart"
    @touchstart="onDragStart"
    :style="containerStyle"
    @click.stop.prevent="() => {}"
    ref="dot"
    @focus="onFocus"
    @blur="onBlur"
    tabindex="0"
  >
    <div class="r-slider-tooltip" v-if="tooltip">
      <slot>
        {{ dotVal }}
      </slot>
    </div>
    <div class="the-dot" />
  </div>
</template>

<script setup lang="ts">
import { sliderKey } from "@/injectionKeys";
import type { SliderInject } from "@/types";
import { inject, reactive, computed } from "vue";
import type { StyleValue } from "vue";

const slider = inject(sliderKey) as SliderInject;
const props = defineProps(["min", "max", "value", "step", "dotVal", "tooltip", "alwaysTooltip"]);
const emit = defineEmits(["setIsDragging", "update"]);
const state = reactive({
  isDragging: false,
  focused: false,
});
const onDragStart = () => {
  state.isDragging = true;
  emit("setIsDragging", true);
  addListeners();
};
const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!state.isDragging) return;
  if (e instanceof TouchEvent) {
    console.log({ e });
    e = { ...e, clientX: e.touches[0].clientX };
  }
  emit("update", e);
};
const onDragEnd = () => {
  state.isDragging = false;
  emit("setIsDragging", false);
  removeListeners();
};
const onFocus = () => {
  state.focused = true;
};
const onBlur = () => {
  state.focused = false;
};
const addListeners = () => {
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", onDragEnd);
  window.addEventListener("touchmove", onDrag);
  window.addEventListener("touchend", onDragEnd);
  window.addEventListener("touchcancel", onDragEnd);
};
const removeListeners = () => {
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", onDragEnd);
  window.removeEventListener("touchmove", onDrag);
  window.removeEventListener("touchend", onDragEnd);
  window.removeEventListener("touchcancel", onDragEnd);
};
const containerStyle = computed(() => {
  return {
    left: `${((props.dotVal - props.min) / (props.max - props.min)) * 100}%`,
    transition: !state.isDragging && slider.transition.value,
  } as StyleValue;
});
</script>

<style lang="scss">
.r-slider-dot {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  z-index: 8;
  cursor: grab;
  .the-dot {
    width: 16px;
    height: 16px;
    background: white;
    box-shadow: 0 0 10px rgba(black, 0.2);
    transition: all var(--r-duration);
    border-radius: 50%;
    &:hover {
      transform: scale(1.2);
    }
    &:active {
      transform: scale(0.9);
      cursor: grabbing;
    }
  }

  .r-slider-tooltip {
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translate(-50%, -100%) scale(0);
    background: color();
    pointer-events: none;
    border-radius: var(--r-radius);
    padding: var(--r-space-1) var(--r-space-2);
    user-select: none;
    opacity: 0;
    transition: all calc(var(--r-duration) / 2);
    transform-origin: bottom;
    color: white;
    font-size: var(--r-font-small);
    box-shadow: 0 2px 8px color(shadow-color, 0.4);
  }
  &.active {
    .r-slider-tooltip {
      opacity: 1;
      transform: translate(-50%, -100%) scale(1);
    }
  }
  &.alwaysTooltip {
    .r-slider-tooltip {
      opacity: 1;
      transform: translate(-50%, -100%) scale(1);
    }
  }
}
</style>
