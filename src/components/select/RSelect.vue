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
        v-bind="inputProps"
      >
        <template #after>
          <slot name="loadingSpinner" :loading="loading">
            <div class="loading-container" v-if="loading">
              <LoadingSpinner width="24" />
            </div>
          </slot>
          <slot name="toggleIcon" :toggleOpen="toggleOpen" :active="state.active" :loading="loading">
            <span @click.prevent="toggleOpen" :class="['dropdown-icon', { rotate: state.active }]" v-ripple v-if="!loading && !noDropdown">
              <SevueIcon name="chevron-down" />
            </span>
          </slot>
        </template>
        <template #before>
          <slot name="before" />
        </template>
        <template #icon>
          <slot name="inputIcon" />
        </template>
      </RInput>
      <SelectedItems :items="state.selectedItems" v-if="Array.isArray(state.selectedItems)" @itemClick="onSelectedItemClick">
        <template #default="item">
          <slot name="selectedItem" v-bind="item"></slot>
        </template>
      </SelectedItems>
    </div>
    <Teleport to="body">
      <Transition name="fade-move" @after-leave="onAfterLeave">
        <div v-if="state.active" class="r-select-dropdown-container" ref="dropdown">
          <div class="r-select-dropdown" @scroll="onDropdownScroll">
            <div class="noOptions" v-if="noOptions && !canCreateOption">
              <slot name="noItems" class="noOptions"> No Options Available </slot>
            </div>
            <slot v-if="canCreateOption && state.search" name="newOption" :addNewOption="onEnter" :search="state.search">
              <div class="new-option r" @click="onEnter">{{ state.search }}</div>
              <div class="new-option-separator"></div>
            </slot>
            <slot :optimizedItems="optimizedItems" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { createPopper, type Instance, type Modifier } from "@popperjs/core";
import { isArray } from "@vue/shared";
import { rSelectKey } from "@/injectionKeys";
import { nextTick, computed, onBeforeUnmount, onMounted, provide, reactive, ref, toRef, useSlots, watch, type VNode } from "vue";
import useColor from "@/composables/useColor";
import SelectedItems from "./SelectedItems.vue";
import LoadingSpinner from "../LoadingSpinner.vue";
import { uniqueArray } from "@/utils";
import SevueIcon from "@/components/icons/SevueIcon.vue";
import type { Picked } from "@/types";
import type { Props as Option } from "./ROption.vue";

export type Props = {
  searchable?: boolean;
  multiple?: boolean;
  modelValue: Array<number | string> | number | string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  keepOpenAfterSelection?: boolean;
  color?: string;
  error?: boolean;
  message?: string;
  inputProps?: any;
  noDropdown?: boolean;
  noDropdownOnEmptySearch?: boolean;
  loading?: boolean;
  items?: Array<any>;
  itemsKey?: string;
  groupIdentifier?: string;
  paginationOffset?: number;
  perPage?: number;
  canCreateOption?: boolean;
  renderPlaceholder?: (parameter: Option | Option[]) => string;
  customSearch?: (parameter: string) => void;
  itemExtractor?: (arg0: any) => Option;
};

type State = {
  search: string;
  active: boolean;
  focused: boolean;
  focusedItem: number;
  popper?: Instance;
  options: Option[];
  selectedItems: Option | Option[];
  page: number;
};
const props = withDefaults(defineProps<Props>(), {
  searchable: false,
  keepOpenAfterSelection: false,
  placeholder: "",
  noDropdownOnEmptySearch: false,
  paginationOffset: 40,
  itemsKey: "items",
  groupIdentifier: "id",
  perPage: 10,
  renderPlaceholder: (option: Option | Option[]) => {
    if (Array.isArray(option)) return `${option.length} selected`;
    else return option.text || "";
  },
});
// const emit = defineEmits(["update:modelValue", "open", "close", "afterTransitionEnd", "search", "newOption"]);
const emit = defineEmits<{
  (e: "update:modelValue", arg0: any): void;
  (e: "open"): void;
  (e: "close"): void;
  (e: "afterTransitionEnd"): void;
  (e: "search", arg0: string): void;
  (
    e: "newOption",
    arg0: {
      newOption: string;
      isAlreadyInValue: boolean;
      isAlreadyInOptions: boolean;
    }
  ): void;
}>();
const color = useColor(toRef(props, "color"));
const state = reactive<State>({
  search: "",
  active: false,
  focused: false,
  focusedItem: -1,
  popper: undefined,
  options: [],
  selectedItems: [],
  page: 1,
});
const rInput = ref();
const dropdown = ref();
const toggle = ref();

// cycle
onMounted(() => !shouldSkipSettingChildren.value && setChildren(defaultSlot!()));
onBeforeUnmount(() => {
  if (state.active) {
    state.active = false;
  }
});
const onAfterLeave = () => {
  state.popper?.destroy();
  emit("afterTransitionEnd");
};

