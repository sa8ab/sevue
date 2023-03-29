<template>
  <Teleport to="body">
    <transition name="r-popup">
      <div class="r-popup" v-if="active">
        <div class="r-popup-underlay" @click="onClose"></div>
        <div :class="['r-popup-inner', { fullWidth }]">
          <div class="r-popup-header">
            <div class="r-popup-title">{{ title }}</div>
            <RButton @click="onClose" textStyle iconOnly iconLarge v-if="!noClose">
              <i class="bx bx-x"></i>
            </RButton>
          </div>
          <div class="r-popup-content overflow-x-scroll-bar">
            <slot />
          </div>
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const emit = defineEmits(["update:active", "close"]);
const props = defineProps<{
  active: boolean;
  title?: string;
  noClose?: boolean;
  fullWidth?: boolean;
}>();

const onClose = () => {
  if (!props.noClose) {
    emit("close");
    emit("update:active", false);
  }
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
  &-underlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(black, var(--popup-underlay-opacity));
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
    box-shadow: var(--shadow);
    background: color(b2);
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
    border-bottom: 1px solid color(text, 0.1);
  }
  &-content {
    // height: 100%;
    flex: 1;
    overflow: auto;
    padding: $p2;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(1.06);
  }
  &-enter-active,
  &-leave-active {
    transition: all math.div($duration, 2);
  }
}
</style>
