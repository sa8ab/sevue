<template>
  <div
    :class="['r-input', { focused: state.focused, disabled, iconAfter, sharp, error }]"
    :style="{ '--r-prm': color }"
  >
    <label>
      <span class="label" v-if="label">{{ label }}</span>
      <div class="input-container">
        <div class="icon-container" v-if="$slots.icon || icon">
          <slot name="icon">
            <i v-if="icon" :class="['icon', sevue?.iconPrefix, ...icon]"></i>
          </slot>
        </div>
        <input
          :placeholder="placeholder"
          :value="modelValue"
          :disabled="disabled"
          v-bind="$attrs"
          @focus="state.focused = true"
          @blur="state.focused = false"
          @input="onInput"
        />
      </div>

      <HeightTransition>
        <span class="message" v-if="message">
          <span class="padding">{{ message }}</span>
        </span>
      </HeightTransition>
    </label>
  </div>
</template>

<script setup lang="ts">
import { inject, reactive, toRef } from "vue";
import { sevueKey } from "@/injectionKeys";
import HeightTransition from "../HeightTransition.vue";
import useColor from "@/composables/useColor";

const sevue = inject(sevueKey);

defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{
  modelValue?: string;
  label?: string;
  icon?: string;
  placeholder?: string;
  message?: string;
  iconAfter?: boolean;
  sharp?: boolean;
  color?: string;
  disabled?: boolean;
  error?: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);
const color = useColor(toRef(props, 'color'))
const state = reactive({
  focused: false,
});

const onInput = (e: Event) => {
  emit("update:modelValue", (<HTMLInputElement>e.target).value);
};
// listeners() {
//   return {
//     ...this.$listeners,
//     input: (e) => {
//       this.$emit("input", e.target.value);
//     },
//     focus: (e) => {
//       this.focused = true;
//       this.$emit("focus", e);
//     },
//     blur: (e) => {
//       this.focused = false;
//       this.$emit("blur", e);
//     },
//   };
// },
</script>

<style lang="scss">
.r-input {
  input {
    border: none;
    background: transparent;
    font-size: 1rem;
    padding: 6px;
    font-family: inherit;
    width: 100%;
    color: inherit;
  }

  label {
    flex: 1;
  }

  .label,
  .message {
    display: flex;
    font-size: $fsmall;
    transition: all $duration;
  }

  .label {
    padding: 2px;
  }

  .message {
    color: color(disabled);

    .padding {
      padding: 2px;
    }
  }

  .input-container {
    background: color(b1);
    border-radius: var(--r-radius);
    flex: 1;
    display: flex;
    align-items: center;
    transition: box-shadow $duration;
    overflow: hidden;
    box-shadow: var(--border);
    &:hover {
      box-shadow: var(--border-active);
    }
  }

  .icon-container {
    padding: 6px;
    transition: color $duration;
  }

  &.focused {
    .icon-container,
    .label {
      color: color();
    }

    .input-container {
      box-shadow: 0 0 0 1px color();
    }
  }

  &.disabled {
    opacity: 0.8;
  }

  &.iconAfter .input-container {
    flex-direction: row-reverse;
  }

  &.sharp .input-container {
    --r-radius: 0px;
  }

  &.error {
    --r-prm: var(--r-red);
    --border: 0 0 0 1px rgba(var(--r-red), 1);
    --border-active: 0 0 0 1px rgba(var(--r-red), var(--border-active-alpha));
    .label {
      color: color(red);
    }
  }
}
</style>
