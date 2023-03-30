<template>
  <div class="r-select" v-click-outside="clickOutside" :style="{ '--r-prm': color }">
    <div :class="['trigger', { disabled }]">
      <RInput containerClass="r-input-container" :class="['input', { noInput: !searchable, isAnyItemSelected }]"
        v-model="state.search" :placeholder="inputPlaceholder" :readOnly="!searchable" :label="label" :disabled="disabled"
        ref="rInput" :message="message" :error="error" iconAfter @labelClick="open" @keyup.tab="open" @keyup.esc="close"
        @keydown.arrow-down.stop.prevent="onArrowDown" @keydown.arrow-up.stop.prevent="onArrowUp"
        @keydown.enter.stop.prevent="onEnter">
        <template #after>
          <span @click.prevent="toggleOpen" :class="['dropdown-icon', { rotate: state.active }]" v-ripple>
            <i :class="['bx bx-chevron-down']"></i>
          </span>
        </template>
      </RInput>
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
import { rSelectKey } from '@/injectionKeys'
import { nextTick, computed, onBeforeUnmount, onMounted, provide, reactive, ref, toRef, useSlots, watch, type VNode } from "vue";
import useColor from "@/composables/useColor";
type Props = {
  searchable?: boolean
  multiple?: boolean
  modelValue: Array<number | string> | number | string,
  placeholder?: string
  isNested?: boolean
  disabled?: boolean
  label?: string
  keepOpenAfterSelection?: boolean,
  color?: string,
  error?: boolean
  message?: string
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
    keepOpenAfterSelection: false,
    placeholder: ''
  }
)
const emit = defineEmits(["update:modelValue"]);
const color = useColor(toRef(props, 'color'))
const state = reactive<State>({
  search: "",
  active: false,
  focused: false,
  focusedItem: -1,
  popper: undefined,
  options: [],
});
const rInput = ref();
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
  state.active = true;
  nextTick(() => {
    rInput.value.inputRef.focus({ preventScroll: true });
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
    state.popper = createPopper(rInput.value.inputContainerRef, dropdown.value, {
      placement: "bottom",
      modifiers: [sameWidth],
    });
  });
};
const close = () => {
  if (!state.active) return
  state.active = false;
  state.search = "";
  state.focusedItem = -1;
  rInput.value.inputRef.blur({ preventScroll: true })
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
        // @ts-ignore
        if (node.children.default) {
          // @ts-ignore
          checkItem(node.children.default() as VNode[])
        } else {
          checkItem(node.children as VNode[]);
        }
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

provide(rSelectKey, {
  modelValue: toRef(props, "modelValue"),
  multiple: toRef(props, "multiple"),
  search: toRef(state, "search"),
  color: toRef(props, 'color'),
  focusedItemValue,
  onSelectValue,
});
</script>

<style scoped lang="scss"></style>
<style lang="scss">
.r-select {
  .dropdown-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    transition: transform $duration;

    &.rotate {
      transform: rotate(180deg);
    }
  }

  .input {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .isAnyItemSelected {
    &::placeholder {
      color: color(text);
    }
  }

  .trigger {
    &.disabled {
      opacity: 0.8;
      pointer-events: none;
    }
  }

  .icon-container {
    padding: 0px !important;
  }

  .noInput {
    cursor: pointer;
  }
}

.noOptions {
  padding: $p2;
}

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
