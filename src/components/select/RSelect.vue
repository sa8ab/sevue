<template>
  <div
    :class="['r-select', { 'r-select_focused': state.focused, 'r-select_disabled': disabled }]"
    :style="{ '--r-color': color || 'var(--r-prm)' }"
    ref="selfRef"
  >
    <FieldLabel :label="label" v-if="label || $slots.label" :error="error" :focused="state.focused">
      <slot name="label"></slot>
    </FieldLabel>
    <div
      :class="['trigger']"
      :tabindex="renderTriggerTabindex"
      @focusin="onFocus"
      @focusout="onBlur"
      @click="onTriggerClick"
      v-click-outside="clickOutside"
      ref="triggerRef"
    >
      <RInput
        containerClass="r-input-container"
        :class="['r-select_input', { noInput: !searchable, isAnyItemSelected }]"
        v-model="state.search"
        :placeholder="inputPlaceholder"
        :readOnly="!searchable"
        :disabled="disabled"
        ref="rInput"
        :error="error"
        iconAfter
        @keydown.tab="onKeydownTab"
        @keyup.esc="close"
        @keydown.arrow-down.stop.prevent="onArrowDown"
        @keydown.arrow-up.stop.prevent="onArrowUp"
        @keydown.enter.stop.prevent="onEnter"
        @input="onInputChange"
        tabindex="-1"
        v-bind="inputProps"
        labelTag="div"
      >
        <template #after>
          <slot name="loadingSpinner" :loading="loading">
            <div class="loading-container" v-if="loading">
              <LoadingSpinner width="24" />
            </div>
          </slot>
          <slot name="toggleIcon" :toggleOpen="toggleOpen" :active="state.active" :loading="loading">
            <span
              :class="['r-select_dropdown-icon', { rotate: state.active }]"
              v-ripple
              v-if="!loading && !noDropdown"
              @click="onToggleClick"
            >
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
    </div>
    <SelectedItems
      :items="state.selectedItems"
      v-if="Array.isArray(state.selectedItems)"
      @itemClick="onSelectedItemClick"
    >
      <template #default="slotProps">
        <slot name="selectedItem" v-bind="slotProps"></slot>
      </template>
    </SelectedItems>
    <HeightTransition>
      <FieldMessage :message="message" v-if="message || $slots.message">
        <slot name="message" />
      </FieldMessage>
    </HeightTransition>
    <HeightTransition>
      <FieldMessage :message="errorMessage" v-if="errorMessage || $slots.errorMessage" error>
        <slot name="errorMessage" />
      </FieldMessage>
    </HeightTransition>

    <Teleport :to="teleport" :disabled="teleportDisabled">
      <Transition name="fade-move" @after-leave="onAfterLeave" @beforeEnter="onBeforeEnter">
        <div
          v-if="state.active"
          :class="['r-select-dropdown-container', dropdownClass]"
          ref="dropdown"
          tabindex="-1"
          @mousedown="onDropdownMousedown"
        >
          <div class="r-select-dropdown" @scroll="onDropdownScroll">
            <div class="noOptions" v-if="noOptions && !canCreateOption">
              <slot name="noItems" class="noOptions"> No Options Available </slot>
            </div>
            <slot
              v-if="canCreateOption && state.search"
              name="newOption"
              :addNewOption="onEnter"
              :search="state.search"
            >
              <div class="new-option" @click="onEnter">{{ state.search }}</div>
              <div class="new-option-separator"></div>
            </slot>
            <slot name="dropdownBefore" />
            <slot :optimizedItems="optimizedItems" />
            <slot name="dropdownAfter" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
// TODO:
// find next focusable item in performant way
// Ability to pass custom dropdown

import { createPopper, type Instance, type Modifier, type Options as PopperOptions } from "@popperjs/core";
import { isArray } from "@vue/shared";
import { rSelectKey } from "@/injectionKeys";
import {
  nextTick,
  computed,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  toRef,
  useSlots,
  watch,
  type VNode,
} from "vue";
import useColor from "@/composables/useColor";
import SelectedItems from "./SelectedItems.vue";
import FieldMessage from "../internal/FieldMessage.vue";
import FieldLabel from "../internal/FieldLabel.vue";
import HeightTransition from "../HeightTransition.vue";
import LoadingSpinner from "../LoadingSpinner.vue";
import { uniqueArray } from "@/utils";
import SevueIcon from "@/components/icons/SevueIcon.vue";
import type { Props as Option } from "./ROption.vue";

