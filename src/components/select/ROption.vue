<template>
  <HeightTransition>
    <div
      :class="['r-select-item r', { active: isActive, focused, disabled }]"
      @click="onClick"
      v-if="visible"
      v-ripple
      tabindex="-1"
      :style="{ '--rgb-prm': $r.getColor(select().color) }"
    >
      <div class="padding">
        <slot> {{ text }} </slot>
      </div>
    </div>
  </HeightTransition>
</template>

<script>
export default {
  name: "RSelectItem",
  inject: {
    select: {
      default: () => ({}),
    },
  },
  props: {
    text: {
      default: "",
      type: String,
    },
    value: {
      default: 0,
    },
    disabled: { default: false, type: Boolean },
  },
  data: () => ({}),
  created() {},
  methods: {
    onClick() {
      this.onSelectValue();
    },
    onSelectValue() {
      this.select().onSelectValue({
        event: this.value,
        activate: this.isActive ? false : true,
      });
    },
  },
  computed: {
    visible() {
      return this.text
        .toLowerCase()
        .includes(this.select().search.toLowerCase());
    },
    focused() {
      if (this.select().focusedItemValue) {
        return this.value === this.select().focusedItemValue.value;
      }
    },
    isActive() {
      const value = this.select().value;
      if (this.select().multiple) {
        return !!value.find((x) => x === this.value);
      } else {
        return value == this.value;
      }
    },
  },
  watch: {
    // focused(isFocused) {
    //   if (isFocused) {
    //     // this.$nextTick(() => {
    //     this.$refs.el.focus({ preventScroll: true });
    //     // });
    //   }
    // },
  },
};
</script>

<style lang="scss">
.r-select-item {
  width: 100%;
  font-size: $fsmall;
  margin-bottom: $p / 2;
  padding: 0 !important;
  .padding {
    padding: $bp;
  }
  &:hover {
    background: $hover;
  }
  &:last-child {
    margin-bottom: 0;
  }
  &.focused {
    background: $hover;
    outline: 1px dashed color();
  }
  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  &.active {
    color: color();
    background: color("prm", $lightA) !important;
  }
}
</style>