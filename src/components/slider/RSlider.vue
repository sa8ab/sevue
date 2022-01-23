<template>
  <div
    :class="['r-slider', { tickLabels }]"
    :style="{ '--rgb-prm': $r.getColor(color) }"
  >
    <div class="bar" ref="slider" @click="onSliderClick">
      <div class="progress" :style="progressStyle"></div>
      <div class="ticks" v-if="ticks">
        <RSliderTick
          class="tick"
          v-for="tick in ticksList"
          :key="tick.value"
          v-bind="tick"
        />
      </div>
      <Dot
        ref="dotOne"
        :dotVal="value1"
        v-bind="$props"
        @update="onValueOneUpdate"
        @setIsDragging="setIsDragging"
        class="dot-1"
      >
        <slot name="tooltip" :value="value1"></slot>
      </Dot>
      <Dot
        v-if="isRange"
        ref="dotTwo"
        :dotVal="value2"
        v-bind="$props"
        @update="onValueTwoUpdate"
        @setIsDragging="setIsDragging"
        class="dot-2"
      >
        <slot name="tooltip" :value="value2"></slot>
      </Dot>
    </div>
  </div>
</template>

<script>
import Dot from "./RSliderDot.vue";
import RSliderTick from "./RSliderTick.vue";
export default {
  components: { Dot, RSliderTick },
  name: "RSlider",
  provide() {
    return {
      slider: { ...this, ...this.$props, refs: this.$refs },
    };
  },
  props: {
    value: { type: [Number, Array] },
    min: { default: 0, type: Number },
    max: { default: 100, type: Number },
    step: { default: 1, type: Number },
    precision: { default: 0, type: Number },
    tooltip: { default: false, type: Boolean },
    alwaysTooltip: { default: false, type: Boolean },
    color: { default: "", type: String },
    ticks: { default: false, type: Boolean },
    tickLabels: { default: false, type: Boolean },
  },
  data: () => ({
    value1: 0,
    value2: 0,
    isDragging: false,
    transition: `all 0.3s`,
  }),
  created() {
    this.setValues();
  },
  methods: {
    setValues() {
      if (this.isRange) {
        const [one, two] = this.value;
        this.value2 = this.areDotsReversed ? one : two;
        this.value1 = this.areDotsReversed ? two : one;
      } else {
        this.value1 = this.value;
      }
    },
    emitInput() {
      this.$emit(
        "input",
        this.isRange ? [this.minValue, this.maxValue] : this.value1
      );
    },
    onSliderClick({ clientX }) {
      const value = this.getValueFromPosition({ position: clientX });
      if (this.isRange) {
        const diffFirst = Math.abs(value - this.value[0]);
        const diffSecond = Math.abs(value - this.value[1]);
        if (diffFirst < diffSecond) {
          this.areDotsReversed
            ? this.onValueTwoUpdate({ clientX })
            : this.onValueOneUpdate({ clientX });
        } else {
          this.areDotsReversed
            ? this.onValueOneUpdate({ clientX })
            : this.onValueTwoUpdate({ clientX });
        }
      } else {
        this.onValueOneUpdate({ clientX });
      }
    },
    onValueOneUpdate(e) {
      this.value1 = this.getValueFromPosition({ position: e.clientX });
      this.emitInput();
    },
    onValueTwoUpdate(e) {
      this.value2 = this.getValueFromPosition({ position: e.clientX });
      this.emitInput();
    },
    getValueFromPosition({ position }) {
      const { min, max, step, sliderWidth } = this;
      const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
      const percent = ((position - sliderOffsetLeft) / sliderWidth()) * 100;
      const raw = percent / step / (100 / (max - min));
      const rounded = Math.round(raw);
      const value = parseFloat((rounded * step + min).toFixed(this.precision));
      if (value > max) return max;
      if (value < min) return min;
      return value;
    },
    getPositionFromValue({ value }) {
      return (value / (this.max - this.min)) * 100;
    },
    setIsDragging(e) {
      this.isDragging = e;
    },
    sliderWidth() {
      return this.$refs.slider.getBoundingClientRect().width;
    },
  },
  computed: {
    isRange() {
      return Array.isArray(this.value);
    },
    minValue() {
      return Math.min(this.value1, this.value2);
    },
    maxValue() {
      return Math.max(this.value1, this.value2);
    },
    areDotsReversed() {
      if (this.isRange) {
        return this.value1 > this.value2;
      }
      return false;
    },
    ticksList() {
      const list = [];
      const count = (this.max - this.min) / this.step;
      for (let x = 0; x < count + 1; x++) {
        list.push({
          value: x * this.step,
        });
      }
      return list;
    },
    progressStyle() {
      const { min, max, value1, value2, isRange } = this;
      return isRange
        ? {
            width: `${(Math.abs(value1 - value2) / (max - min)) * 100}%`,
            left: `${((Math.min(value1, value2) - min) / (max - min)) * 100}%`,
            transition: !this.isDragging && this.transition,
          }
        : {
            width: `${((value1 - min) / (max - min)) * 100}%`,
            transition: !this.isDragging && this.transition,
          };
    },
  },
  watch: {
    value() {
      this.setValues();
    },
  },
};
</script>

<style lang="scss">
.r-slider {
  width: 100%;
  user-select: none;
  padding: $p2 0;
  .bar {
    // background: color("b2");
    background: $hover;
    height: 8px;
    width: 100%;
    position: relative;
    cursor: pointer;
    border-radius: 8px;
  }
  .progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 20px;
    background: color();
    pointer-events: none;
    border-radius: 8px;
    z-index: 2;
  }
  .ticks {
    pointer-events: none;
  }
  &.tickLabels {
    padding-bottom: 24px;
  }
}
</style>