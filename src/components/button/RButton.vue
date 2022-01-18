<template>
  <component
    :is="renderComponent"
    v-bind="specificProps"
    v-on="specificListeners"
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
    :disabled="disabled"
    v-ripple="{ class: 'ripple-effect' }"
    :style="{ '--rgb-prm': $r.getColor(color) }"
  >
    <div class="inner">
      <slot name="icon">
        <i :class="['icon', $r.iconPrefix, icon]" v-if="icon"></i>
      </slot>
      <div class="icon-space" v-if="icon || $slots.icon"></div>
      <slot></slot>
    </div>
  </component>
</template>

<script>
export default {
  name: "RButton",
  props: {
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
  },
  computed: {
    isLink() {
      return !!this.to;
    },
    isAnchor() {
      return !!this.href;
    },
    isButton() {
      return !this.isAnchor && !this.isLink;
    },
    isNuxt() {
      return !!this.$nuxt;
    },
    renderComponent() {
      return this.isLink
        ? `${this.isNuxt ? "nuxt" : "router"}-link`
        : this.isAnchor
        ? "a"
        : "button";
    },
    specificProps() {
      if (this.isLink) {
        return {
          to: this.to,
          exact: this.exact,
        };
      } else if (this.isAnchor) {
        return {
          href: this.href,
          target: this.target,
        };
      }
      return {};
    },
    specificListeners() {
      if (this.isButton) {
        return {
          click: (e) => {
            e.preventDefault();
            this.$emit("click");
          },
        };
      }
      return {};
    },
    noPadding() {
      return this.$slots.icon && (this.iconOnly || this.iconOnlyAlt);
    },
  },
};
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
  &:hover {
    background: transparent;
    opacity: 0.8;
  }
}
.r-button.fill:hover {
  background: color("prm", 0.8);
}
.r-button.cancel {
  color: $cancel;
  background: rgba($cancel, 0.4);
  &.flat {
    background: transparent;
  }
  &:hover {
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
  &:hover {
    background: color("text", $lightA);
  }
}
.r-button.disabled {
  cursor: default !important;
}
.r-button:hover {
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