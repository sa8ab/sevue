<template>
  <div
    :class="['r-pagination notRTL', { bordered, disabled, compact }]"
    :style="{
      '--rgb-prm': $r.getColor(color),
      '--rgb-active-text-color': $r.getColor(activeTextColor),
    }"
  >
    <RButton
      class="r-pagination-item r-pagination-navigation prev"
      @click="decrease"
      v-bind="buttonProps"
      v-if="!noNavigation"
    >
      <slot name="prev"><ChevronLeft /></slot>
    </RButton>
    <div class="r-pagination-main">
      <template v-for="(item, i) in items">
        <RButton
          :class="['r-pagination-item', { active: item === value }]"
          :key="i"
          @click="setValue(item)"
          v-bind="buttonProps"
          v-if="item !== 'blank'"
        >
          {{ item }}
        </RButton>
        <RButton
          :key="i + 'blank'"
          iconOnly
          v-bind="buttonProps"
          class="r-pagination-item r-pagination-item-blank"
          v-else
        >
          ...
        </RButton>
      </template>
    </div>
    <RButton
      class="r-pagination-item r-pagination-navigation next"
      @click="increase"
      v-bind="buttonProps"
      v-if="!noNavigation"
    >
      <slot name="next"><ChevronRight /></slot>
    </RButton>
    <!-- <div class="r-pagination-compact-navigation" v-if="compact">
    </div> -->

    <!-- <div class="logger">
    <pre>{{
      {
        shouldCreateSpaceOnLeft,
        shouldCreateSpaceOnRight,
        value,
        mainRange,
        sideRange,
      }
    }}</pre>
    {{ items }} - count: {{ items.length }}
  </div> -->
  </div>
</template>

<script>
import DotsIcon from "../icons/DotsIcon.vue";
import RButton from "../button/RButton.vue";
import ChevronRight from "../icons/ChevronRight.vue";
import ChevronLeft from "../icons/ChevronLeft.vue";
export default {
  components: { RButton, DotsIcon, ChevronRight, ChevronLeft },
  name: "RPagination",
  props: {
    color: { type: String },
    activeTextColor: { type: String, default: "#fff" },
    count: { type: Number },
    sideRange: { type: Number, default: 2 },
    mainRange: { type: Number, default: 1 },
    value: { type: Number, default: 1 },
    bordered: { type: Boolean, default: true },
    buttonProps: { default: () => ({ flat: true, noColor: true }) },
    disabled: { type: Boolean, default: false },
    noNavigation: { type: Boolean, default: false },
    compact: { type: Boolean, default: false },
  },
  data: () => ({}),
  methods: {
    setValue(val) {
      this.$emit("input", val);
    },
    decrease() {
      const res = this.value - 1;
      res !== 0 && this.$emit("input", res);
    },
    increase() {
      const res = this.value + 1;
      res <= this.count && this.$emit("input", res);
    },
  },
  computed: {
    items() {
      const initialItems = [...Array(this.count).keys()].map((x) => x + 1);
      const toReturn = initialItems.filter((item) => {
        let isRemovedFromLeft;
        let isRemovedFromRight;
        if (this.shouldCreateSpaceOnLeft) {
          isRemovedFromLeft =
            item > this.sideRange &&
            item < this.value - this.mainRange &&
            item < this.count - this.sideRange - this.mainRange * 2 - 1;
        }
        if (this.shouldCreateSpaceOnRight) {
          isRemovedFromRight =
            item > this.value + this.mainRange &&
            item < this.count - this.sideRange + 1 &&
            item > this.sideRange + this.mainRange * 2 + 2;
        }
        return !isRemovedFromLeft && !isRemovedFromRight;
      });
      if (this.shouldCreateSpaceOnLeft) {
        toReturn.splice(this.sideRange, 0, "blank");
      }
      if (this.shouldCreateSpaceOnRight) {
        toReturn.splice(toReturn.length - this.sideRange, 0, "blank");
      }
      initialItems.forEach(() => {});
      return toReturn;
    },
    cantAddSpace() {
      return (
        this.count <= this.sideRange * 2 + this.mainRange * 2 + 3
      ); /* one for Selected number, two for blanks which could have been numbers */
    },
    shouldCreateSpaceOnLeft() {
      if (this.cantAddSpace) return false;
      return this.value - this.mainRange > this.sideRange + 2;
    },
    shouldCreateSpaceOnRight() {
      if (this.cantAddSpace) return false;
      return this.value + this.mainRange < this.count - this.sideRange - 1;
    },
  },
  watch: {
    value(val) {
      if (val > this.count) {
        this.$emit("input", this.count);
      }
    },
    count(c) {
      if (this.value > c) {
        this.$emit("input", c);
      }
    },
  },
};
</script>

<style lang="scss">
.r-pagination {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  gap: $p;
  &-main {
    display: flex;
    align-items: center;
    gap: $p;
  }
  &-item {
    padding: 0 $p2 !important;
    height: 32px;
    min-width: 32px;
    &.active {
      background: color() !important;
      color: color("active-text-color") !important;
    }
  }
  &-item-blank {
    pointer-events: none !important;
    padding: 0 !important;
  }
  &.bordered {
    .r-pagination-item {
      border: $border;
    }
  }
  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  &.compact {
    grid-template-columns: auto auto;
    .r-pagination-main {
      grid-column: 1 / 3;
    }
    .prev {
      grid-row: 2 / 3;
    }
  }
}
</style>