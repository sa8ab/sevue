<template>
  <label
    :class="['r-cb', { isChecked }]"
    :style="{ '--rgb-prm': $r.getColor(color) }"
  >
    <input
      type="checkbox"
      :value="val"
      v-model="model"
      :trueValue="trueValue"
      :falseValue="falseValue"
    />
    <div class="check-container">
      <CheckIcon class="icon" />
      <div class="background"></div>
    </div>
    <slot />
  </label>
</template>

<script>
import CheckIcon from "../icons/CheckIcon.vue";
export default {
  name: "RCheckbox",
  components: {
    CheckIcon,
  },
  props: {
    value: { default: "" },
    val: { default: undefined, type: [String, Number, Object, Array] },
    color: { default: "", type: String },
    trueValue: { default: true },
    falseValue: { default: false },
  },
  data: () => ({
    x: false,
  }),
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
      console.log(e.target.value);
    },
  },
  computed: {
    model: {
      set(e) {
        this.$emit("input", e);
      },
      get() {
        return this.value;
      },
    },
    isChecked() {
      if (this.value instanceof Array) {
        // if (typeof this.val === "object") {
        //   return !!this.value.find((item) => {
        //     console.log(JSON.stringify(item) == JSON.stringify(this.value));
        //     return JSON.stringify(item) == JSON.stringify(this.value);
        //   });
        // }
        return this.value.includes(this.val);
      }
      return this.value === this.trueValue;
    },
  },
};
</script>

<style lang="scss">
.r-cb {
  color: color("text");
  user-select: none;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: $p;
  &:hover {
    .check-container {
      background: $hover;
    }
  }
  input {
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    z-index: 0;
    // visibility: hidden;
  }
  .check-container {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: $radius;
    overflow: hidden;
    border: 2px solid $hover;
    transition: all $duration;
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: color();
    z-index: 1;
    transform: translateY(100%);
    transition: transform $duration;
    // border-radius: $radius;
  }
  .icon {
    position: relative;
    z-index: 2;
    transform: scale(0);
    transition: transform $duration / 2;
    transition-delay: $duration / 2;
  }
  &.isChecked {
    &:hover {
      .check-container {
        box-shadow: 0 2px 8px color();
      }
    }
    .check-container {
      border-color: color();
    }
    .background {
      transform: translateY(0);
    }
    .icon {
      transform: scale(1);
    }
  }
}
</style>