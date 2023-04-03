<template>
  <div class="r-select" v-click-outside="clickOutside" :style="{ '--r-color': color || 'var(--r-prm)' }">
    <div :class="['trigger', { disabled }]">
      <RInput
        containerClass="r-input-container"
        :class="['input', { noInput: !searchable, isAnyItemSelected }]"
        v-model="state.search"
        :placeholder="inputPlaceholder"
        :readOnly="!searchable"
        :label="label"
        :disabled="disabled"
        ref="rInput"
        :message="message"
        :error="error"
        iconAfter
        @labelClick="open"
        @keyup.tab="open"
        @keyup.esc="close"
        @keydown.arrow-down.stop.prevent="onArrowDown"
        @keydown.arrow-up.stop.prevent="onArrowUp"
        @keydown.enter.stop.prevent="onEnter"
        @input="onInputChange"
        v-bind="inputProps">
        <template #after>
          <div class="loading-container" v-if="loading">
            <LoadingSpinner width="24" />
          </div>
          <span @click.prevent="toggleOpen" :class="['dropdown-icon', { rotate: state.active }]" v-ripple v-else>
            <ChevronDown />
          </span>
        </template>
      </RInput>
      <SelectedItems
        :items="state.selectedItems"
        v-if="Array.isArray(state.selectedItems)"
        @itemClick="onSelectedItemClick">

        <template #default="item">
          <slot name="selectedItem" v-bind="item"></slot>
        </template>
      </SelectedItems>
    </div>
    <Teleport to="body">
      <Transition name="fade-move" @after-leave="onAfterLeave">
        <div v-if="state.active" class="dropdown-container" ref="dropdown">
          <div class="select-dropdown">
            <div class="noOptions" v-if="noOptions">
              <slot name="noItems" class="noOptions"> No Options Available </slot>
            </div>
            <slot />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
/*
TODO:
custom search,
remote items
*/
import { createPopper, type Instance, type Modifier } from "@popperjs/core";
import { isArray } from "@vue/shared";
import { rSelectKey } from '@/injectionKeys'
import { nextTick, computed, onBeforeUnmount, onMounted, provide, reactive, ref, toRef, useSlots, watch, type VNode } from "vue";
import useColor from "@/composables/useColor";
import SelectedItems from "./SelectedItems.vue";
import LoadingSpinner from '../LoadingSpinner.vue'
import { ChevronDown } from '../icons'
import { uniqueArray } from "@/utils";
import type { Picked } from "@/types";
import type { Props as Option } from './ROption.vue'

export type Props = {
  searchable?: boolean
  multiple?: boolean
  modelValue: Array<number | string> | number | string,
  placeholder?: string
  disabled?: boolean
  label?: string
  keepOpenAfterSelection?: boolean
  color?: string
  error?: boolean
  message?: string
  inputProps?: any
  noDropdownOnEmptySearch?: boolean
  loading?: boolean
  renderPlaceholder?: (parameter: Option | Option[]) => string,
  customSearch?: (parameter: string) => void
}

