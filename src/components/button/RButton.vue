<template>
  <component :is="renderComponent" @keyup.tab="focused = true" @blur="focused = false" :disabled="disabled" :to="to"
    :href="href" :class="[
      'r-button',
      {
        flat,
        bordered,
        fill,
        link,
        cancel: cancel || disabled,
        disabled,
        textStyle,
        icon,
        round,
        iconOnly,
        iconAfter,
        noPadding,
        focused,
        colorInherit,
      },
    ]" :style="{ '--r-prm': color, '--r-text': textColor }" v-ripple>
    <div class="inner">
      <slot name="icon">
        <i :class="['icon bx', icon]" v-if="icon"></i>
      </slot>
      <div class="icon-space" v-if="icon || $slots.icon"></div>
      <slot></slot>
    </div>
  </component>
</template>

<script lang="ts" setup>
/* TODO:
fix routing
dynamic icon slot & detect iconOnly
*/
import useColor from "@/composables/useColor";
import { useSlots, ref, computed, toRef } from "vue";


export interface Props {
  flat?: boolean
  bordered?: boolean
  fill?: boolean
  link?: boolean // FIXME:
  cancel?: boolean
  color?: string,
  // TEXTCOLOR ONLY WORKS IN FILL STYLE
  textColor?: string
  textStyle?: boolean
  round?: boolean
  disabled?: boolean
  icon?: string
  iconOnly?: boolean
  iconAfter?: boolean
  colorInherit?: boolean
  to?: string,
  href?: string
}
// interface LinkProps extends BaseProps {
//   to?: string,
//   href?: never
// }
// interface AnchorProps extends BaseProps {
//   to?: never,
//   href?: string
// }
// type Props = LinkProps | AnchorProps
const props = withDefaults(
  defineProps<Props>(),
  {}
)
const color = useColor(toRef(props, 'color'))
const textColor = useColor(toRef(props, 'textColor'))
const slots = useSlots();

const focused = ref(false);

const isRouterLink = computed(() => !!props.to);
const isAnchorElement = computed(() => !!props.href);
const renderComponent = computed(() => {
  if (isRouterLink.value) return 'router-link'
  if (isAnchorElement.value) return 'a'
  return 'button'
});
const noPadding = computed(() => slots.icon && props.iconOnly);
</script>

<style scoped lang="scss">
button {
  border: none;
  color: inherit;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
}

.r-button {
  padding: var(--r-normal-padding);
  border-radius: var(--r-radius);
  color: color();
  background: color(prm, var(--light-alpha));
  transition: all 0.3s;
  display: inline-block;
  user-select: none;

  &:hover {
    background: color(prm, var(--hover-alpha));
  }
}

.r-button.round {
  border-radius: 50%;
}

.icon-space {
  width: var(--r-normal-padding);
}

.r-button.bordered {
  border: 1px solid color(prm, 0.8);
}

.r-button.disabled {
  cursor: default !important;
  pointer-events: none;
}

.r-button .inner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.r-button.flat {
  background: transparent;

  &:hover {
    background: color(prm, var(--hover-alpha));
  }
}

.r-button.fill {
  background: color();
  color: color(text);

  &:hover {
    background: color(prm, 0.8);
  }
}

.r-button.link {
  background: transparent;
  color: color();
  padding: 0px 8px;

  &:hover {
    background: transparent;
    opacity: 0.8;
  }
}

.r-button.cancel {
  --r-prm: var(--r-disabled);
}

.r-button.colorInherit {
  color: inherit;
}

.r-button.textStyle {
  background: transparent;
  color: inherit;

  &:hover {
    background: color(hover, var(--hover-alpha));
  }
}

.r-button {
  &.iconAfter {
    .inner {
      flex-direction: row-reverse;
    }
  }

  &.iconOnly {
    width: 32px;
    height: 32px;

    // display: flex;
    // justify-content: center;
    // align-items: center;
    .icon {
      margin: 0;
    }

    .icon-space {
      width: 0;
    }
  }

  &.noPadding {
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

.focused {
  box-shadow: 0px 0px 0px calc(var(--r-space-1) / 2) color(prm);
}
</style>
