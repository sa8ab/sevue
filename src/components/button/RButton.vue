<template>
  <component
    :is="renderComponent"
    v-bind="specificAttrs"
    :disabled="disabled"
    :class="[
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
      },
    ]"
    v-ripple="{ class: 'ripple-effect' }"
    :style="{ '--rgb-prm': '200, 100, 100' }"
  >
    <div class="inner">
      <slot name="icon">
        <!-- <i :class="['icon', $r.iconPrefix, icon]" v-if="icon"></i> -->
      </slot>
      <div class="icon-space" v-if="icon || $slots.icon"></div>
      <slot></slot>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { computed, useAttrs, useSlots } from "vue";

const props = defineProps({
  to: {
    default: "",
  },
  exact: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String,
    default: "",
  },
  download: {
    default: false,
    type: Boolean,
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
});
defineEmits(["click"]);

const slots = useSlots();
const attrs = useAttrs();

const isLink = computed(() => !!props.to);
const isAnchor = computed(() => !!props.href);
const isButton = computed(() => !isAnchor.value && !isLink.value);
const isNuxt = computed(() => false);
const renderComponent = computed(() =>
  isLink.value
    ? `${isNuxt.value ? "nuxt" : "router"}-link`
    : isAnchor.value
    ? "a"
    : "button"
);
const noPadding = computed(
  () => slots.icon && (props.iconOnly || props.iconOnlyAlt)
);
const specificAttrs = computed(() => {
  if (isLink.value) {
    return {
      to: props.to,
      exact: props.exact,
      ...attrs,
    };
  } else if (isAnchor.value) {
    return {
      href: props.href,
      target: props.target,
      ...attrs,
    };
  }
  return attrs;
});
</script>

<style lang="scss">
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
  background: color("prm", $lightA);
  transition: all 0.3s;
  display: inline-block;
  user-select: none;
}

.r-button.round {
  border-radius: 50%;
}

.icon-space {
  width: $p2;
}

// .icon {
//   line-height: 0 !important;
// }
.iconLarge .bx {
  font-size: 1.5rem;
}

.r-button.flat {
  background: transparent;
}

.r-button.bordered {
  border: 1px solid color("prm", 0.8);
}

.r-button.fill {
  background: color();
  color: white !important;
}

.r-button.link {
  background: transparent;
  color: color();
  padding: 0px 8px;

  &::v-deep {
    .r-effect {
      display: none !important;
      opacity: 0 !important;
    }
  }

  &:hover,
  &:focus {
    background: transparent;
    opacity: 0.8;
  }
}

.r-button.fill {
  &:hover,
  &:focus {
    background: color("prm", 0.8);
  }
}

.r-button.cancel {
  color: $cancel;
  background: rgba($cancel, 0.4);

  &.flat {
    background: transparent;
  }

  &:hover,
  &:focus {
    background: rgba($cancel, 0.4);
  }
}

// .r-button.red {
//   color: $red;
//   background: rgba($red, 0.2);
//   &.flat {
//     background: transparent;
//   }
//   &:hover {
//     background: rgba($red, 0.3);
//   }
// }
.r-button.noColor {
  color: inherit !important;
  background: transparent;

  &.flat {
    background: transparent;
  }

  &.fill {
    background: color("b2");
  }

  &:hover,
  &:focus {
    background: color("text", $lightA);
  }

  &.bordered {
    border: $border;
  }
}

.r-button.disabled {
  cursor: default !important;
  pointer-events: none;
}

.r-button:hover,
.r-button:focus {
  background: $btn-hover;
}

.r-button .inner {
  display: flex;
  justify-content: center;
  align-items: center;
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

    .icon {
      line-height: 0 !important;
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
</style>
