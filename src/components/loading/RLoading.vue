<template>
  <transition name="r-loading">
    <div
      v-if="state.active || active"
      :class="['r-loading', containerClass, { hasTarget: !!target, local }]"
      :style="{
        '--r-color': getColor(color) || 'var(--r-prm)',
        '--r-component-background': getColor(background) || 'var(--r-b1)',
        ...containerStyle,
      }"
      ref="component"
    >
      <div class="r-loading-inner">
        <slot name="spinner">
          <VNodeRenderer :param="spinner">
            <div class="r-loading-spinner" :style="{ transform: `scale(${scale})` }">
              <div class="r-loading-spinner__1"></div>
              <div class="r-loading-spinner__2"></div>
            </div>
          </VNodeRenderer>
        </slot>
        <slot>
          <VNodeRenderer :param="text" v-if="text" class="text" />
        </slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { getColor } from "@/utils";
import { nextTick, onMounted, reactive, ref, watch } from "vue";
import VNodeRenderer from "../VNodeRenderer.vue";
import type { VNode, CSSProperties } from "vue";

export interface Props {
  text?: string | VNode;
  color?: string;
  background?: string;
  scale?: number;
  target?: HTMLElement;
  spinner?: VNode;
  containerClass?: string;
  containerStyle?: CSSProperties;
  active?: boolean;
  local?: boolean;
}

const props = withDefaults(defineProps<Props>(), {});

const component = ref();
const state = reactive({
  active: false,
});
onMounted(() => {
  if (props.local) return;
  nextTick(() => {
    state.active = true;
  });
});

const close = async () => {
  const parentDiv: HTMLElement = component.value?.parentElement;
  await nextTick();
  setTimeout(() => {
    parentDiv?.remove();
  }, 300);
  state.active = false;
};

defineExpose({
  close,
});
</script>

<style lang="scss">
.r-loading-target {
  position: relative;
}

.r-loading {
  color: color(textColor);
  background: color(component-background, var(--r-loading-background-opacity));
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
    align-items: center;
    flex-direction: column;
  }

  &.hasTarget,
  &.local {
    position: absolute;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-active,
  &-leave-active {
    transition: all var(--r-duration);
  }

  .text {
    padding-top: 12px;
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
