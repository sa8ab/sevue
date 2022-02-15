<template>
  <div
    :class="['r-input', { focused, red, disabled, iconAfter, sharp }]"
    :style="{ '--rgb-prm': $r.getColor(color) }"
  >
    <label>
      <span class="label" v-if="label">{{ label }}</span>
      <div class="input-container">
        <div class="icon-container" v-if="$slots.icon || icon">
          <slot name="icon">
            <i v-if="icon" :class="['icon', $r.iconPrefix, ...icon]"></i>
          </slot>
        </div>
        <input
          :type="type"
          :placeholder="placeholder"
          :value="value"
          v-on="listeners"
          v-bind="$attrs"
          :disabled="disabled"
        />
      </div>

      <HeightTransition>
        <span class="message" v-if="message">
          <span class="padding">{{ message }}</span>
        </span>
      </HeightTransition>
    </label>
  </div>
</template>

<script>
export default {
  name: "RInput",
  props: {
    value: {
      default: "",
    },
    label: {
      default: "",
      type: String,
    },
    icon: {
      default: "",
      type: String,
    },
    type: {
      default: "text",
      type: String,
    },
    placeholder: {
      default: "",
      type: String,
    },
    message: {
      default: "",
      type: String,
    },
    red: {
      default: false,
      type: Boolean,
    },
    iconAfter: {
      default: false,
      type: Boolean,
    },
    sharp: {
      default: false,
      type: Boolean,
    },
    color: {
      default: "",
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data: () => ({
    focused: false,
  }),
  methods: {},
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: (e) => {
          this.$emit("input", e.target.value);
        },
        focus: (e) => {
          this.focused = true;
          this.$emit("focus", e);
        },
        blur: (e) => {
          this.focused = false;
          this.$emit("blur", e);
        },
      };
    },
  },
};
</script>

<style lang="scss">
.r-input {
  input {
    border: none;
    background: transparent;
    font-size: 1rem;
    padding: 6px;
    font-family: inherit;
    width: 100%;
    color: color("text");
  }
  label {
    flex: 1;
  }
  .label,
  .message {
    display: flex;
    font-size: $fsmall;
    transition: all $duration;
  }
  .label {
    padding: 2px;
  }
  .message {
    color: $cancel;
    .padding {
      padding: 2px;
    }
  }
  .input-container {
    background: $b1;
    border-radius: $radius;
    flex: 1;
    display: flex;
    align-items: center;
    border: 1px solid $b1;
    transition: border $duration;
    overflow: hidden;
  }
  .icon-container {
    padding: 6px;
    transition: color $duration;
  }
  &.focused {
    .icon-container,
    .label {
      color: color();
    }
    .input-container {
      border: 1px solid color();
      box-shadow: $shadow;
    }
  }
  &.red {
    .icon-container,
    .label {
      color: color("red");
    }
    .input-container {
      border: 1px solid color("red");
    }
  }
  &.disabled {
    opacity: 0.8;
  }
  &.iconAfter .input-container {
    flex-direction: row-reverse;
  }
  &.sharp .input-container {
    --r-radius: 0px;
  }
}
</style>