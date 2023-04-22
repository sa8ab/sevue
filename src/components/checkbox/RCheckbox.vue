<template>
  <label
    :class="['r-cb', containerClass, { isChecked, disabled, focused }]"
    :style="{
      '--r-color': color || 'var(--r-prm)',
      '--r-text-color': iconColor || 'var(--r-text)',
    }"
  >
    <input
      type="checkbox"
      :value="value"
      v-model="model"
      :trueValue="trueValue"
      :falseValue="falseValue"
      :disabled="disabled"
      @keyup.tab="onFocus"
      @blur="onBlur"
      v-bind="$attrs"
      ref="inputRef"
    />
    <div class="check-container">
      <SevueIcon name="check" class="icon" />
      <div class="background"></div>
    </div>
    <div class="slot">
      <slot />
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, toRef, ref } from "vue";
import SevueIcon from "@/components/icons/SevueIcon.vue";
import useColor from "@/composables/useColor";

export interface Props {
  modelValue: string | number | boolean | any[];
  value?: string | number | Record<string, any>;
  color?: string;
  iconColor?: string;
  trueValue?: any;
  falseValue?: any;
  containerClass?: string;
  disabled?: boolean;
  [x: string | number | symbol]: any;
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  trueValue: true,
  falseValue: false,
  iconColor: "#fff",
});
const emit = defineEmits(["update:modelValue"]);

const color = useColor(toRef(props, "color"));
const iconColor = useColor(toRef(props, "iconColor"));
const inputRef = ref<HTMLInputElement | undefined>();
const focused = ref(false);

const onFocus = () => {
  focused.value = true;
};
const onBlur = () => {
  focused.value = false;
};
const model = computed({
  set(e) {
    emit("update:modelValue", e);
  },
  get() {
    return props.modelValue;
  },
});
const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value);
  }
  return props.modelValue === props.trueValue;
});

defineExpose({
  inputRef,
});
</script>

<style lang="scss">
.r-cb {
  user-select: none;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--r-space-1);
  color: color(text-color);

  &:hover {
    .check-container {
      background: color(hover, var(--hover-alpha));
    }
  }

  input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    z-index: 0;
  }

  .check-container {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: var(--r-radius);
    overflow: hidden;
    border: 2px solid color(hover, var(--hover-alpha));
    transition: all var(--r-duration);
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: color();
    z-index: -1;
    transform: translateY(100%);
    transition: all var(--r-duration);
    border-radius: 50%;
    opacity: 0;
  }

  .icon {
    position: relative;
    z-index: 2;
    opacity: 0;
    transform: scale(0.8);
    transition: all calc(var(--r-duration));
    // transition-delay: calc(var(--r-duration) / 2);
    color: color(text-color);
  }
  .slot {
    flex: 1;
  }

  &.isChecked {
    &:hover {
      .check-container {
        box-shadow: 0 2px 10px -4px color();
      }
    }

    .check-container {
      border-color: color();
    }

    .background {
      transform: translateY(0);
      opacity: 1;
      border-radius: 0;
    }

    .icon {
      transform: scale(1);
      opacity: 1;
    }
  }
  &.disabled {
    pointer-events: none;
    opacity: var(--r-disabled-alpha);
    --r-color: var(--r-disabled) !important;
  }
  &.focused {
    box-shadow: var(--r-focused-box-shadow-specs) color();
    border-radius: var(--r-radius);
  }
}
</style>
