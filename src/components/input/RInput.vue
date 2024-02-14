<template>
  <div
    :class="['r-input', containerClass, { focused: state.focused, disabled, sharp, error: hasErrors }]"
    :style="{ '--r-color': color || 'var(--r-prm)' }"
    @pointerdown="handlePointerDown"
  >
    <FieldLabel :label="label" v-if="label || $slots.label" :focused="state.focused" :for="id">
      <slot name="label"></slot>
    </FieldLabel>
    <div class="input-container" ref="inputContainerRef">
      <slot name="before"></slot>
      <slot name="input" :state="state">
        <input
          v-model="model"
          ref="inputRef"
          :placeholder="placeholder"
          :disabled="disabled"
          :id="id"
          v-bind="$attrs"
          @focus="handleFocus"
          @blur="handleBlur"
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
  placeholder?: string;
  message?: string | number | null | boolean;
  sharp?: boolean;
  color?: string;
  containerClass?: string;

  disabled?: boolean;
  error?: boolean;
  errorMessage?: string | boolean;
  id?: string;

  // add hint

  // add variant solid/transparent/default
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [Props["modelValue"]];
}>();

const { color } = useColor(toRef(props, "color"));
const slots = useSlots();

const state = reactive({
  focused: false,
});

const inputRef = ref<HTMLInputElement>();
const inputContainerRef = ref();

const model = computed({
  set: (e) => emit("update:modelValue", e),
  get: () => props.modelValue,
});

const focus = () => {
  inputRef.value?.focus();
};

const handleFocus = () => {
  console.log("handle focus");

  state.focused = true;
};

const handleBlur = () => {
  state.focused = false;
};

const handlePointerDown = (e: PointerEvent) => {
  const target = e.target as HTMLElement;

  if (target.closest("input, button, a")) return;

  requestAnimationFrame(() => {
    focus();
  });
};

const hasErrors = computed(() => !!props.error || !!props.errorMessage || !!slots.errorMessage);

defineExpose({
  focus,
  inputRef,
  inputContainerRef,
});
</script>

<style lang="scss">
.r-input {
  input {
    border: none;
    background: transparent;
    font-size: 1rem;
    padding: var(--r-normal-padding-y);
    font-family: inherit;
    width: 100%;
    color: inherit;
    height: var(--r-element-default-height);
  }

  .input-container {
    background: color(b1);
    display: flex;
    border-radius: var(--r-radius);
    transition: box-shadow var(--r-duration);
    overflow: hidden;
    box-shadow: 0 0 0 var(--r-border-width) rgba(var(--r-border-color), var(--r-border-alpha));

    &:hover {
      box-shadow: 0 0 0 var(--r-border-width) rgba(var(--r-border-color), var(--r-border-active-alpha));
    }
  }

  &.focused {
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
