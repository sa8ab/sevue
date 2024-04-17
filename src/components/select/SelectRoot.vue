<script setup lang="ts">
import type InputContainer from "../internal/InputContainer.vue";
import { Primitive, type PrimitiveProps } from "../primitive";
import { reactive, ref, computed, watch, unref, useSlots, type Ref, type ComputedRef } from "vue";

type BaseModelValue = string | number | undefined | null;

type LocalOption = {
  text?: string | number | null;
  value?: BaseModelValue;
  disabled?: boolean;
  context: Option;
};

export type Option = Record<string, any>;
export type OptionGroup = Record<string, any>;

export interface SelectRootProps<T = Option, U = OptionGroup> extends PrimitiveProps {
  modelValue?: BaseModelValue | BaseModelValue[];
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  closeAfterSelection?: boolean;
  resetSearchAfterSelection?: boolean;
  showDropdownOnEmptySearch?: boolean;
  showTags?: boolean;
  remote?: boolean;

  options?: T[];
  groupedOptions?: U[];
  getText?: (option: T) => string | number;
  getValue?: (option: T) => string | number;
  getIsDisabled?: (option: T) => boolean;
  getGroupOptions?: (group: U) => T[];
  getGroupTitle?: (group: U) => string | number | undefined | null;
  customSearch?: (search?: string, option?: T) => {};
  creatable?: boolean;
  showCreateWhen?: "empty" | "always";
  createOption?: (search: string | undefined) => any;
  focusable?: boolean;
  deselectable?: boolean;
}

export type SelectRootEmits = {
  "update:modelValue": [BaseModelValue | BaseModelValue[]];
  change: [BaseModelValue | BaseModelValue[]];
  search: [string | undefined];
  blur: [FocusEvent];
  focus: [FocusEvent];
  open: [];
  close: [];
};

export interface SelectRootContext {
  disabled: Ref<boolean | undefined>;
  focused: Ref<boolean>;
  inputElement: Ref<HTMLElement | undefined>;
  toggleElement: Ref<HTMLElement | undefined>;
  active: Ref<boolean>;
  activate: () => void;
  close: () => void;
  searchable: Ref<boolean | undefined>;
  selectFn: () => void;
  focusable: Ref<boolean | undefined>;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  handleKeyDown: () => void;
  renderDisplayLabel: ComputedRef<string | undefined>;
  placeholder: Ref<string | undefined>;
  displaySelected: ComputedRef<LocalOption | LocalOption[] | undefined>;
}

const props = withDefaults(defineProps<SelectRootProps>(), {
  resetSearchAfterSelection: true,
  closeAfterSelection: true,
  showDropdownOnEmptySearch: true,
  focusable: true,
  getText: (option: any) => option.title,
  getValue: (option: any) => option.id,
  showCreateWhen: "empty",
});

const emit = defineEmits<SelectRootEmits>();

const state = reactive<{
  focused: boolean;
  focusedOption?: BaseModelValue;
}>({
  focused: false,
});

const active = defineModel<boolean>("active", {
  default: () => false,
});

const search = defineModel<string | undefined>("search", {
  default: () => undefined,
});

const toggleIconRef = ref<HTMLDivElement>();
const containerRef = ref<InstanceType<typeof InputContainer>>();
const dropdownRef = ref<HTMLDivElement>();

// INPUT
const inputRef = ref<HTMLInputElement>();

const handleInput = () => {
  // emitSearch();
  state.focused = true;
  state.focusedOption = undefined;
};

const handleInputFocus = (e: FocusEvent) => {
  // emitFocus(e);
  state.focused = true;
};

const handleInputBlur = (e: FocusEvent) => {
  const relatedTarget = e.relatedTarget as HTMLElement;

  // don't do anything if it's on select
  // added tabindex on containerref to be able to catch the relatedTarget
  if (relatedTarget && containerRef.value?.selfRef?.contains(relatedTarget)) return;

  // don't do anything if it's dropdown.
  if (dropdownRef.value?.contains(relatedTarget)) return;

  // close
  state.focused = false;
  search.value = undefined;
  close();
  // emitBlur(e);
};

const inputReadonly = computed(() => !props.searchable);

const focus = () => {
  inputRef.value?.focus();
};

const blur = () => {
  inputRef.value?.blur();
};

// ACTIVE/DEACTIVE

// const toggleActive = () => (active.value = !active.value);

const activate = () => {
  if (props.disabled) return;
  active.value = true;
  // emitOpen();
};

const close = () => {
  active.value = false;
  state.focusedOption = undefined;
  // emitClose();
};

// OPTIONS

const generateLocalOption = (option: Option): LocalOption => ({
  context: option,
  value: props.getValue(option),
  text: props.getText(option),
  disabled: props.getIsDisabled?.(option),
});

