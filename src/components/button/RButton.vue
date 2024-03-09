<template>
  <component
    :is="renderComponent"
    :disabled="disabled"
    v-bind="
      isRouterLink
        ? {
            to,
          }
        : {
            href,
          }
    "
    :class="[
      'r-button',
      variant ? `r-button-${variant}` : '',
      size ? `r-button-${size}` : '',
      {
        flat,
        'r-button-bordered': bordered,
        'r-button-fill': fill,
        'r-button-link': link,
        cancel: cancel || disabled,
        'r-button-disabled': disabled,
        'r-button-text': textStyle,
        'r-button-round': round,
        'r-button-transparent': transparent,
        'r-button-icon-only': iconOnly,
        colorInherit,
        block,
        loading,
        hasCustomSize: customSize,
        isAutoHeight: isAutoHeight,
      },
    ]"
    :style="{
      '--r-color': color,
      '--r-foreground': foreground,
      '--r-height': height,
      '--r-width': width,
    }"
    v-ripple="{ disabled: rippleDisabled }"
  >
    <slot name="icon" />
    <slot />
    <RLoading
      local
      :active="loading"
      :scale="0.48"
      :color="color || 'var(--r-prm)'"
      containerClass="r-button-loading-component"
    >
      <template #spinner>
        <slot name="spinner" />
      </template>
    </RLoading>
  </component>
</template>

<script lang="ts" setup>
/* TODO:
dynamic icon slot & detect iconOnly
*/
import useColor from "@/composables/useColor";
import { useSevue, RLoading } from "@/main";
import { ref, computed, toRef } from "vue";

export interface Props {
  flat?: boolean;
  bordered?: boolean;
  fill?: boolean;
  link?: boolean;
  cancel?: boolean;
  color?: string;
  textColor?: string;
  variant?: "light" | "fill" | "flat" | "bordered" | "text" | "transparent" | "textStyle" | "link" | "cancel";
  textStyle?: boolean;
  round?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
  colorInherit?: boolean;
  to?: any;
  href?: string;
  tag?: any;
  transparent?: boolean;
  block?: boolean;
  loading?: boolean;
  customSize?: string;
  size?: "default" | "small" | "large";
  autoHeight?: boolean;
}

const { nuxtOptions } = useSevue();
// interface LinkProps extends BaseProps {
//   to?: string,
//   href?: never
// }
// interface AnchorProps extends BaseProps {
//   to?: never,
//   href?: string
// }
// type Props = LinkProps | AnchorProps
const props = withDefaults(defineProps<Props>(), {
  color: "prm",
  variant: "light",
});
const { color, foreground } = useColor(toRef(props, "color"), toRef(props, "textColor"));

const isRouterLink = computed(() => !!props.to);
const isAnchorElement = computed(() => !!props.href);
const renderComponent = computed(() => {
  if (props.tag) return props.tag;

  if ((isRouterLink.value || isAnchorElement.value) && nuxtOptions.NuxtLink) {
    return nuxtOptions.NuxtLink;
  }

  if (isRouterLink.value) {
    return "router-link";
  }

  if (isAnchorElement.value) return "a";

  return "button";
});

const isAutoHeight = computed(() => {
  return props.autoHeight;
});

const rippleDisabled = computed(() => props.variant === "link" || props.variant === "transparent");

const height = computed(() => {
  if (props.customSize) return props.customSize;

  const size = props.size;
  if (size === "default" || !size) return "var(--r-element-default-height)";
  if (size === "small") return "var(--r-element-small-height)";
  if (size === "large") return "var(--r-element-large-height)";
});
const width = computed(() => {
  if (props.customSize) return props.customSize;
  if (props.block) return "100%";
  if (!props.iconOnly) return "initial";
  const size = props.size;
  if (size === "default" || !size) return "var(--r-element-default-height)";
  if (size === "small") return "var(--r-element-small-height)";
  if (size === "large") return "var(--r-element-large-height)";
});
</script>

<style lang="scss">
button {
  border: none;
  color: inherit;
  font-size: 1rem;
  font-family: inherit;
}

.r-button {
  border-radius: var(--r-radius);
  color: color();
  background: color(color, var(--r-light-alpha));
  transition: all 0.3s;
  display: inline-flex;
  user-select: none;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  gap: var(--r-space-2);
  height: var(--r-height);
  width: var(--r-width);
  // for loading
  overflow: hidden;

  &-round {
    border-radius: 50%;
  }

  &-cancel {
    --r-color: var(--r-disabled) !important;
  }
  &-disabled {
    --r-color: var(--r-disabled) !important;
    pointer-events: none;
  }

  // VARIANTS
  &-light {
    &:hover {
      background: color(color, var(--r-hover-alpha));
    }
  }

  &-bordered {
    border: 1px solid color(border-color, var(--r-border-alpha));
    background-color: transparent;
    &:hover {
      background: color(color, var(--r-hover-alpha));
    }
  }

  &-flat {
    background: transparent;
    &:hover {
      background: color(color, var(--r-hover-alpha));
    }
  }

  &-fill {
    background: color();
    color: color(foreground);
    &:hover {
      background: color(color, 0.8);
    }
  }

  &-link {
    padding: 0px;
    background: transparent;
    height: auto;
    &:hover {
      text-decoration: underline;
    }
  }

  &-transparent {
    background: transparent;
    &:hover {
      color: color(color, 0.8);
    }
  }

  &-text,
  &-textStyle {
    background: transparent;
    color: inherit;
    &:hover {
      background: color(hover, var(--r-hover-alpha));
    }
  }

  &.isAutoHeight {
    height: auto !important;
  }
}

.r-button.colorInherit {
  color: inherit;
}

// SIZES
.r-button {
  padding: 0 var(--r-normal-padding-x);
  &-small {
    font-size: var(--r-font-small);
  }
  &-large {
    font-size: var(--r-font-large);
  }

  &-icon-only,
  &.hasCustomSize {
    padding: 0;
  }

  &.loading {
    pointer-events: none;
  }
}

// Specials
.r-button {
  &-text,
  &-textStyle {
    &.r-button-disabled {
      color: color(disabled);
    }
  }

  &-fill {
    &.r-button-disabled {
      opacity: var(--disabled-alpha);
    }
  }
}

.r-button:focus-visible {
  box-shadow: 0px 0px 0px calc(var(--r-space-1) / 2) color();
}
</style>
