<script setup lang="ts">
import { computed, toRef, ref } from "vue";
import SevueIcon from "@/components/icons/SevueIcon.vue";
import useColor from "@/composables/useColor";
import CheckboxRoot, { type CheckboxRootProps } from "./CheckboxRoot.vue";
import { useForwardRef } from "@/composables/useForwardRef";

export interface RCheckboxProps extends CheckboxRootProps {
  color?: string;
  iconColor?: string;
  containerClass?: string;
}

const props = withDefaults(defineProps<RCheckboxProps>(), {
  color: "prm",
  as: "label",
});

const emit = defineEmits(["update:modelValue"]);

const { color, foreground } = useColor(toRef(props, "color"), toRef(props, "iconColor"));

const model = computed({
  set(e: CheckboxRootProps["modelValue"]) {
    emit("update:modelValue", e);
  },
  get() {
    return props.modelValue;
  },
});

const { forwardRef } = useForwardRef();
</script>

<template>
  <CheckboxRoot
    :as="as"
    v-model="model"
    :value="value"
    :disabled="disabled"
    :ref="forwardRef"
    :containerAttrs="{
      class: ['r-cb', containerClass, { disabled }],
      style: {
        '--r-color': color,
        '--r-foreground-color': foreground,
      },
    }"
  >
    <template #default="{ isChecked }">
      <div :class="['check-container', { isChecked }]">
        <slot name="icon">
          <SevueIcon name="check" class="r-checkbox-icon" />
        </slot>
        <div class="background"></div>
      </div>
      <div class="r-cb-slot">
        <slot />
      </div>
    </template>
  </CheckboxRoot>
</template>

<style lang="scss">
.r-cb {
  user-select: none;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--r-space-1);

  &:hover {
    .check-container {
      background: color(hover, var(--r-hover-alpha));
    }
  }

  .check-container {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    border-radius: var(--r-radius);
    overflow: hidden;
    border: 2px solid color(hover, var(--r-hover-alpha));
    transition: all var(--r-duration);
    color: color(text-color);
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: color();
    z-index: 0 !important;
    transform: translateY(100%);
    transition: all var(--r-duration);
    border-radius: 50%;
    opacity: 0;
  }

  .r-checkbox-icon {
    position: relative;
    z-index: 2;
    opacity: 0;
    transform: scale(0.8);
    transition: all calc(var(--r-duration));
    // transition-delay: calc(var(--r-duration) / 2);
    color: color(text-color);
  }
  .r-cb-slot {
    flex: 1;
  }

  .isChecked {
    &.check-container {
      border-color: color();
    }

    .background {
      transform: translateY(0);
      opacity: 1;
      border-radius: 0;
    }

    .r-checkbox-icon {
      transform: scale(1);
      opacity: 1;
    }
  }
  &.disabled {
    pointer-events: none;
    opacity: var(--r-disabled-alpha);
  }

  .check-container:has(~ input:focus-visible) {
    box-shadow: var(--r-focused-box-shadow-specs) color();
    border-radius: var(--r-radius);
  }
}
</style>