const onSelectValue = ({ event, activate }: { event: string | number; activate: boolean }) => {
  if (props.multiple) {
    if (activate) {
      emit("update:modelValue", [...(<Array<Number>>props.modelValue), event]);
    } else {
      let val = [...(<Array<Number>>props.modelValue)];
      val = val.filter((x) => x !== event);
      emit("update:modelValue", val);
    }
  } else {
    emit("update:modelValue", event);
  }

  afterSelectionHook();
};

const afterSelectionHook = () => {
  if (!props.keepOpenAfterSelection) {
    resetSearch();
    // in order to focus on the laters selected item
    // this.focusedItem = this.options.findIndex(({ value }) => value === event);
    close();
  }
  state.popper?.update();
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
  if (state.active || !canOpenDropdown.value) return;
  state.active = true;
  nextTick(() => {
    rInput.value.inputRef.focus({ preventScroll: true });
    const sameWidth: Modifier<"sameWidth", {}> = {
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
  emit("open");
};
const close = (resetSearchValue: boolean = true, blur: boolean = true) => {
  if (!state.active) return;
  state.active = false;
  if (resetSearchValue) resetSearch();
  state.focusedItem = -1;
  if (blur) rInput.value.inputRef.blur();
  state.page = 1;
  emit("close");
};
const clickOutside = {
  handler: close,
  middleware: (e: Event) => {
    const contains = dropdown.value?.contains(e.target);
    return !contains;
  },
};
const canOpenDropdown = computed<boolean>(() => {
  if ((props.noDropdownOnEmptySearch && !state.search) || props.noDropdown) return false;
  return true;
});

// Options

const areOptionsProvided = computed(() => !!props.items);
const shouldSkipSettingChildren = computed(() => !defaultSlot || areOptionsProvided.value);

const { default: defaultSlot } = useSlots();
const setChildren = (defSlot: VNode[]) => {
  const tempOptions: Picked<State, "options"> = [];
  const checkItem = (nodes: VNode[]) => {
    nodes.forEach((node) => {
      if ((node.type as any).isOption) {
        tempOptions.push(node.props as any);
      } else if (typeof node.children === "object" && node.children) {
        // @ts-ignore
        if (node.children.default) {
          // @ts-ignore
          checkItem(node.children.default() as VNode[]);
        } else {
          checkItem(node.children as VNode[]);
        }
      }
    });
  };

  checkItem(defSlot);
  state.options = tempOptions;
};

const setOptionsFromItems = (items: Array<any> = []) => {
  let tempOptions: Array<Option & { R_SELECT_GROUP: any }> = [];

  const checkItem = (innerItems: Array<any>, R_SELECT_GROUP?: any) => {
    innerItems.forEach((item) => {
      if (item[props.itemsKey]) {
        // has nested items
        const { [props.itemsKey]: nestedItems, ...parent } = item;
        checkItem(nestedItems, parent);
        return;
      } else {
        tempOptions.push({ ...((props.itemExtractor?.(item) ?? item) as Option), R_SELECT_GROUP });
      }
    });
  };

  checkItem(items);
  state.options = tempOptions;
};

if (!shouldSkipSettingChildren.value) {
  watch(
    () => defaultSlot!(),
    (defSlot) => setChildren(defSlot)
  );
} else {
  watch(
    () => props.items,
    (items) => setOptionsFromItems(items),
    { immediate: true, deep: true }
  );
}
const noOptions = computed(() => {
  return !visibleItems.value.length;
});

// Items Focus
function onArrowDown() {
  if (props.noDropdown) return;
  if (noOptions.value) return;
  if (state.focusedItem < state.options.length - 1) state.focusedItem++;
  else state.focusedItem = 0;
  if (!isItemFocusable.value) {
    onArrowDown();
  }
}
function onArrowUp() {
  if (props.noDropdown) return;
  if (noOptions.value) return;
  if (state.focusedItem > 0) {
    state.focusedItem--;
  } else if (state.focusedItem === 0 || state.focusedItem < 0) {
    state.focusedItem = state.options.length - 1;
  }
  if (!isItemFocusable.value) {
    onArrowUp();
  }
}

function onEnter() {
  if (props.canCreateOption && !focusedItemValue.value && !!state.search) {
    const isAlreadyInValue = Array.isArray(props.modelValue) && props.modelValue.find((item) => item == state.search);
    const isAlreadyInOptions = state.options.find(({ value }) => value == state.search);
    emit("newOption", {
      newOption: state.search,
      isAlreadyInValue: Boolean(isAlreadyInValue),
      isAlreadyInOptions: Boolean(isAlreadyInOptions),
    });
    afterSelectionHook();
    return;
  }
  if (!focusedItemValue.value) return;
  let isValueActive = true;
  if (props.multiple && isArray(props.modelValue)) {
    isValueActive = !!props.modelValue.find((value) => value === focusedItemValue.value!.value);
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
  const item = visibleItems.value.find(({ value }) => focusedItemValue.value?.value === value);
  return item && !item.disabled;
});

// Selected Items
const setSelectedItems = (options: Option[]) => {
  let items: Array<Option> | Option = state.selectedItems;
  if (Array.isArray(props.modelValue)) {
    props.modelValue.forEach((value) => {
      const foundOption = options.find(({ value: optionValue }: Option) => optionValue === value);
      if (foundOption) (items as Option[]).push(foundOption);
    });
    // remove duplicated items from previous selections ( takes first ones )
    items = uniqueArray<Option>(items as Option[], (item) => item.value);
    // to remove if there was any items deleted from modelValue
    items = items.filter(
      ({ value: itemValue }) => !!(props.modelValue as Array<string | number>).find((modelValue) => modelValue === itemValue)
    );
  } else {
    const foundOption = options.find(({ value: optionValue }) => optionValue === props.modelValue);
    if (foundOption) items = foundOption;
  }
  state.selectedItems = items;
};
watch(
  [() => props.modelValue, () => state.options],
  () => {
    setSelectedItems(state.options);
  },
  { immediate: true }
);

const isAnyItemSelected = computed(() => {
  if (Array.isArray(state.selectedItems)) {
    return !!state.selectedItems.length;
  } else {
    return !!state.selectedItems;
  }
});
const inputPlaceholder = computed<string>(() => {
  // const selectedValueTexts = state.selectedItems.map(({ text }) => text).join(', ');
  // return selectedValueTexts.length ? selectedValueTexts : props.placeholder;
  if (isAnyItemSelected.value) {
    return props.renderPlaceholder(state.selectedItems);
  }
  return props.placeholder;
});

const onSelectedItemClick = (item: Option) => {
  onSelectValue({
    event: item.value,
    activate: false,
  });
};

// Search
const visibleItems = computed(() => {
  return props.customSearch
    ? state.options
    : state.options.filter(({ text }) => {
        return text ? text.toLowerCase().includes(state.search.toLowerCase()) : true;
      });
});
const onInputChange = (e: InputEvent) => {
  const value = (e.target as HTMLInputElement).value;
  emit("search", value);
  props.customSearch?.(value);
  props.customSearch && state.popper?.update();
};
watch(
  () => state.search,
  (search) => {
    if (state.active && props.noDropdownOnEmptySearch && !search) close(false, false);
    else if (!state.active && !!search) {
      open();
    }
  }
);
const resetSearch = () => {
  if (state.search === "") return;
  props.customSearch?.("");
  emit("search", "");
  state.search = "";
};

// optimize
const onDropdownScroll = (e: Event) => {
  if (visibleItems.value.length < state.page * props.perPage) return; // no more items
  const { scrollHeight, scrollTop, clientHeight } = <HTMLElement>e.target;
  const shouldLoadNewItems = scrollTop + clientHeight > scrollHeight - props.paginationOffset;
  if (shouldLoadNewItems) state.page++;
};

const groupByParent = (items: Array<Option & { R_SELECT_GROUP?: any }>) => {
  const itemsKey = props.itemsKey;
  const groupIdentifier = props.groupIdentifier;
  // TODO: typings based on user given generic type
  const groups: {
    [arg0: string | number]: any;
  } = {};

  items.forEach((item) => {
    const { R_SELECT_GROUP, ...rest } = item;
    const { [groupIdentifier]: indentifierValue } = R_SELECT_GROUP;

    if (!groups[indentifierValue]) {
      groups[indentifierValue] = { ...R_SELECT_GROUP, [itemsKey]: [] };
    }
    groups[indentifierValue][itemsKey].push(rest);
  });

  return Object.values(groups);
};

const optimizedItems = computed(() => {
  const rawList = visibleItems.value.filter((_, i) => {
    return i < state.page * props.perPage;
  });

  if (!(rawList[0] as Option & { R_SELECT_GROUP?: any })?.R_SELECT_GROUP) return rawList;
  else return groupByParent(rawList);
});

provide(rSelectKey, {
  modelValue: toRef(props, "modelValue"),
  multiple: toRef(props, "multiple"),
  search: toRef(state, "search"),
  color: toRef(props, "color"),
  customSearch: props.customSearch,
  focusedItemValue,
  onSelectValue,
});
defineExpose({
  setSelectedItems,
  rInput,
  open,
  close,
  resetSearch,
});
</script>

<style lang="scss">
.r-select {
  .dropdown-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    width: 32px;
    height: 32px;
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
    width: 32px;
    padding: 0 var(--r-space-1);
  }

  .r-input-container .input-container {
    align-items: center;
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

.r-select-dropdown-container {
  position: absolute;
  z-index: 100;

  .noOptions {
    padding: var(--r-normal-padding);
    text-align: center;
  }
  .new-option {
    padding: var(--r-normal-padding);
    font-size: var(--r-font-small);
    color: color(text);
    &:hover {
      background: color(hover, var(--hover-alpha));
    }
  }
  .new-option-separator {
    border-bottom: 1px solid color(border-color, var(--border-alpha));
  }
}

.r-select-dropdown {
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
    .r-select-dropdown {
      transition: all calc(var(--r-duration) / 1.5);
    }

    transition: opacity calc(var(--r-duration) / 1.5);
  }

  &-enter-from,
  &-leave-to {
    .r-select-dropdown {
      opacity: 0;
      transform: translateY(8px);
    }
  }
}
</style>