export type Props = {
  searchable?: boolean;
  multiple?: boolean;
  modelValue?: Array<number | string | null | undefined> | number | string | null;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  keepOpenAfterSelection?: boolean;
  color?: string;
  error?: boolean;
  errorMessage?: string | boolean | null;
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
  popperOptions?: PopperOptions;
  dropdownClass?: string;
  teleportDisabled?: boolean;
  teleport?: string;
  focusable?: boolean;
  renderPlaceholder?: (parameter: Option | Option[]) => string;
  customSearch?: (parameter: string) => void;
  itemExtractor?: (arg0: any) => Option;
  onNewOption?: (arg0: {
    newOption: string;
    isAlreadyInValue: boolean;
    isAlreadyInOptions: boolean;
  }) => Promise<boolean> | boolean;
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
  lastSelectedValue?: string | number | null;
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
  teleport: "body",
  focusable: true,
  renderPlaceholder: (option: Option | Option[]) => {
    if (Array.isArray(option)) return `${option.length} selected`;
    else return option.text || "";
  },
});
const emit = defineEmits<{
  (e: "update:modelValue", arg0: Props["modelValue"]): void;
  (e: "open"): void;
  (e: "close"): void;
  (e: "afterTransitionEnd"): void;
  (e: "search", arg0: string): void;
  (e: "blur"): void;
}>();
const { color } = useColor(toRef(props, "color"));
const state = reactive<State>({
  search: "",
  active: false,
  focused: false,
  focusedItem: -1,
  popper: undefined,
  options: [],
  selectedItems: [],
  page: 1,
  lastSelectedValue: undefined,
});
const rInput = ref();
const dropdown = ref();
const selfRef = ref<HTMLElement | undefined>();
const triggerRef = ref<HTMLElement | undefined>();
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

