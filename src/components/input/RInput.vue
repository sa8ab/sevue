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
        <input
          v-model="model"
          ref="inputRef"
          :placeholder="placeholder"
          :disabled="disabled"
          :id="id"
          :type="type"
          v-bind="$attrs"
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

export interface Props {
  modelValue?: string | number | null;
  label?: string;
  placeholder?: string;
  message?: string | number | null | boolean;
  sharp?: boolean;
  color?: string;
  containerClass?: string;
  type?: string;

  disabled?: boolean;
  error?: boolean;
  errorMessage?: string | boolean;
  id?: string;

  // add hint
  hint?: string | number | null;

  // add variant solid/transparent/default
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});
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

  if (target.closest("input, button, a, [tabindex]")) return;

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
