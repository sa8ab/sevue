<template>
  <div :class="[
    'r-input',
    containerClass,
    { focused: state.focused, disabled, iconAfter, sharp, error, hasIcon },
  ]"
    :style="{ '--r-prm': color }">
    <span class="label" v-if="label">{{ label }}</span>
    <div class="input-container" ref="inputContainerRef">
      <label class="label-element" @click="labelClick">
        <div class="icon-container" v-if="hasIcon" @click="iconClick">
          <slot name="icon">
            <i v-if="icon" :class="['icon', sevue?.iconPrefix, icon]"></i>
          </slot>
        </div>
        <input :placeholder="placeholder" :value="modelValue" :disabled="disabled" v-bind="$attrs"
          @focus="state.focused = true" @blur="state.focused = false" @input="onInput" ref="inputRef" />
      </label>
      <slot name="after"></slot>
    </div>

    <HeightTransition>
      <span class="message" v-if="message">
        <span class="padding">{{ message }}</span>
      </span>
    </HeightTransition>
  </div>
</template>

<script setup lang="ts">
import { inject, reactive, toRef, ref, useSlots, computed } from "vue";
import { sevueKey } from "@/injectionKeys";
import HeightTransition from "../HeightTransition.vue";
import useColor from "@/composables/useColor";
export interface Props {
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
  containerClass?: string;
}

const sevue = inject(sevueKey);

defineOptions({
  inheritAttrs: false,
});


const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "labelClick", "iconClick"]);
const color = useColor(toRef(props, "color"));
const state = reactive({
  focused: false,
});
const inputRef = ref();
const inputContainerRef = ref();
const slots = useSlots();

const hasIcon = computed(() => slots.icon || props.icon);

const onInput = (e: Event) => {
  emit("update:modelValue", (<HTMLInputElement>e.target).value);
};
const labelClick = (e: Event) => {
  emit("labelClick", e);
};
const iconClick = (e: Event) => {
  emit("iconClick", e);
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
defineExpose({
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
    padding: var(--r-normal-padding);
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
    font-size: var(--r-font-small);
    transition: all var(--r-duration);
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
    display: flex;
    align-items: center;
    gap: var(--r-space-1);
    border-radius: var(--r-radius);
    transition: box-shadow var(--r-duration);
    overflow: hidden;
    box-shadow: var(--border);

    &:hover {
      box-shadow: var(--border-active);
    }
  }

  .label-element {
    display: flex;
    align-items: center;
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

  &.iconAfter .label-element {
    flex-direction: row-reverse;
  }

  &.sharp .input-container {
    --r-radius: 0px;
  }

  &.error {
    --r-prm: var(--r-red);
    --border: 0 0 0 var(--r-border-width) rgba(var(--r-red), 1);
    --border-active: 0 0 0 var(--r-border-width) rgba(var(--r-red), var(--border-active-alpha));

    .label {
      color: color(red);
    }
  }
}
</style>
