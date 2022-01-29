<template>
  <transition name="r-loading">
    <div
      v-if="active"
      :class="['r-loading', { hasTarget: !!target }]"
      :style="{
        '--rgb-prm': getColor(color),
        '--rgb-b1': getColor(background),
      }"
    >
      <div class="r-loading-inner">
        <div class="r-loading-spinner">
          <div class="r-loading-spinner__1"></div>
          <div class="r-loading-spinner__2"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { getColor } from "@/helpers";
export default {
  name: "Notification",
  props: {
    title: { default: "", type: String },
    text: { default: "", type: String },
    color: { default: "", type: String },
    background: { default: "", type: String },
    target: { default: undefined },
  },
  data: () => ({
    active: false,
  }),
  mounted() {
    this.$nextTick(() => {
      this.active = true;
    });
  },
  methods: {
    getColor,
    close() {
      this.active = false;
      setTimeout(() => {
        this.$el.remove();
      }, 3000);
    },
  },
};
</script>

<style lang="scss">
.r-loading-target {
  position: relative;
}
.r-loading {
  color: color("text");
  background: color("b1", 0.6);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 80;
  &-inner {
    color: color();
    display: flex;
    justify-content: center;
  }
  &.hasTarget {
    position: absolute;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter-active,
  &-leave-active {
    transition: all $duration;
  }
  &-spinner {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    position: relative;
    &__1 {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid color();
      border-radius: inherit;
      border-top: 3px solid transparent;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      animation: rotate 0.8s ease infinite;
      top: 0px;
    }
    &__2 {
      top: 0px;
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px dashed color();
      border-radius: inherit;
      border-top: 3px solid transparent;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      animation: rotate 0.8s linear infinite;
      opacity: 0.2;
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>