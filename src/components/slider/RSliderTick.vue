<template>
  <div class="r-slider-tick" :style="renderStyle" v-if="!hidden">
    <span class="tick-dot" :style="{ opacity: noDot ? 0 : 1 }"></span>
    <div class="text" v-if="slider.tickLabels">{{ text || value }}</div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";

const slider = inject("slider") as any;
const props = defineProps(["value", "text"]);
const renderStyle = computed(() => {
  return {
    left: `${slider.getPositionFromValue({ value: props.value })}%`,
  };
});
const noDot = computed(() => {
  return props.value === slider.min.value || props.value === slider.max.value;
});

const hidden = computed(() => props.value > slider.max.value || props.value < slider.min.value);
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
