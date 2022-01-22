<template>
  <div class="r-slider-tick" :style="renderStyle" v-if="!hidden">
    <span class="tick-dot"></span>
    <div class="text" v-if="slider.tickLabels">{{ text || value }}</div>
  </div>
</template>

<script>
export default {
  name: "RSliderTick",
  inject: {
    slider: {},
  },
  props: ["value", "text"],
  mounted() {
    console.log();
  },
  computed: {
    renderStyle() {
      return {
        left: `${this.slider.getPositionFromValue({ value: this.value })}%`,
      };
    },
    hidden() {
      return this.value === this.slider.min || this.value === this.slider.max;
    },
  },
};
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
    font-size: $fsmall * 0.8;
  }
}
</style>