const generateLocalGroup = (group: OptionGroup) => ({
  context: group,
  title: props.getGroupTitle?.(group),
  options: props.getGroupOptions?.(group).map((option) => generateLocalOption(option)) || [],
});

const localGroupOptions = computed(() => {
  return props.groupedOptions?.map((group) => generateLocalGroup(group));
});

const localOptions = computed(() => {
  return props.options?.map((option) => generateLocalOption(option));
});

const searchedGroups = computed(() => {
  return localGroupOptions.value
    ?.map((localGroup) => {
      return {
        ...localGroup,
        options: localGroup.options.filter((option) => {
          return !!searchedFlatOptions.value?.find((searched) => searched.value == option.value);
        }),
      };
    })
    .filter(({ options }) => options.length);
});

const searchedOptions = computed(() => {
  return localOptions.value?.filter(({ value }) => {
    return !!searchedFlatOptions.value?.find((searched) => searched.value == value);
  });
});

const flatOptions = computed(() => {
  // flat groups
  if (localGroupOptions.value) {
    return localGroupOptions.value?.flatMap((item) => item.options);
  }
  // or return options
  return localOptions.value;
});

const searchedFlatOptions = computed(() => {
  return flatOptions.value?.filter(({ text, context }) => {
    if (!search.value) return true;
    if (props.customSearch) return props.customSearch(search.value, context);
    return text ? `${text}`.toLowerCase().includes(search.value.toLowerCase()) : true;
  });
});

// SELECTED ITEMS

const select = (value: BaseModelValue) => {
  const isSelected = getIsSelected(value);
  // multiple
  if (props.multiple) {
    let model = [...((props.modelValue as BaseModelValue[]) || [])];

    if (isSelected) {
      model = model.filter((v) => v !== value);
      emitUpdateModelValue(model);
    } else {
      model = [...model, value];
      emitUpdateModelValue(model);
    }
  } else {
    // single select
    if (!isSelected) {
      emitUpdateModelValue(value);
    } else if (props.deselectable) {
      emitUpdateModelValue(undefined);
    }
  }
  afterSelectHook();
};

const removeLastValue = () => {
  if (!props.modelValue) return;
  if (!Array.isArray(props.modelValue)) return;
  if (!props.modelValue.length) return;

  select(props.modelValue[props.modelValue.length - 1]);
};

const afterSelectHook = () => {
  if (props.closeAfterSelection) {
    close();
  }

  if (props.resetSearchAfterSelection) {
    search.value = undefined;
  }
};

const liveSelected = computed(() => {
  if (props.multiple) {
    return (props.modelValue as Array<BaseModelValue>)
      ?.map?.((model) => {
        const local = flatOptions.value?.find(({ value }) => model == value);
        return local as LocalOption;
      })
      .filter((v) => !!v);
  } else {
    return flatOptions.value?.find(({ value }) => props.modelValue == value);
  }
});

const useCachedOptions = () => {
  const unrefedLiveSelected = unref(liveSelected.value);

  const cachedSelected = ref<LocalOption | LocalOption[] | undefined>(unrefedLiveSelected);

  watch([flatOptions, () => props.modelValue], ([options, modelValue]) => {
    if (props.multiple && Array.isArray(modelValue)) {
      if (!Array.isArray(cachedSelected.value)) cachedSelected.value = [];

      // Add new items to the list if not already there.
      modelValue.forEach((v) => {
        const found = options?.find((o) => o.value === v);
        const alreadyAvailable = (cachedSelected.value as LocalOption[]).find((item) => item.value === found?.value);
        if (found && !alreadyAvailable) (cachedSelected.value as LocalOption[]).push(found);
      });

      // Remove if some value is on the cache but not on the modelValue
      cachedSelected.value = cachedSelected.value.filter((item) => {
        return !!modelValue.find((v) => v === item.value);
      });
    } else {
      const found = options?.find((o) => o.value === modelValue);
      // @ts-ignore
      if (found) cachedSelected.value = found;
    }
  });

  return { cachedSelected };
};

const { cachedSelected } = useCachedOptions();

const displaySelected = computed(() => (props.remote ? cachedSelected.value : liveSelected.value));

const isAnySelected = computed(() => {
  if (Array.isArray(displaySelected.value)) return !!displaySelected.value.length;
  return !!displaySelected.value;
});

const renderDisplayLabel = computed(() => {
  if (!isAnySelected.value) return undefined;

  if (Array.isArray(displaySelected.value)) {
    if (props.showTags) return `${displaySelected.value.length} Selected`;
    return displaySelected.value.map((item) => item?.text).join(", ");
  }

  return displaySelected.value?.text;
});

// CREATE OPTION

const createOption = computed(() => {
  if (!props.creatable) return undefined;

  if (search.value === "" || search.value === undefined) return undefined;

  if (props.showCreateWhen === "empty" && searchedFlatOptions.value?.length) return undefined;

  return search.value;
});

