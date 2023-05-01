<template>
  <label
    :class="['r-radio', containerClass, { isChecked, disabled, focused, tag }]"
    :style="{
      '--r-color': color || 'var(--r-prm)',
    }"
  >
    <input
      type="radio"
      :value="value"
      v-model="model"
      :disabled="disabled"
      @keyup.tab="onFocus"
      @blur="onBlur"
      v-bind="$attrs"
      ref="inputRef"
    />
    <div class="check-container" v-if="!tag">
      <div class="background"></div>
    </div>
    <div :class="['slot', { 'check-container': tag }]">
      <slot />
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, toRef, ref } from "vue";
import SevueIcon from "@/components/icons/SevueIcon.vue";
import useColor from "@/composables/useColor";

export interface Props {
  modelValue: string | number | boolean | undefined;
  value?: string | number;
  color?: string;
  containerClass?: string;
  disabled?: boolean;
  tag?: boolean;
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(["update:modelValue"]);

const color = useColor(toRef(props, "color"));
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
  return props.modelValue === props.value;
});

defineExpose({
  inputRef,
});
</script>

<style lang="scss">
.r-radio {
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
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid color(hover, var(--hover-alpha));
    transition: all var(--r-duration);
  }

  .background {
    position: relative;
    top: 6px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    background: color();
    transition: all var(--r-duration);
    border-radius: 50%;
    opacity: 0;
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
      top: 0;
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
  &.tag {
    .check-container {
      width: auto;
      height: auto;
      padding: var(--r-space-1) var(--r-space-2);
      font-size: var(--r-font-small);
      border-radius: var(--r-radius);
    }
  }
  &.isChecked.tag {
    .check-container {
      background-color: color();
    }
    // color: color();
  }
}
</style>
