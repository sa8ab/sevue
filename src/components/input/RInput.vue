<template>
  <div
    :class="['r-input', containerClass, { focused: state.focused, disabled, iconAfter, sharp, error, hasIcon }]"
    :style="{ '--r-color': color || 'var(--r-prm)' }"
  >
    <FieldLabel :label="label" v-if="label || $slots.label" :error="error" :focused="state.focused">
      <slot name="label"></slot>
    </FieldLabel>
    <div class="input-container" ref="inputContainerRef">
      <slot name="before"></slot>
      <component :is="labelTag || 'label'" class="label-element" @click="labelClick">
        <div class="icon-container" v-if="hasIcon" @click="iconClick">
          <slot name="icon"> </slot>
        </div>
        <slot name="input" :state="state">
          <component
            :is="tag ? tag : 'input'"
            :placeholder="placeholder"
            :value="modelValue"
            :disabled="disabled"
            @focus="state.focused = true"
            @blur="state.focused = false"
            @input="onInput"
            v-bind="$attrs"
            ref="inputRef"
          />
        </slot>
      </component>
      <slot name="after"></slot>
    </div>

    <HeightTransition>
      <FieldMessage :message="message" v-if="message || $slots.message">
        <slot name="message" />
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
  iconAfter?: boolean;
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
const emit = defineEmits(["update:modelValue", "labelClick", "iconClick"]);
const { color } = useColor(toRef(props, "color"));
const state = reactive({
  focused: false,
});
const inputRef = ref();
const inputContainerRef = ref();
const slots = useSlots();

const hasIcon = computed(() => slots.icon);

const onInput = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
const labelClick = (e: Event) => {
  emit("labelClick", e);
};
const iconClick = (e: Event) => {
  emit("iconClick", e);
};
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

  .label-element {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .icon-container {
    padding: var(--r-space-2);
    display: flex;
    padding-right: 0;
    transition: color var(--duration);
  }

  &.iconAfter {
    .icon-container {
      padding-right: var(--r-space-2);
      padding-left: 0;
    }
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

  &.iconAfter .label-element {
    flex-direction: row-reverse;
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