const handleCreateOption = () => {
  props.createOption?.(search.value);
  afterSelectHook();
};

// SINGLE OPTION

const getIsSelected = (optionValue: BaseModelValue): boolean => {
  if (props.multiple) {
    return !!(props.modelValue as Array<BaseModelValue>)?.find?.((v) => v == optionValue);
  }
  return props.modelValue == optionValue;
};

const setFocusedOption = (v: BaseModelValue) => (state.focusedOption = v);

const getIsFocusedOption = (optionValue: BaseModelValue) => {
  return state.focusedOption !== undefined && optionValue == state.focusedOption;
};

const getIsLastActive = (optionValue: BaseModelValue): boolean => {
  if (!props.modelValue) return false;
  if (Array.isArray(props.modelValue)) return props.modelValue[props.modelValue.length - 1] == optionValue;
  return props.modelValue == optionValue;
};

const focusNextOption = () => {
  const list = searchedFlatOptions.value;
  // if there is nothing on the list
  if (!list?.length) return;

  const currentIndex = list?.findIndex(({ value }) => value == state.focusedOption);

  // there is nothing selected yet.
  if (currentIndex == -1 || !state.focusedOption) {
    // select first item
    setFocusedOption(list[0].value);
    return;
  }

  const next = list.find((item, index) => !item.disabled && index > currentIndex);

  if (next) {
    setFocusedOption(next.value);
  }
};

const focusPrevOption = () => {
  const list = searchedFlatOptions.value;

  if (!list?.length) return;

  const reversedList = [...list].reverse();

  const currentIndex = reversedList.findIndex(({ value }) => value == state.focusedOption);

  if (currentIndex == -1 || !state.focusedOption) {
    return;
  }

  const previous = reversedList.find((item, index) => !item.disabled && index > currentIndex);

  if (previous) {
    setFocusedOption(previous.value);
  }
};

const generateOptionAttrs = (option: LocalOption) => {
  return {
    text: option.text,
    disabled: option.disabled,
    isFocused: getIsFocusedOption(option.value),
    isSelected: getIsSelected(option.value),
    isLastActive: getIsLastActive(option.value),
    // color: props.color,
    onClick: () => (option.disabled ? undefined : select(option.value)),
    onMouseover: () => handleOptionMouseover(),
  };
};

// EVENTS
const handlePointerDown = (e: PointerEvent) => {
  const target = e.target as HTMLElement;

  if (target.closest("input, button, a")) return;
  requestAnimationFrame(() => {
    focus();
  });
};

const handleDropdownMousedown = (e: MouseEvent) => {
  // avoid focusing
  e.preventDefault();
};

const handleOptionMouseover = () => {
  setFocusedOption(undefined);
};

const handleToggleClick = () => {
  if (active.value) close();
  else activate();
};

const handleClick = (e: Event) => {
  const target = e.target as HTMLElement;

  // click of trigger icon
  if (toggleIconRef.value?.contains(target)) {
    handleToggleClick();
    return;
  }

  // is searchable, don't close if already open
  if (props.searchable && active.value) return;

  if (!active.value) {
    activate();
  } else {
    close();
  }
};

const handleEnter = () => {
  if (!active.value) {
    activate();
    return;
  }

  if (state.focusedOption != undefined) {
    select(state.focusedOption);
  }
};

const handleEsc = (e: KeyboardEvent) => {
  if (active.value) {
    // if is open, close and mute the event from parent
    e.stopPropagation();
    close();
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  const key = e.key;

  if (key === "Backspace") {
    if (!search.value) {
      removeLastValue();
    }
  }

  if (key === "Enter") {
    e.stopPropagation();
    e.preventDefault();
    handleEnter();
  }

  if (key === "Tab") {
    if (active.value) e.preventDefault();
  }

  if (key === "Escape") {
    handleEsc(e);
  }

  if (key === "ArrowUp") {
    e.preventDefault();
    focusPrevOption();
  }

  if (key === "ArrowDown") {
    e.preventDefault();
    if (!active.value) {
      activate();
    } else {
      focusNextOption();
    }
  }
};

// SELECTED TAGS

const handleSelectedTagClick = (value: BaseModelValue) => {
  select(value);
};

// EMITS

const emitUpdateModelValue = (value: BaseModelValue | BaseModelValue[]) => {
  emit("update:modelValue", value);
  emit("change", value);
};
const emitSearch = () => {
  emit("search", search.value);
};
const emitBlur = (e: FocusEvent) => {
  emit("blur", e);
};
const emitFocus = (e: FocusEvent) => {
  emit("focus", e);
};
const emitOpen = () => {
  emit("open");
};
const emitClose = () => {
  emit("close");
};
</script>

<template>
  <Primitive :as="as" :asChild="asChild"></Primitive>
</template>