const onSelectValue = ({ event, activate }: { event: Option["value"]; activate: boolean }) => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    if (activate) {
      emit("update:modelValue", [...props.modelValue, event]);
      setLastSelectedValue(event);
    } else {
      let val = [...props.modelValue];
      val = val.filter((x) => x !== event);
      emit("update:modelValue", val);
    }
  } else {
    emit("update:modelValue", event);
    setLastSelectedValue(event);
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
const onTriggerClick = () => {
  if (!state.active) {
    open();
    return;
  }
  if (!props.searchable) {
    close();
    return;
  }
};

const onToggleClick = (e: Event) => {
  if (!state.active) {
    return;
  }
  e.stopPropagation();
  close();
};
const onFocus = (event: FocusEvent) => {
  rInput.value.inputRef.focus({ preventScroll: true });
  state.focused = true;
};
const onBlur = (e: FocusEvent) => {
  const relatedTarget = e.relatedTarget;
  if (relatedTarget && selfRef.value?.contains(relatedTarget as any)) return;
  state.focused = false;
  emit("blur");
};

const renderTriggerTabindex = computed(() => {
  if (!props.focusable) return "-1";
  if (state.focused) return "-1";
  return "0";
});

const onDropdownMousedown = (e: MouseEvent) => {
  e.preventDefault();
};

const onKeydownTab = (e: KeyboardEvent) => {
  console.log("tab");

  if (state.active) e.preventDefault();
  // else triggerRef.value?.blur();
};
const onBeforeEnter = (el: Element) => {
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
  state.popper = createPopper(rInput.value.inputContainerRef, el as HTMLElement, {
    placement: "bottom",
    modifiers: [sameWidth],
    ...props.popperOptions,
  });
};

const toggleOpen = () => {
  if (state.active) {
    close();
  } else {
    open();
  }
};

const open = async () => {
  if (state.active || !canOpenDropdown.value) return;
  state.active = true;
  emit("open");
};
const close = (resetSearchValue: boolean = true) => {
  if (!state.active) return;
  state.active = false;
  if (resetSearchValue) resetSearch();
  state.focusedItem = -1;
  state.page = 1;
  emit("close");
};

const clickOutside = {
  handler: close,
  middleware: (e: Event) => {
    if (!state.active) return false;
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
  const tempOptions: State["options"] = [];
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

const setOptionsFromItems = (items: any[] = []) => {
  let tempOptions: (Option & { R_SELECT_GROUP: any })[] = [];

  const checkItem = (innerItems: any[], R_SELECT_GROUP?: any) => {
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

const handleNewOption = async () => {
  const isAlreadyInValue = Array.isArray(props.modelValue) && props.modelValue.find((item) => item == state.search);
  const isAlreadyInOptions = state.options.find(({ value }) => value == state.search);
  const result = await props.onNewOption?.({
    newOption: state.search,
    isAlreadyInValue: Boolean(isAlreadyInValue),
    isAlreadyInOptions: Boolean(isAlreadyInOptions),
  });
  if (result) afterSelectionHook();
};

function onEnter() {
  if (!state.active) {
    open();
    return;
  }
  if (props.canCreateOption && !focusedItemValue.value && !!state.search) {
    handleNewOption();
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
  return visibleItems.value[state.focusedItem];
});
const isItemFocusable = computed(() => {
  const item = visibleItems.value.find(({ value }) => focusedItemValue.value?.value === value);
  return item && !item.disabled;
});

// Selected Items
const setSelectedItems = (options: Option[]) => {
  let items: Option[] | Option = state.selectedItems;
  if (Array.isArray(props.modelValue)) {
    props.modelValue.forEach((value) => {
      const foundOption = options.find(({ value: optionValue }: Option) => optionValue === value);
      if (foundOption) (items as Option[]).push(foundOption);
    });
    // remove duplicated items from previous selections ( takes first ones )
    items = uniqueArray<Option>(items as Option[], (item) => item.value);
    // to remove if there was any items deleted from modelValue
    items = items.filter(
      ({ value: itemValue }) =>
        !!(props.modelValue as (string | number)[]).find((modelValue) => modelValue === itemValue)
    );
  } else {
    const foundOption = options.find(({ value: optionValue }) => optionValue === props.modelValue);
    items = foundOption || [];
  }
  state.selectedItems = items;
};
watch(
  [() => props.modelValue, () => state.options],
  () => {
    setSelectedItems(state.options);
  },
  { immediate: true, deep: true }
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
    if (state.active && props.noDropdownOnEmptySearch && !search) close(false);
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
  const { scrollHeight, scrollTop, clientHeight } = e.target as HTMLElement;
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

// preserving last seleted item offset
const setLastSelectedValue = (lastValue: Option["value"]) => {
  if (areOptionsProvided.value) return;
  state.lastSelectedValue = lastValue;
};

provide(rSelectKey, {
  modelValue: toRef(props, "modelValue"),
  multiple: toRef(props, "multiple"),
  search: toRef(state, "search"),
  color: toRef(props, "color"),
  customSearch: props.customSearch,
  focusedItemValue,
  onSelectValue,
  lastSelectedValue: toRef(state, "lastSelectedValue"),
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
  &_dropdown-icon {
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

  &_input {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .isAnyItemSelected {
    &::placeholder {
      color: color(text);
    }
  }

  &_disabled {
    opacity: 0.8;
    pointer-events: none;
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
    transition: background var(--r-duration);
    border-radius: var(--r-radius);
    cursor: pointer;
    &:hover {
      background: color(hover, var(--r-hover-alpha));
    }
  }

  .new-option-separator {
    padding: 2px 0;
    border-bottom: 1px solid color(border-color, var(--r-border-alpha));
  }
}

.r-select-dropdown {
  background: color(b2);
  border-radius: var(--r-radius);
  max-height: 240px;
  overflow: hidden;
  overflow-y: auto;
  box-shadow: 0 6px 12px color(shadow-color, var(--r-shadow-alpha)), 0 0 0 1px color(border-color, 0.1);
  padding: var(--r-space-1);
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
      transform: translateY(4px);
    }
  }
}
</style>