type State = {
  search: string
  active: boolean
  focused: boolean
  focusedItem: number
  popper?: Instance
  options: Option[]
  selectedItems: Option | Option[]
}
const props = withDefaults(
  defineProps<Props>(),
  {
    searchable: false,
    keepOpenAfterSelection: false,
    placeholder: '',
    noDropdownOnEmptySearch: false,
    renderPlaceholder: (option: Option | Option[]) => {
      if (Array.isArray(option)) return `${option.length} selected`
      else return option.text || ''
    }
  }
)
const emit = defineEmits(["update:modelValue", "open", "close", "afterTransitionEnd", 'search']);
const color = useColor(toRef(props, 'color'))
const state = reactive<State>({
  search: "",
  active: false,
  focused: false,
  focusedItem: -1,
  popper: undefined,
  options: [],
  selectedItems: []
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
  emit('afterTransitionEnd')
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
  if (state.active || !canOpenDropdown.value) return
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
  emit('open')
};
const close = (resetSearch: boolean = true, blur: boolean = true) => {
  if (!state.active) return
  state.active = false;
  if (resetSearch) state.search = "";
  state.focusedItem = -1;
  if (blur) rInput.value.inputRef.blur()
  emit("close")
};
const clickOutside = {
  handler: close,
  middleware: (e: Event) => {
    const contains = dropdown.value?.contains(e.target)
    return !contains
  }
}
const canOpenDropdown = computed<boolean>(() => {
  if (props.noDropdownOnEmptySearch && !state.search) return false
  return true
})

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
const setSelectedItems = (options: Option[]) => {
  let items: Array<Option> | Option = state.selectedItems
  if (Array.isArray(props.modelValue)) {
    props.modelValue.forEach((value) => {
      const foundOption = options.find(({ value: optionValue }: Option) => optionValue === value)
      if (foundOption) (items as Option[]).push(foundOption)
    })
    // remove duplicated items from previous selections ( takes first ones )
    items = uniqueArray<Option>(items as Option[], (item) => item.value)
    // to remove if there was any items deleted from modelValue
    items = items.filter(({ value: itemValue }) => !!(props.modelValue as Array<string | number>).find((modelValue) => modelValue === itemValue))
  } else {
    const foundOption = options.find(({ value: optionValue }) => optionValue === props.modelValue)
    if (foundOption) items = foundOption
  }
  state.selectedItems = items
}
watch([() => props.modelValue, () => state.options], () => {
  setSelectedItems(state.options)
}, { immediate: true })

const isAnyItemSelected = computed(() => {
  if (Array.isArray(state.selectedItems)) {
    return !!state.selectedItems.length
  } else {
    return !!state.selectedItems
  }
});
const inputPlaceholder = computed<string>(() => {
  // const selectedValueTexts = state.selectedItems.map(({ text }) => text).join(', ');
  // return selectedValueTexts.length ? selectedValueTexts : props.placeholder;
  if (isAnyItemSelected.value) {
    return props.renderPlaceholder(state.selectedItems)
  }
  return props.placeholder
});

const onSelectedItemClick = (item: Option) => {
  onSelectValue({
    event: item.value,
    activate: false
  })
}

// Search
const visibleItems = computed(() => {
  return props.customSearch ? state.options : state.options.filter(({ text }) => {
    return text ? text.toLowerCase().includes(state.search.toLowerCase()) : true
  });
});
const onInputChange = (e: InputEvent) => {
  emit('search', e)
  props.customSearch?.((e.target as HTMLInputElement).value)
  props.customSearch && state.popper?.update()
}
watch(() => state.search, (search) => {
  if (state.active && props.noDropdownOnEmptySearch && !search) close(false, false)
  else if (!state.active && !!search) {
    open()
  }
})

provide(rSelectKey, {
  modelValue: toRef(props, "modelValue"),
  multiple: toRef(props, "multiple"),
  search: toRef(state, "search"),
  color: toRef(props, 'color'),
  customSearch: props.customSearch,
  focusedItemValue,
  onSelectValue,
});
defineExpose({
  setSelectedItems
})
</script>

<style scoped lang="scss"></style>
<style lang="scss">
.r-select {
  .dropdown-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    width: 28px;
    height: 28px;
    transition: transform var(--r-duration);

    svg {
      width: 24px;
      height: 24px;
    }

    &.rotate {
      transform: rotate(180deg);
    }
  }

  .loading-container {
    width: 28px;
    padding: 0 var(--r-space-1);
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
  padding: var(--r-space-2);
}

.dropdown-container {
  position: absolute;
  z-index: 100;
}

.select-dropdown {
  background: color(b2);
  border-radius: var(--r-radius);
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
      transition: all calc(var(--r-duration) / 1.5);
    }

    transition: opacity calc(var(--r-duration) / 1.5);
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
