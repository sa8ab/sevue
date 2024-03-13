<script setup lang="ts">
import SevueIcon from "@/components/icons/SevueIcon.vue";
import { onMounted } from "vue";

export interface Props {
  active?: boolean;
  title?: string;
  preventClose?: boolean;
  showClose?: boolean;
  fullWidth?: boolean;
  transitionProps?: Record<string, any>;
  teleport?: string;
  teleportDisabled?: boolean;
  beforeClose?: (arg0: () => void) => any;
}
defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits<{
  "update:active": [boolean];
  close: [];
}>();

const props = withDefaults(defineProps<Props>(), {
  active: false,
  teleport: "body",
  showClose: true,
});

const onCloseReq = () => {
  if (props.beforeClose) {
    props.beforeClose(close);
    return;
  }
  if (props.preventClose) return;
  close();
};

const close = () => {
  emit("close");
  emit("update:active", false);
};

onMounted(() => {
  // @ts-ignore
  if (props.noCloseButton) {
    console.warn("`noCloseButton` prop is depricated on RPopup, use `showClose` instead");
  }
  // @ts-ignore
  if (props.noClose) {
    console.warn("`noClose` prop is depricated on RPopup, use `preventClose` instead");
  }
});
</script>

<template>
  <Teleport :to="teleport" :disabled="teleportDisabled">
    <Transition name="r-popup" v-bind="transitionProps">
      <div class="r-popup" v-if="active" v-bind="$attrs">
        <div class="r-popup-underlay" @click="onCloseReq"></div>
        <div :class="['r-popup-inner', { fullWidth }]">
          <div class="r-popup-header">
            <slot name="header">
              <div class="r-popup-title">{{ title }}</div>
            </slot>
            <RButton @click="onCloseReq" textStyle iconOnly compact v-if="showClose">
              <SevueIcon name="close" width="24px" height="24px" />
            </RButton>
          </div>
          <div class="r-popup-content overflow-x-scroll-bar">
            <slot />
          </div>
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

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
    background: rgba(black, var(--r-popup-underlay-opacity));
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
    box-shadow: 0 6px 12px color(shadow-color, var(--r-shadow-alpha));
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
