<template>
  <div
    :class="[
      'r-input',
      containerClass,
      { 'r-input_focused': state.focused, 'r-input_disabled': disabled, sharp, 'r-input_error': hasErrors },
    ]"
    :style="{ '--r-color': color || 'var(--r-prm)' }"
  >
    <FieldLabel :label="label" :hint="hint" :labelFor="id" v-if="label || hint || $slots.hint || $slots.label">
      <slot name="label"></slot>
      <template #hint> <slot name="hint"></slot> </template>
    </FieldLabel>
    <InputContainer @pointerdown="handlePointerDown" :focused="state.focused" :disabled="disabled">
      <slot name="before"></slot>
      <slot name="input" :state="state">
        <textarea
          v-if="textarea"
          v-model="model"
          ref="inputRef"
          v-bind="{ ...inputAttributes, ...$attrs }"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <input
          v-else
          v-model="model"
          ref="inputRef"
          v-bind="{ ...inputAttributes, ...$attrs }"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </slot>
      <slot name="after"></slot>
    </InputContainer>

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
import InputContainer from "../internal/InputContainer.vue";

export interface RInputProps {
  modelValue?: string | number | null;
  label?: string;
  placeholder?: string;
  message?: string | number | null | boolean;
  sharp?: boolean;
  color?: string;
  containerClass?: string;
  type?: string;
  textarea?: boolean;

  disabled?: boolean;
  error?: boolean;
  errorMessage?: string | boolean;
  id?: string;

  // add hint
  hint?: string | number | null;

  // When mousedown. skip focus when facing these items ( html selectors )
  skipFocusOn?: string;

  // add variant solid/transparent/default
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<RInputProps>(), {
  type: "text",
});
const emit = defineEmits<{
  "update:modelValue": [RInputProps["modelValue"]];
}>();

const { color } = useColor(toRef(props, "color"));
const slots = useSlots();

const state = reactive({
  focused: false,
});

const inputRef = ref<HTMLInputElement>();
const inputContainerRef = ref();

const inputAttributes = computed(() => {
  return {
    placeholder: props.placeholder,
    disabled: props.disabled,
    id: props.id,
    type: props.type,
  };
});

const model = computed({
  set: (e) => emit("update:modelValue", e),
  get: () => props.modelValue,
});

const focus = () => {
  inputRef.value?.focus();
};
const blur = () => {
  inputRef.value?.blur();
};

const handleFocus = () => {
  state.focused = true;
};

const handleBlur = () => {
  state.focused = false;
};

const handlePointerDown = (e: PointerEvent) => {
  const target = e.target as HTMLElement;

  const skippers = props.skipFocusOn ? `, ${props.skipFocusOn}` : "";

  if (target.closest(`input, button, a ${skippers}`)) return;

  requestAnimationFrame(() => {
    focus();
  });
};

const hasErrors = computed(() => !!props.error || !!props.errorMessage || !!slots.errorMessage);

defineExpose({
  focus,
  blur,
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
  textarea {
    border: none;
    background: transparent;
    font-size: 1rem;
    padding: var(--r-normal-padding-y);
    font-family: inherit;
    width: 100%;
    color: inherit;
  }

  &.sharp .r-input-container {
    --r-radius: 0px;
  }

  &_disabled {
    opacity: 0.75;
  }

  &_error {
    --r-color: var(--r-red) !important;
    --r-border-color: var(--r-red);
    --r-border-alpha: 1;
  }
}
</style>
