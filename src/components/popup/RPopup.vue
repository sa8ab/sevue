<script setup lang="ts">
import SevueIcon from "@/components/icons/SevueIcon.vue";
import { onMounted, useAttrs } from "vue";
import {
  PopupRoot,
  PopupContent,
  PopupClose,
  PopupOverlay,
  PopupTitle,
  type PopupRootProps,
  type PopupRootEmits,
} from "@/components/popup";
import { useEmitsAsProps } from "@/composables/useEmitsAsProps";

export interface RPopupProps extends PopupRootProps {
  title?: string;
  showClose?: boolean;
  fullWidth?: boolean;
  transitionProps?: Record<string, any>;
  teleport?: string;
  teleportDisabled?: boolean;
}
defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits<PopupRootEmits>();
const attrs = useAttrs();

const props = withDefaults(defineProps<RPopupProps>(), {
  active: false,
  teleport: "body",
  showClose: true,
});

const emitsAsProps = useEmitsAsProps(emit);

onMounted(() => {
  if (attrs.noCloseButton) {
    console.warn("`noCloseButton` prop is depricated on RPopup, use `showClose` instead");
  }
  if (attrs.noClose) {
    console.warn("`noClose` prop is depricated on RPopup, use `preventClose` instead");
  }
});
</script>

<template>
  <PopupRoot v-bind="{ ...emitsAsProps, active, preventClose, beforeClose }">
    <Teleport :to="teleport" :disabled="teleportDisabled">
      <Transition name="r-popup" v-bind="transitionProps">
        <div v-if="active" class="r-popup" v-bind="$attrs">
          <PopupOverlay class="r-popup-underlay"></PopupOverlay>
          <PopupContent :class="['r-popup-inner', { fullWidth }]">
            <div class="r-popup-header">
              <slot name="header">
                <PopupTitle as="div" class="r-popup-title">{{ title }}</PopupTitle>
              </slot>
              <PopupClose asChild>
                <RButton textStyle iconOnly compact v-if="showClose">
                  <SevueIcon name="close" width="24px" height="24px" />
                </RButton>
              </PopupClose>
            </div>
            <div class="r-popup-content overflow-x-scroll-bar">
              <slot></slot>
            </div>
            <slot name="footer" />
          </PopupContent>
        </div>
      </Transition>
    </Teleport>
  </PopupRoot>
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

  &-focus-fallback {
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
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
