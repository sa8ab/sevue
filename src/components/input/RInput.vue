<template>
  <div
    :class="[
      'r-input',
      containerClass,
      { focused: state.focused, disabled, iconAfter, sharp, error, hasIcon },
    ]"
    :style="{ '--r-prm': color }"
    @click="containerClick"
  >
    <label >
      <span class="label" v-if="label">{{ label }}</span>
      <div class="input-container" ref="inputContainerRef">
        <div class="icon-container" v-if="hasIcon" @click="iconClick">
          <slot name="icon">
            <i v-if="icon" :class="['icon', sevue?.iconPrefix, icon]"></i>
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
          ref="inputRef"
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
import { inject, reactive, toRef, ref, useSlots, computed } from "vue";
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
  containerClass?: string;
}>();
const emit = defineEmits(["update:modelValue", "containerClick", "iconClick"]);
const color = useColor(toRef(props, "color"));
const state = reactive({
  focused: false,
});
const inputRef = ref();
const inputContainerRef = ref();
const slots = useSlots()

const hasIcon = computed(() => slots.icon || props.icon)

const onInput = (e: Event) => {
  emit("update:modelValue", (<HTMLInputElement>e.target).value);
};
const containerClick = (e: Event) => {
  emit("containerClick", e);
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
    padding: $p2;
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
    padding: $p2;
    display: flex;
    padding-right: 0;
    transition: color $duration;
  }
  &.iconAfter {
    .icon-container{
      padding-right: $p2;
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
