<template>
  <component
    :is="renderComponent"
    v-bind="specificProps"
    v-on="specificListeners"
    :class="[
      'ripple-button',
      {
        flat,
        bordered,
        fill,
        link,
        cancel: cancel || disabled,
        disabled,
        noColor,
        icon,
        iconOnly,
        iconOnlyAlt,
        iconLarge,
        iconAfter,
      },
    ]"
    :disabled="disabled"
    v-ripple="{ class: 'ripple-effect' }"
    :style="{ '--rgb-prm': $r.getColor(color) }"
  >
    <div class="inner">
      <i :class="['bx', icon]"></i>
      <div class="icon-space" v-if="icon"></div>
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
    renderComponent() {
      return this.isLink ? "nuxt-link" : this.isAnchor ? "a" : "button";
    },
    specificProps() {
      if (this.isLink) {
        return {
          to: this.localeRoute(this.to),
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
  },
};
</script>

<style scoped lang="scss">
button {
  border: none;
  color: inherit;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
}
.ripple-button {
  padding: 8px 12px;
  border-radius: $radius;
  color: color();
  background: color("prm", $lightA);
  transition: all 0.3s;
  display: inline-block;
  user-select: none;
}
// .bx {
//   margin: 0 2px;
// }
.icon-space {
  width: $p2;
}
.iconLarge .bx {
  font-size: 1.5rem;
}
.ripple-button.flat {
  background: transparent;
}
.ripple-button.bordered {
  border: 1px solid $btn-border;
}
.ripple-button.fill {
  background: $prm;
  color: white;
}
.ripple-button.link {
  background: transparent;
  color: $prm;
  padding: 0px 8px;
  &::v-deep {
    .ripple-effect {
      display: none !important;
      opacity: 0 !important;
    }
  }
  &:hover {
    background: transparent;
    opacity: 0.8;
  }
}
.ripple-button.fill:hover {
  background: color("prm", 0.8);
}
.ripple-button.cancel {
  color: $cancel;
  background: rgba($cancel, 0.4);
  &.flat {
    background: transparent;
  }
  &:hover {
    background: rgba($cancel, 0.4);
  }
}
// .ripple-button.red {
//   color: $red;
//   background: rgba($red, 0.2);
//   &.flat {
//     background: transparent;
//   }
//   &:hover {
//     background: rgba($red, 0.3);
//   }
// }
.ripple-button.noColor {
  color: $c1;
  background: transparent;
  &.flat {
    background: transparent;
  }
  &.fill {
    background: $b2;
  }
  &:hover {
    background: $b2-hover;
  }
}
.ripple-button.disabled {
  cursor: default !important;
}
.ripple-button:hover {
  background: $btn-hover;
}

.inner {
  display: flex;
  justify-content: center;
  align-items: center;
}
.iconAfter {
  .inner {
    flex-direction: row-reverse;
  }
}
.iconOnly,
.iconOnlyAlt {
  width: 32px;
  height: 32px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  .bx {
    margin: 0;
  }
}
.iconOnlyAlt {
  width: 36px;
  height: 36px;
}
</style>