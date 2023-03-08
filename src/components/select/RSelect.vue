<template>
  <div class="r-select" v-click-outside="clickOutside" tabindex="-1">
    <div :class="['trigger', { focused: state.active, disabled }]" @click="open">
      <label for="" class="label">
        {{ label }}
        <span class="required-text" v-if="requiredText"> &nbsp;( required ) </span>
      </label>
      <div class="input-container" ref="toggle">
        <input
          :class="['input', { noInput: !searchable, isAnyItemSelected }]"
          v-model="state.search"
          :placeholder="inputPlaceholder"
          :readOnly="!searchable"
          ref="inputRef"
          @keyup.tab="open"
          @keyup.esc="close"
          @keydown.arrow-down.stop.prevent="onArrowDown"
          @keydown.arrow-up.stop.prevent="onArrowUp"
          @keydown.enter.stop.prevent="onEnter"
        />
        <div :class="['dropdown-icon']" @click.stop="toggleOpen" v-ripple>
          <i :class="['bx bx-chevron-down', { rotate: state.active }]"></i>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <transition name="fade-move" @after-leave="onAfterLeave">
        <div v-if="state.active" class="dropdown-container" ref="dropdown">
          <div class="select-dropdown">
            <div class="noOptions" v-if="noOptions">
              <slot name="noItems" class="noOptions"> No Options Available </slot>
            </div>
            <slot />
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { createPopper, type Instance, type Modifier } from "@popperjs/core";
import { isArray } from "@vue/shared";
import { RSelectKey } from '@/injectionKeys'
import { nextTick, computed, onBeforeUnmount, onMounted, provide, reactive, ref, toRef, useSlots, watch, type VNode } from "vue";
type Props = {
  searchable?: boolean
  multiple?: boolean
  modelValue: Array<number | string> | number | string,
  placeholder?: string
  isNested?: boolean
  disabled?: boolean
  label?: string
  requiredText?: boolean
  keepOpenAfterSelection?: boolean
}
type Option = { value: string | number, text?: string, disabled?: boolean }
type State = {
  search: string
  active: boolean
  focused: boolean
  focusedItem: number
  popper?: Instance
  options: Option[]
}
type Picked<T, K extends keyof T> = T[K]
const props = withDefaults(
  defineProps<Props>(),
  {
    searchable: false,
    requiredText: false,
    keepOpenAfterSelection: false,
    placeholder: ''
  }
)
const emit = defineEmits(["update:modelValue"]);
const state = reactive<State>({
  search: "",
  active: false,
  focused: false,
  focusedItem: -1,
  popper: undefined,
  options: [],
});
const inputRef = ref();
const dropdown = ref();
const toggle = ref();

// cycle
onMounted(() => setChildren(defaultSlot!()));
onBeforeUnmount(() => {
  if (state.active) {
    state.active = false;
  }
});
const onAfterLeave = () => {
  state.popper?.destroy();
};

const onSelectValue = ({ event, activate }: { event: string | number, activate: boolean }) => {
  if (props.multiple) {
    if (activate) {
      emit("update:modelValue", [...<Array<Number>>props.modelValue, event]);
    } else {
      let val = [...<Array<Number>>props.modelValue];
      val = val.filter((x) => x !== event);
      emit("update:modelValue", val);
    }
  } else {
    emit("update:modelValue", event);
  }
  if (!props.keepOpenAfterSelection) {

    console.log('no open after selection');
    state.search = "";
    // in order to focus on the laters selected item
    // this.focusedItem = this.options.findIndex(({ value }) => value === event);
    close();
  }
};

