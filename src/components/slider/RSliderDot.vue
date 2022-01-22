<template>
  <div
    :class="['r-slider-dot', { focused, active: isDragging, alwaysTooltip }]"
    @mousedown="onDragStart"
    @mousemove="onDrag"
    :style="containerStyle"
    @click.stop.prevent="() => {}"
    ref="dot"
    @focus="onFocus"
    @blur="onBlur"
    tabindex="0"
  >
    <div class="r-slider-tooltip" v-if="tooltip">
      <slot>
        {{ value }}
      </slot>
    </div>
    <div class="the-dot" />
  </div>
</template>

<script>
export default {
  name: "RSliderDot",
  props: ["min", "max", "value", "step", "dotVal", "tooltip", "alwaysTooltip"],
  inject: {
    slider: { default: () => {} },
  },
  data: () => ({
    isDragging: false,
    focused: false,
  }),
  mounted() {},
  methods: {
    onDragStart() {
      this.isDragging = true;
      this.$emit("setIsDragging", true);
      this.addListeners();
    },
    onDrag(e) {
      if (!this.isDragging) return;
      if (e.type === "touchmove") {
        e.clientX = e.touches[0].clientX;
      }
      this.$emit("update", e);
    },
    onDragEnd() {
      this.isDragging = false;
      this.$emit("setIsDragging", false);
      this.removeListeners();
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    addListeners() {
      window.addEventListener("mousemove", this.onDrag);
      window.addEventListener("mouseup", this.onDragEnd);
      window.addEventListener("touchmove", this.onDrag);
      window.addEventListener("touchend", this.onDragEnd);
      window.addEventListener("touchcancel", this.onDragEnd);
    },
    removeListeners() {
      window.removeEventListener("mousemove", this.onDrag);
      window.removeEventListener("mouseup", this.onDragEnd);
      window.removeEventListener("touchmove", this.onDrag);
      window.removeEventListener("touchend", this.onDragEnd);
      window.removeEventListener("touchcancel", this.onDragEnd);
    },
  },
  computed: {
    containerStyle() {
      return {
        left: `${((this.dotVal - this.min) / (this.max - this.min)) * 100}%`,
        transition: !this.isDragging && this.slider.transition,
      };
    },
  },
};
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
    transition: all $duration;
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
    border-radius: $radius;
    padding: $p $p2;
    user-select: none;
    opacity: 0;
    transition: all $duration / 2;
    transform-origin: bottom;
    color: white;
    font-size: $fsmall;
    box-shadow: $shadow;
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