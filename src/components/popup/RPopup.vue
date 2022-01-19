<template>
  <transition name="r-popup">
    <div class="r-popup" v-if="active">
      <div class="r-popup-underlay" @click="onClose"></div>
      <div
        :class="['r-popup-inner', { fullWidth }]"
        :style="{ maxWidth: `${width}px` }"
      >
        <div class="r-popup-header">
          <div class="title">{{ title }}</div>
          <RButton @click="onClose" iconOnly noColor iconLarge v-if="!noClose">
            <template #icon>
              <CloseIcon color="rgb(var(--rgb-text))" />
            </template>
          </RButton>
        </div>
        <div class="r-popup-content overflow-x-scroll-bar">
          <slot />
        </div>
        <div class="r-popup-footer" v-if="$slots.footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CloseIcon from "../icons/CloseIcon.vue";
export default {
  components: { CloseIcon },
  name: "Popup",
  inheritAttrs: false,
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    noClose: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number, String],
      default: "600",
    },
  },
  methods: {
    onClose() {
      if (!this.noClose) {
        this.$emit("close");
        this.$emit("update:active", false);
      }
    },
  },
};
</script>

<style lang="scss">
.r-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $p2;
  z-index: 80;
  color: color("text");
  &-underlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $popupUnderlay;
    z-index: 2;
  }
  &-inner {
    position: relative;
    background: white;
    border-radius: $radius;
    overflow: hidden;
    width: 100%;
    max-width: 600px;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 4;
    box-shadow: $shadow;
    background: color("b2");
    &.fullWidth {
      max-width: 1200px;
    }
  }
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $p2;
    font-size: 1.2rem;
    font-weight: bold;
    // box-shadow: $shadow2;
    border-bottom: 1px solid rgba($rgb-text, 0.1);
  }
  &-content {
    // height: 100%;
    flex: 1;
    overflow: auto;
    padding: $p2;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: scale(1.06);
  }
  &-enter-active,
  &-leave-active {
    transition: all $duration / 2;
  }
  &-footer {
    padding: $p2;
    border-top: $border;
  }
}
</style>