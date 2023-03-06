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
        noColor,
        icon,
        round,
        iconOnly,
        iconOnlyAlt,
        iconLarge,
        iconAfter,
        noPadding,
        focused,
        colorInherit,
      },
    ]" :style="{ '--r-prm': getColor(color), '--r-text': getColor(textColor) }" v-ripple>
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
// import { NuxtLink } from "#components";
import { getColor } from "@/utils";
import { useSlots, ref, computed } from "vue";

const props = defineProps({
  to: {
    type: String,
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
  flat: {
    default: false,
    type: Boolean,
  },
  bordered: {
    default: false,
    type: Boolean,
  },
  fill: {
    default: false,
    type: Boolean,
  },
  link: {
    default: false,
    type: Boolean,
  },
  cancel: {
    default: false,
    type: Boolean,
  },
  color: {
    default: "",
    type: String,
  },
  // TEXTCOLOR ONLY WORKS IN FLAT STYLE
  textColor: {
    default: "",
    type: String,
  },
  noColor: {
    default: false,
    type: Boolean,
  },
  round: {
    default: false,
    type: Boolean,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  icon: {
    default: "",
    type: String,
  },
  iconOnly: {
    default: false,
    type: Boolean,
  },
  iconOnlyAlt: {
    default: false,
    type: Boolean,
  },
  iconLarge: {
    default: false,
    type: Boolean,
  },
  iconAfter: {
    default: false,
    type: Boolean,
  },
  colorInherit: {
    default: false,
    type: Boolean,
  },
});

const slots = useSlots();

const focused = ref(false);

const isLink = computed(() => !!props.to || !!props.href);
const renderComponent = computed(() => (isLink.value ? "NuxtLink" : "button"));
const noPadding = computed(
  () => slots.icon && (props.iconOnly || props.iconOnlyAlt)
);
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
  padding: 8px 12px;
  border-radius: $radius;
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
  width: $p2;
}

.iconLarge .bx {
  font-size: 1.5rem;
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

.r-button.noColor {
  background: transparent;

  &:hover {
    background: color(hover);
  }
}

.r-button {
  &.iconAfter {
    .inner {
      flex-direction: row-reverse;
    }
  }

  &.iconOnly,
  &.iconOnlyAlt {
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

  &.iconOnlyAlt {
    width: 36px;
    height: 36px;
  }
}

.focused {
  box-shadow: 0px 0px 0px math.div($p, 2) color(prm);
}
</style>
