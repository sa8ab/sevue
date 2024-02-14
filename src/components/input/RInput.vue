<template>
  <div
    :class="[
      'r-input',
      containerClass,
      { focused: state.focused, disabled, sharp, error: error || errorMessage, hasIcon },
    ]"
    :style="{ '--r-color': color || 'var(--r-prm)' }"
  >
    <FieldLabel :label="label" v-if="label || $slots.label" :error="error" :focused="state.focused">
      <slot name="label"></slot>
    </FieldLabel>
    <div class="input-container" ref="inputContainerRef">
      <slot name="before"></slot>
      <slot name="input" :state="state">
        <input
          v-model="model"
          :placeholder="placeholder"
          :value="modelValue"
          :disabled="disabled"
          @focus="state.focused = true"
          @blur="state.focused = false"
          v-bind="$attrs"
          ref="inputRef"
        />
      </slot>
      <slot name="after"></slot>
    </div>

    <HeightTransition>
      <FieldMessage :message="message" v-if="message || $slots.message">
        <slot name="message" />
      </FieldMessage>
    </HeightTransition>
    <HeightTransition>
      <FieldMessage :message="errorMessage" v-if="errorMessage || $slots.errorMessage" error>
        <slot name="errorMessage" />
      </FieldMessage>
    </HeightTransition>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRef, ref, useSlots, computed } from "vue";
import HeightTransition from "../HeightTransition.vue";
import useColor from "@/composables/useColor";
import FieldMessage from "../internal/FieldMessage.vue";
import FieldLabel from "../internal/FieldLabel.vue";

export interface Props {
  modelValue?: string | number | null;
  label?: string;
  labelTag?: string;
  placeholder?: string;
  message?: string | number | null | boolean;
  sharp?: boolean;
  color?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string | boolean;
  containerClass?: string;
  tag?: any;
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const { color } = useColor(toRef(props, "color"));
const state = reactive({
  focused: false,
});
const inputRef = ref();
const inputContainerRef = ref();
const slots = useSlots();

const hasIcon = computed(() => slots.icon);

const model = computed({
  set: (e) => emit("update:modelValue", e),
  get: () => props.modelValue,
});

defineExpose({
  inputRef,
  inputContainerRef,
});
</script>

<style lang="scss">
.r-input {
  input,
  textarea {
    border: none;
    background: transparent;
    font-size: 1rem;
    padding: var(--r-normal-padding-y);
    font-family: inherit;
    width: 100%;
    color: inherit;
    @extend .scroll-bar;
  }
  input {
    height: var(--r-element-default-height);
  }

  label {
    flex: 1;
  }

  .input-container {
    background: color(b1);
    display: flex;
    // align-items: center;
    // gap: var(--r-space-1);
    border-radius: var(--r-radius);
    transition: box-shadow var(--r-duration);
    overflow: hidden;
    box-shadow: 0 0 0 var(--r-border-width) rgba(var(--r-border-color), var(--r-border-alpha));

    &:hover {
      box-shadow: 0 0 0 var(--r-border-width) rgba(var(--r-border-color), var(--r-border-active-alpha));
    }
  }

  .icon-container {
    padding: var(--r-space-2);
    display: flex;
    padding-right: 0;
    transition: color var(--duration);
  }

  &.focused {
    .icon-container {
      color: color();
    }

    .input-container {
      box-shadow: 0 0 0 1px color();
    }
  }

  &.disabled {
    opacity: 0.8;
  }

  &.sharp .input-container {
    --r-radius: 0px;
  }

  &.error {
    --r-color: var(--r-red) !important;

    .input-container {
      box-shadow: 0 0 0 var(--r-border-width) rgba(var(--r-red), 1);
      &:hover {
        box-shadow: 0 0 0 var(--r-border-width) rgba(var(--r-red), var(--r-border-active-alpha));
      }
    }
  }
}
</style>
