<template>
  <Teleport :to="teleport">
    <transition name="r-popup" v-bind="transitionProps">
      <div class="r-popup" v-if="active" v-bind="$attrs">
        <div class="r-popup-underlay" @click="onCloseReq"></div>
        <div :class="['r-popup-inner', { fullWidth }]">
          <div class="r-popup-header">
            <slot name="header">
              <div class="r-popup-title">{{ title }}</div>
            </slot>
            <RButton @click="onCloseReq" textStyle iconOnly compact v-if="!noCloseButton">
              <SevueIcon name="close" width="24px" height="24px" />
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
import SevueIcon from "@/components/icons/SevueIcon.vue";

export interface Props {
  active?: boolean;
  title?: string;
  noClose?: boolean;
  noCloseButton?: boolean;
  fullWidth?: boolean;
  transitionProps?: Record<string, any>;
  teleport?: string;
  beforeClose?: (arg0: () => void) => any;
}
defineOptions({
  inheritAttrs: false,
});
const emit = defineEmits(["update:active", "close"]);
const props = withDefaults(defineProps<Props>(), {
  active: false,
  teleport: "body",
});

const onCloseReq = () => {
  if (props.beforeClose) {
    props.beforeClose(onClose);
    return;
  }
  if (props.noClose) return;
  onClose();
};

const onClose = () => {
  emit("close");
  emit("update:active", false);
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
  padding: var(--r-space-2);
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
    border-radius: var(--r-radius);
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
    padding: var(--r-space-2);
    // box-shadow: $shadow2;
    border-bottom: 1px solid color(text, 0.1);
  }
  &-title {
    font-size: var(--r-font-large);
    font-weight: 500;
  }

  &-content {
    // height: 100%;
    flex: 1;
    overflow: auto;
    padding: var(--r-space-2);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(1.06);
  }

  &-enter-active,
  &-leave-active {
    transition: all calc(var(--r-duration) / 2);
  }
}
</style>
