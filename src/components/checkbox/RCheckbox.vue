<script setup lang="ts">
import { computed, toRef, ref } from "vue";
import SevueIcon from "@/components/icons/SevueIcon.vue";
import useColor from "@/composables/useColor";
import CheckboxRoot, { type CheckboxRootProps } from "./CheckboxRoot.vue";
import { useForwardRef } from "@/composables/useForwardRef";
import { useVModel } from "@vueuse/core";
import { useEmitsAsProps } from "@/composables/useEmitsAsProps";

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

const emitsAsProps = useEmitsAsProps(emit);

const { color, foreground } = useColor(toRef(props, "color"), toRef(props, "iconColor"));

const rootProps = computed(() => {
  const { color, iconColor, containerClass, ...rest } = props;
  return rest;
});

const { forwardRef } = useForwardRef();
</script>

<template>
  <CheckboxRoot
    :ref="forwardRef"
    v-bind="{ ...rootProps, ...emitsAsProps }"
    :containerAttrs="{
      class: ['r-cb', containerClass, { 'r-cb-disabled': disabled }],
      style: {
        '--r-color': color,
        '--r-foreground': foreground,
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
    color: color(foreground);
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
    color: color(foreground);
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
  &-disabled {
    pointer-events: none;
    opacity: var(--r-disabled-alpha);
  }

  .check-container:has(~ input:focus-visible) {
    box-shadow: var(--r-focused-box-shadow-specs) color();
    border-radius: var(--r-radius);
  }
}
</style>
