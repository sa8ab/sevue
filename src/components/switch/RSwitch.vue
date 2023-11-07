<template>
  <div
    :class="[
      'r-switch',
      containerClass,
      { alternative, disabled, square, 'r-switch__focused': state.focused, 'r-switch_bordered': bordered },
    ]"
    :style="{ '--r-color': color || 'var(--r-prm)', width: autoWidth ? 'auto' : state.width }"
    ref="switchRef"
  >
    <input
      class="r-switch-input"
      type="checkbox"
      v-model="model"
      :disabled="disabled"
      v-bind="$attrs"
      ref="inputRef"
      @keyup.tab="onFocus"
      @blur="onBlur"
    />
    <div class="r-switch-background"></div>
    <div class="r-switch-text r-switch-on" ref="onRef">
      <slot name="on">
        <slot />
      </slot>
    </div>
    <div class="r-switch-text r-switch-off" ref="offRef">
      <slot name="off">
        <slot />
      </slot>
    </div>
    <div class="r-switch-circle">
      <slot name="circle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRef, computed, ref, watch, nextTick, onMounted } from "vue";
import useColor from "@/composables/useColor";
export interface Props {
  modelValue?: boolean | string | number | null | Record<string, any>;
  color?: string;
  autoWidth?: boolean;
  alternative?: boolean;
  disabled?: boolean;
  containerClass?: string;
  square?: boolean;
  bordered?: boolean;
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const { color } = useColor(toRef(props, "color"));

type State = {
  focused: boolean;
  width?: string;
};
const state = reactive<State>({
  focused: false,
  width: "auto",
});

const inputRef = ref<HTMLInputElement | undefined>();
const onRef = ref<HTMLDivElement | undefined>();
const offRef = ref<HTMLDivElement | undefined>();
const switchRef = ref<HTMLDivElement | undefined>();

const focus = () => {
  inputRef.value?.focus();
  onFocus();
};
const blur = () => {
  inputRef.value?.blur();
  onBlur();
};

const onFocus = () => {
  state.focused = true;
};
const onBlur = () => {
  state.focused = false;
};

onMounted(() => {
  // make sure elements are there
  setTimeout(() => {
    calulateWidth(inputRef.value?.checked);
  }, 200);
});

const calulateWidth = async (checked?: boolean) => {
  await nextTick();
  const field = checked ? onRef.value : offRef.value;

  const { width } = field?.getBoundingClientRect() || {};
  state.width = width ? `${width}px` : "auto";
};

const model = computed({
  get: () => props.modelValue,
  set: (e) => emit("update:modelValue", e),
});

if (!props.autoWidth) {
  watch(
    () => props.modelValue,
    () => {
      calulateWidth(inputRef.value?.checked);
    },
    { flush: "post" }
  );
}

defineExpose({
  inputRef,
  focus,
  blur,
});
</script>

<style lang="scss">
.r-switch {
  --circle-width: 20px;
  --padding: 6px;
  --text-space: calc(var(--circle-width) + (var(--padding) * 2));
  --duration: calc(var(--r-duration) * 1.5);
  min-width: 48px;
  height: 28px;
  border-radius: 80px;
  background: color(b1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: width var(--duration), box-shadow var(--r-duration);
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
    white-space: nowrap;
    user-select: none;
  }
  &-on {
    position: absolute;
    transform: translateX(-100%);
    left: 0;
  }
  &-off {
    right: 0;
  }

  &-circle {
    width: var(--circle-width);
    height: var(--circle-width);
    position: absolute;
    background: color(b2);
    border-radius: 80px;
    left: var(--padding);
    z-index: 4;
    transition: all var(--duration);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--r-font-small);
    box-shadow: 0 0 6px -2px color(shadow-color, var(--r-shadow-alpha));
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

  &.alternative {
    background: color(b2);
    .r-switch-circle {
      background: color(b1);
    }
  }
  &.disabled {
    opacity: var(--r-disabled-alpha);
    pointer-events: none;
    --r-color: var(--r-disabled) !important;
  }

  &.square {
    border-radius: var(--r-radius);
    .r-switch-background {
      border-radius: var(--r-radius);
    }
    .r-switch-circle {
      border-radius: var(--r-radius);
    }
  }

  &_bordered {
    border: 1px solid color(border-color, var(--r-border-alpha));
  }
  &__focused {
    box-shadow: var(--r-focused-box-shadow-specs) color(color);
  }
}
</style>
