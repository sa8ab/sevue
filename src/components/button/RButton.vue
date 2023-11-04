<template>
  <component
    :is="renderComponent"
    @keyup.tab="focused = true"
    @blur="focused = false"
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
        iconOnly,
        focused,
        colorInherit,
        compact,
        block,
        loading,
        hasSize: size,
        isAutoHeight: isAutoHeight,
      },
    ]"
    :style="{
      '--r-color': color || 'var(--r-prm)',
      width: size,
      height: size,
    }"
    v-ripple="{ disabled: rippleDisabled }"
  >
    <slot name="icon" />
    <slot />
    <RLoading local :active="loading" :scale="0.48" :color="color || 'var(--r-prm)'">
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
import { useSlots, ref, computed, toRef, h } from "vue";

export interface Props {
  flat?: boolean;
  bordered?: boolean;
  fill?: boolean;
  link?: boolean;
  cancel?: boolean;
  color?: string;
  variant?: "light" | "fill" | "flat" | "bordered" | "text" | "transparent" | "textStyle" | "link" | "cancel";
  textStyle?: boolean;
  round?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
  colorInherit?: boolean;
  to?: any;
  href?: string;
  tag?: any;
  compact?: boolean;
  transparent?: boolean;
  block?: boolean;
  loading?: boolean;
  size?: string;
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
  variant: "light",
});
const color = useColor(toRef(props, "color"));

const focused = ref(false);

const isRouterLink = computed(() => !!props.to);
const isAnchorElement = computed(() => !!props.href);
const renderComponent = computed(() => {
  if (props.tag) return props.tag;
  if (isRouterLink.value) {
    if (nuxtOptions.isNuxt && nuxtOptions.NuxtLink) {
      return nuxtOptions.NuxtLink;
    } else {
      return "router-link";
    }
  }
  if (isAnchorElement.value) return "a";
  return "button";
});

const isAutoHeight = computed(() => {
  return props.autoHeight;
});

const rippleDisabled = computed(() => props.variant === "link" || props.variant === "transparent");
</script>

<style lang="scss">
button {
  border: none;
  color: inherit;
  font-size: 1rem;
  font-family: inherit;
}

.r-button {
  padding: 0 var(--r-normal-padding-x);
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
  height: var(--r-element-default-height);

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

  // variants
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
    color: color(primary-foreground);
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

.r-button {
  &.compact {
    padding: 0 var(--r-compact-normal-padding-x);
    height: var(--r-element-compact-height);
  }
  &.iconOnly {
    padding: 0;
    width: var(--r-element-default-height);
    height: var(--r-element-default-height);

    &.compact {
      width: var(--r-element-compact-height);
      height: var(--r-element-compact-height);
    }
  }

  &.block {
    width: 100%;
  }

  &.loading {
    pointer-events: none;
  }

  &.hasSize {
    padding: 0;
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

.r-button.focused {
  box-shadow: 0px 0px 0px calc(var(--r-space-1) / 2) color();
}
</style>