// open/close dropdown
const toggleOpen = () => {
  if (state.active) {
    close();
  } else {
    open();
  }
};
const open = () => {
  console.log('open');
  state.active = true;
  inputRef.value.focus();
  nextTick(() => {
    const sameWidth: Modifier<'sameWidth', {}> = {
      name: "sameWidth",
      enabled: true,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: ({ state }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      effect: ({ state }) => {
        state.elements.popper.style.width = `${(state.elements.reference as HTMLElement).offsetWidth}px`;
      },
    };
    state.popper = createPopper(toggle.value, dropdown.value, {
      placement: "bottom",
      modifiers: [sameWidth],
    });
  });
};
const close = () => {
  console.log('CALL close');
  if(!state.active) return
  state.active = false;
  state.search = "";
  state.focusedItem = -1;
  console.log('close');

};
const clickOutside = {
  handler: close,
  middleware: (e: Event) => {
    const contains = dropdown.value?.contains(e.target)
    return !contains
  }
}

// Options
const { default: defaultSlot } = useSlots();
const setChildren = (defSlot: VNode[]) => {
  const tempOptions: Picked<State, 'options'> = [];
  const checkItem = (nodes: VNode[]) => {
    nodes.forEach((node) => {
      if ((node.type as any).isOption) {
        tempOptions.push(node.props as any);
      } else if (typeof node.children === "object" && node.children) {
        checkItem(node.children as VNode[]);
      }
    });
  };
  checkItem(defSlot);
  state.options = tempOptions;
};
watch(
  () => defaultSlot!(),
  (defSlot) => setChildren(defSlot)
);
const noOptions = computed(() => {
  return !visibleItems.value.length;
});

// Items Focus
function onArrowDown() {
  if (noOptions.value) return;
  if (state.focusedItem < state.options.length - 1) state.focusedItem++;
  else state.focusedItem = 0;
  if (!isItemFocusable.value) {
    onArrowDown();
  }
}
function onArrowUp() {
  if (noOptions.value) return;
  if (state.focusedItem > 0) {
    state.focusedItem--;
  } else if (state.focusedItem === 0) {
    state.focusedItem = state.options.length - 1;
  }
  if (!isItemFocusable.value) {
    onArrowUp();
  }
}
function onEnter() {
  if (!focusedItemValue.value) return;
  let isValueActive = true;
  if (props.multiple && isArray(props.modelValue)) {
    isValueActive = !!props.modelValue.find(
      (value) => value === focusedItemValue.value!.value
    );
  }
  onSelectValue({
    event: focusedItemValue.value.value,
    activate: isValueActive ? false : true,
  });
}
const focusedItemValue = computed(() => {
  if (state.focusedItem < 0) return undefined;
  return state.options[state.focusedItem];
});
const isItemFocusable = computed(() => {
  const item = visibleItems.value.find(
    ({ value }) => focusedItemValue.value?.value === value
  );
  return item && !item.disabled;
});

// Selected Items
const selectedItems = computed(() => {
  return state.options.filter(({ value }) => {
    if (props.multiple && isArray(props.modelValue)) {
      return props.modelValue.find((x) => x === value);
    } else {
      return value == props.modelValue;
    }
  });
});
const isAnyItemSelected = computed(() => {
  return selectedItems.value.length;
});
const inputPlaceholder = computed<string>(() => {
  const selectedValueTexts = selectedItems.value.map(({ text }) => text).join('');
  return selectedValueTexts.length ? selectedValueTexts : props.placeholder;
});

// Search
const visibleItems = computed(() => {
  return state.options.filter(({ text }) => {
    return text?.toLowerCase().includes(state.search.toLowerCase());
  });
});

provide(RSelectKey, {
  modelValue: toRef(props, "modelValue"),
  multiple: toRef(props, "multiple"),
  search: toRef(state, "search"),
  focusedItemValue,
  onSelectValue,
});
</script>

<style scoped lang="scss">
.trigger {
  color: color(text);
  &:hover {
    .input-container {
      box-shadow: var(--border-active);
    }
  }
  &.focused {
    .icon,
    .label {
      color: color();
    }
    .input-container {
      box-shadow: 0 0 0 1px color();
    }
  }

  &.disabled {
    opacity: 0.8;
    pointer-events: none;
  }
}

.input-container {
  background: color(b1);
  border-radius: $radius;
  display: flex;
  align-items: center;
  box-shadow: var(--border);
  transition: box-shadow $duration;
  overflow: hidden;
}

.label,
.description {
  padding: 2px;
  display: flex;
  font-size: $fsmall;
  opacity: var(--info-alpha);
  transition: color $duration;
}

.required-text {
  font-size: $fsmall;
  opacity: 0.8;
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
  font-family: inherit;
  color: color(text);
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
  cursor: pointer;
  transition: color $duration;
  .bx {
    transition: all $duration;
  }

  .rotate {
    transform: rotate(180deg);
  }
}

.isAnyItemSelected {
  &::placeholder {
    color: color(text);
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
.dropdown-container {
  z-index: 100;
}

.select-dropdown {
  background: color(b2);
  border-radius: $radius;
  max-height: 240px;
  overflow: hidden;
  overflow-y: auto;
  box-shadow: var(--shadow);
  padding: $p;
  @extend .overflow-x-scroll-bar;
}

.fade-move {
  &-enter-active,
  &-leave-active {
    .select-dropdown {
      transition: all math.div($duration, 1.5);
    }

    transition: opacity math.div($duration, 1.5);
  }

  &-enter-from,
  &-leave-to {
    .select-dropdown {
      opacity: 0;
      transform: translateY(8px);
    }
  }
}
</style>
