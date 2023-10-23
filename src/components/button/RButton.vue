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
      variant || '',
      {
        flat,
        bordered,
        fill,
        link,
        cancel: cancel || disabled,
        disabled,
        textStyle,
        round,
        iconOnly,
        focused,
        colorInherit,
        compact,
        transparent,
        block,
        loading,
        hasSize: size,
      },
    ]"
    :style="{
      '--r-color': color || 'var(--r-prm)',
      '--r-text-color': textColor || 'var(--r-text)',
      width: size,
      height: size,
    }"
    v-ripple="{ disabled: transparent }"
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
  link?: boolean; // FIXME:
  cancel?: boolean;
  color?: string;
  variant?: "light" | "fill" | "flat" | "bordered" | "text" | "transparent";
  // TEXTCOLOR ONLY WORKS IN FILL STYLE
  textColor?: string;
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
const textColor = useColor(toRef(props, "textColor"));
const slots = useSlots();

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
</script>

<style lang="scss">
button {
  border: none;
  color: inherit;
  font-size: 1rem;
  font-family: inherit;
}

.r-button {
  padding: var(--r-normal-padding);
  border-radius: var(--r-radius);
  color: color();
  background: color(color, var(--r-light-alpha));
  transition: all 0.3s;
  display: inline-flex;
  user-select: none;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  gap: var(--r-space-2);

  &:hover {
    background: color(color, var(--r-hover-alpha));
  }
}

.r-button.round {
  border-radius: 50%;
}

.r-button.bordered {
  border: 1px solid color(color, 0.8);
}

.r-button.disabled {
  cursor: default !important;
  pointer-events: none;
}

.r-button.flat {
  background: transparent;

  &:hover {
    background: color(color, var(--r-hover-alpha));
  }
}

.r-button.fill {
  background: color();
  color: color(text-color);

  &:hover {
    background: color(color, 0.8);
  }
}

.r-button.link {
  padding: 0px;
}

.r-button.transparent {
  background: transparent;
  &:hover {
    background: transparent;
    color: color(color, 0.8);
  }
}

.r-button.cancel {
  --r-color: var(--r-disabled) !important;
}

.r-button.colorInherit {
  color: inherit;
}

.r-button.textStyle {
  background: transparent;
  color: inherit;

  &:hover {
    background: color(hover, var(--r-hover-alpha));
    color: inherit;
  }
}

.r-button {
  &.iconOnly {
    padding: var(--r-normal-padding-y);

    &.compact {
      padding: var(--r-compact-normal-padding-y);
    }
  }

  &.compact {
    padding: var(--r-compact-normal-padding);
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
.r-button.textStyle.disabled {
  color: color(disabled);
}

.r-button.fill.disabled {
  opacity: var(--disabled-alpha);
}

.r-button.focused {
  box-shadow: 0px 0px 0px calc(var(--r-space-1) / 2) color();
}
</style>
