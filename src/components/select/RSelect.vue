<template>
  <div class="r-select" v-click-outside="close" tabindex="-1">
    <div :class="['trigger', { red, focused: active, disabled }]">
      <label for="" class="label">{{ label }}</label>
      <div class="input-container" ref="toggle">
        <input
          :class="['input', { noInput: !searchable, isAnyItemSelected }]"
          v-model="search"
          :placeholder="inputPlaceholder"
          :readOnly="inputReadOnly"
          @focus="onFocus"
          @blur="onBlur"
          ref="input"
          @click="open"
          @keydown.40.stop.prevent="onArrowDown($event)"
          @keydown.38.stop.prevent="onArrowUp($event)"
          @keydown.enter.stop.prevent="onEnter"
        />
        <div :class="['dropdown-icon']" @click="toggleOpen" v-ripple>
          <i :class="['bx bx-chevron-down', { rotate: active }]"></i>
        </div>
      </div>
    </div>
    <transition name="fade-move">
      <div
        class="select-dropdown"
        v-if="active"
        ref="dropdown"
        v-append-to-body
        v-stick-to="$refs.toggle"
      >
        <div class="noOptions" v-if="noOptions">
          <slot name="noItems" class="noOptions"> No Options Available </slot>
        </div>
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      select: () => ({
        ...this.$props,
        ...this,
        options: this.options,
        focusedItemValue: this.focusedItemValue,
      }),
    };
  },
  props: {
    searchable: { type: Boolean, default: false },
    value: { type: [Number, Array] },
    multiple: { type: Boolean },
    placeholder: { type: String },
    isNested: { type: Boolean },
    red: { type: Boolean },
    disabled: { type: Boolean },
    label: { type: String },
  },
  data: () => ({
    search: "",
    active: false,
    focused: false,
    children: [],
    focusedItem: -1,
    dafSlot: [],
  }),
  mounted() {
    this.setChildren();
    this.defSlot = this.getSlot();
  },
  methods: {
    onSelectValue({ event, activate }) {
      if (this.multiple) {
        if (activate) {
          this.$emit("input", [...this.value, event]);
        } else {
          let val = [...this.value];
          val = val.filter((x) => x !== event);
          this.$emit("input", val);
        }
      } else {
        this.$emit("input", event);
      }
      this.search = "";
      // in order to focus on the laters selected item
      // this.focusedItem = this.options.findIndex(({ value }) => value === event);
      this.close();
    },
    onArrowDown() {
      if (this.noOptions) return;
      if (this.focusedItem < this.options.length - 1) this.focusedItem++;
      else this.focusedItem = 0;
      // this.$nextTick(() => {
      if (!this.isItemFocusable) {
        this.onArrowDown();
      }
      // });
    },
    onArrowUp() {
      if (this.noOptions) return;
      if (this.focusedItem > 0) {
        this.focusedItem--;
      } else if (this.focusedItem === 0) {
        this.focusedItem = this.options.length - 1;
      }
      // this.$nextTick(() => {
      if (!this.isItemFocusable) {
        this.onArrowUp();
      }
      // });
    },
    onEnter() {
      if (this.focusedItem < 0) return;
      let isValueActive = true;
      if (this.multiple) {
        isValueActive = this.value.find(
          (value) => value === this.focusedItemValue.value
        );
      }
      this.onSelectValue({
        event: this.focusedItemValue.value,
        activate: isValueActive ? false : true,
      });
    },
    toggleOpen() {
      if (this.active) {
        this.close();
      } else {
        this.open();
      }
    },
    open() {
      this.active = true;
      this.$refs.input.focus();
      this.$nextTick(() => {
        this.popupItem = this.$refs.dropdown;
      });
    },
    close() {
      this.active = false;
      this.search = "";
      this.focusedItem = -1;
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    setChildren() {
      if (this.isNested) {
        let children = [];
        const slot = this.getSlot() || [];
        const groups = slot
          .filter(({ tag }) => tag)
          .map(({ componentOptions }) => componentOptions.children);
        groups.forEach((item) => {
          children.push(...item);
        });
        this.children = children.filter((item) => item.tag);
      } else {
        this.children = this.getSlot().filter((item) => item.tag);
      }
    },
    getSlot() {
      return this.$slots.default || [];
    },
  },
  computed: {
    options() {
      return this.children.map(
        ({ componentOptions }) => componentOptions.propsData
      );
    },
    selectedItems() {
      return this.options.filter(({ value }) => {
        if (this.multiple) {
          return this.value.find((x) => x === value);
        } else {
          return value == this.value;
        }
      });
    },
    isAnyItemSelected() {
      return this.selectedItems.length;
    },
    inputReadOnly() {
      return this.searchable ? false : true;
    },
    inputPlaceholder() {
      const selectedValueTexts = this.selectedItems.map(({ text }) => text);
      return selectedValueTexts.length ? selectedValueTexts : this.placeholder;
    },
    visibleItems() {
      return this.options.filter(({ text }) => {
        return text.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    noOptions() {
      return !this.visibleItems.length;
    },
    focusedItemValue() {
      if (this.focusedItem < 0) return {};
      return this.options[this.focusedItem];
    },
    isItemFocusable() {
      const item = this.visibleItems.find(
        ({ value }) => this.focusedItemValue.value === value
      );
      return item && !item.disabled;
    },
  },
  beforeUpdate() {
    if (this.getSlot().length !== this.defSlot.length) {
      console.log("updated because of slots");
      this.setChildren();
      this.defSlot = this.getSlot();
    }
  },
  beforeDestroy() {
    if (this.active) {
      this.active = false;
      document.querySelector(".layout").removeChild(this.$refs.dropdown);
    }
  },
};
</script>

<style scoped lang="scss">
.trigger {
  &.focused {
    .icon,
    .label {
      color: $prm;
    }
    .input-container {
      border: 1px solid $prm;
      box-shadow: $shadow;
    }
  }
  &.red {
    .icon,
    .label {
      color: $red;
    }
    .input-container {
      border: 1px solid $red;
    }
  }
  &.disabled {
    opacity: 0.8;
  }
}

.input-container {
  background: $b1;
  border-radius: $radius;
  display: flex;
  align-items: center;
  border: 1px solid $b1;
  transition: border $duration;
  overflow: hidden;
}
.label,
.description {
  padding: 2px;
  display: flex;
  font-size: 0.86rem;
}
.title {
  display: flex;
  align-items: center;
}
.input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  font-family: "Sans";
  color: $c1;
  padding: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dropdown-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  .bx {
    transition: all $duration;
  }
  .rotate {
    transform: rotate(180deg);
  }
}
.isAnyItemSelected {
  &::placeholder {
    color: $c1;
  }
}
.noOptions {
  padding: $p2;
}
.noInput {
  cursor: pointer;
}
</style>
<style lang="scss">
.select-dropdown {
  position: absolute;
  background: $b2;
  border-radius: $radius * 2;
  overflow: hidden;
  overflow-y: auto;
  box-shadow: $shadow2;
  padding: $p;
  z-index: 100;
  max-height: 240px;
  @extend .overflow-x-scroll-bar;
}
.fade-move {
  &-enter-active,
  &-leave-active {
    transition: all $duration / 1.5;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(8px);
  }
}
</style>