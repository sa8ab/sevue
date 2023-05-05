<template>
  <div class="r-slider-tick" :style="renderStyle" v-if="!hidden">
    <span class="tick-dot" :style="{ opacity: isFirstOrLast ? 0 : 1 }"></span>
    <div class="text" v-if="slider.showTickLabels.value">
      <slot>{{ text || value }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sliderKey } from "@/injectionKeys";
import type { SliderInject } from "@/types";
import { inject, computed } from "vue";

const slider = inject(sliderKey) as SliderInject;

const props = defineProps(["value", "text"]);
const renderStyle = computed(() => {
  return {
    left: `${slider.getPositionFromValue({ value: props.value })}%`,
  };
});
const isFirstOrLast = computed(() => {
  return props.value === slider.min.value || props.value === slider.max.value;
});

const hidden = computed(
  () =>
    props.value > slider.max.value ||
    props.value < slider.min.value ||
    (slider.hideFirstAndLastTickLabel.value && isFirstOrLast.value)
);
</script>

<style lang="scss">
.r-slider-tick {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  .tick-dot {
    width: 4px;
    height: 4px;
    border-radius: 8px;
    background: color("hover", 0.6);
  }
  .text {
    position: absolute;
    top: 12px;
    opacity: 0.8;
    font-size: var(--r-font-xsmall);
  }
}
</style>
