<template>
  <div class="r-switch" :style="{ '--r-color': color || 'var(--r-prm)' }">
    <input class="r-switch-input" type="checkbox" v-model="model" v-bind="$attrs" @change="onChange" />
    <div class="r-switch-background"></div>
    <div class="r-switch-text r-switch-on">
      <slot name="on" />
    </div>
    <div class="r-switch-text r-switch-off">
      <slot name="off" />
    </div>
    <div class="r-switch-circle">
      <slot name="circle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRef, computed } from "vue";
import useColor from "@/composables/useColor";
export interface Props {
  modelValue?: boolean | string | number | null | Record<string, any>;
  color?: string;
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const color = useColor(toRef(props, "color"));

const state = reactive({
  focused: false,
});

const onChange = (e: any) => {
  console.log(e.target.checked);
};

const model = computed({
  get: () => props.modelValue,
  set: (e) => emit("update:modelValue", e),
});

defineExpose({});
</script>

<style lang="scss">
.r-switch {
  --circle-width: 20px;
  --padding: 6px;
  --text-space: calc(var(--circle-width) + (var(--padding) * 2));
  --duration: calc(var(--r-duration) * 2);
  min-width: 48px;
  height: 28px;
  border-radius: 80px;
  background: color(b2);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  &-background {
    position: absolute;
    left: -100%;
    height: auto;
    width: 100%;
    padding-bottom: 100%;
    background: color();
    z-index: 0;
    transition: all var(--duration);
  }

  &-text {
    font-size: var(--r-font-xsmall);
    padding: var(--padding);
    padding-left: var(--text-space);
    z-index: 2;
    transition: all var(--duration);
  }
  &-on {
    position: absolute;
    transform: translateX(-100%);
  }

  &-circle {
    width: var(--circle-width);
    height: var(--circle-width);
    position: absolute;
    background-color: color(b1);
    border-radius: 80px;
    left: var(--padding);
    z-index: 4;
    transition: all var(--duration);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--r-font-small);
  }

  &-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 6;
    opacity: 0;
    cursor: pointer;
    &:checked {
      & ~ .r-switch-background {
        left: 0;
        border-radius: 50%;
      }

      & ~ .r-switch-text {
        padding-left: var(--padding);
        padding-right: var(--text-space);
      }
      & ~ .r-switch-on {
        position: relative;
        transform: translateX(0);
      }
      & ~ .r-switch-off {
        position: absolute;
        transform: translateX(100%);
      }

      & ~ .r-switch-circle {
        left: calc(100% - var(--circle-width) - var(--padding));
      }
    }
  }

  &:active {
    .r-switch-circle {
      width: calc(var(--circle-width) + 8px);
    }
    .r-switch-input:checked ~ .r-switch-circle {
      left: calc(100% - var(--circle-width) - var(--padding) - 8px) !important;
    }
  }
}
</style>
