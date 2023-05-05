<template>
  <div
    :class="['r-input', containerClass, { focused: state.focused, disabled, iconAfter, sharp, error, hasIcon }]"
    :style="{ '--r-color': color || 'var(--r-prm)' }"
  >
    <span class="label" v-if="label">{{ label }}</span>
    <div class="input-container" ref="inputContainerRef">
      <slot name="before"></slot>
      <label class="label-element" @click="labelClick">
        <div class="icon-container" v-if="hasIcon" @click="iconClick">
          <slot name="icon">
            <i v-if="icon" :class="['icon', iconPrefix, icon]"></i>
          </slot>
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
import { reactive, toRef, ref, useSlots, computed } from "vue";
import HeightTransition from "../HeightTransition.vue";
import useColor from "@/composables/useColor";
import { useSevue } from "@/main";
export interface Props {
  modelValue?: string | number | null;
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
  tag?: any;
}

const { iconPrefix } = useSevue();

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
    padding: var(--r-space-2);
    font-family: inherit;
    width: 100%;
    color: inherit;
    @extend .scroll-bar;
  }
  input {
    height: var(--r-element-min-height);
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
    // align-items: center;
    // gap: var(--r-space-1);
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
    --r-color: var(--r-red) !important;
    --border: 0 0 0 var(--r-border-width) rgba(var(--r-red), 1);
    --border-active: 0 0 0 var(--r-border-width) rgba(var(--r-red), var(--border-active-alpha));

    .label {
      color: color(red);
    }
  }
}
</style>
