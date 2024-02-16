<template>
  <div
    :class="['r-selectnew', { 'r-selectnew_disabled': disabled, 'r-selectnew_error': hasErrors || slots.errorMessage }]"
    :style="{ '--r-color': color || 'var(--r-prm)' }"
  >
    <!-- Label and Hint -->
    <FieldLabel :label="label" :hint="hint" :labelFor="id">
      <slot name="label"></slot>
      <template #hint> <slot name="hint"></slot> </template>
    </FieldLabel>

    <InputContainer
      :disabled="disabled"
      :focused="state.focused"
      @pointerdown="handlePointerDown"
      @click="handleClick"
      ref="containerRef"
      tabindex="-1"
    >
      <div class="r-selectnew-display">
        <input
          class="r-selectnew-input"
          type="text"
          ref="inputRef"
          v-model="search"
          @input="handleInput"
          :readonly="inputReadonly"
          :disabled="disabled"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @keydown="handleKeydown"
        />
        <template v-if="!search">
          <div class="r-selectnew-display-label" v-if="renderDisplayLabel">
            <slot name="displayLabel" :displayLabel="renderDisplayLabel">{{ renderDisplayLabel }}</slot>
          </div>
          <div class="r-selectnew-placeholder" v-else-if="placeholder">{{ placeholder }}</div>
        </template>
      </div>
      <div class="r-selectnew-toggle-icon-container" ref="toggleIconRef">
        <slot name="toggleIcon" :active="active">
          <div :class="['r-selectnew-toggle-icon', { 'r-selectnew-toggle-icon_rotate': active }]">
            <SevueIcon name="chevron-down" size="24px" />
          </div>
        </slot>
      </div>
    </InputContainer>

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
    <Teleport to="body">
      <Transition name="fade-move">
        <div
          class="r-selectnew-dropdown"
          ref="dropdownRef"
          v-if="active"
          :style="floatingStyles"
          tabindex="-1"
          @mousedown="handleDropdownMousedown"
        >
          <div class="r-selectnew-dropdown-inner">
            <slot name="r-selectnew-dropdown-header"></slot>
            <div class="r-selectnew-dropdown-scroll-area">
              <slot name="before-options"></slot>
              <template v-if="searchedGroups?.length">
                <RSelectGroup v-for="group in searchedGroups" :title="group.title">
                  <ROption v-for="option in group.options" v-bind="generateOptionAttrs(option)">
                    <slot name="option" :option="option.context" :isSelected="getIsSelected(option.value)"></slot>
                  </ROption>
                </RSelectGroup>
              </template>
              <template v-else-if="searchedOptions?.length">
                <div class="r-selectnew-options-list">
                  <!-- Allow rendering whole option #optionContainer -->
                  <ROption v-for="option in searchedOptions" v-bind="generateOptionAttrs(option)">
                    <slot name="option" :option="option.context" :isSelected="getIsSelected(option.value)"></slot>
                  </ROption>
                </div>
              </template>
              <div class="r-selectnew-empty" v-else-if="search">
                <slot name="optionEmpty" :search="search">
                  <span>"{{ search }}" Not found</span>
                </slot>
              </div>
              <div class="r-selectnew-empty">
                <slot name="empty">
                  <span>No Options</span>
                </slot>
              </div>
              <slot name="after-options"></slot>
            </div>
          </div>
          <slot name="dropdown-footer"></slot>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts" generic="Option, OptionGroup">
import { reactive, ref, toRef, computed, useSlots, watch } from "vue";
import FieldLabel from "../internal/FieldLabel.vue";
import InputContainer from "../internal/InputContainer.vue";
import SevueIcon from "@/components/icons/SevueIcon.vue";
import ROption from "./ROption.vue";
import RSelectGroup from "./RSelectGroup.vue";
import HeightTransition from "../HeightTransition.vue";
import FieldMessage from "../internal/FieldMessage.vue";
import { useFloating, autoUpdate, flip, offset, size, shift } from "@floating-ui/vue";

import useColor from "@/composables/useColor";

type BaseModelValue = string | number | undefined | null;

type LocalOption = {
  text?: string | number | null;
  value?: BaseModelValue;
  disabled?: boolean;
  context: Option;
};

export interface Props {
  modelValue?: BaseModelValue | BaseModelValue[];
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  closeAfterSelection?: boolean;
  resetSearchAfterSelection?: boolean;
  color?: string;
  error?: boolean;
  errorMessage?: string | boolean | null;
  message?: string;
  hint?: string;
  id?: string;
  showDropdownOnEmptySearch?: boolean;
  loading?: boolean;

  // options
  options?: Option[];
  groupedOptions?: OptionGroup[];
  getText?: (option: Option) => string | number;
  getValue?: (option: Option) => string | number;
  getIsDisabled?: (option: Option) => boolean;
  getGroupOptions?: (group: OptionGroup) => Option[];
  getGroupTitle?: (group: OptionGroup) => string | number | undefined | null;
  customSearch?: (search?: string, option: Option) => {};
  creatable?: boolean;
  focusable?: boolean;
  deselectable?: boolean;
  dropdownWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  resetSearchAfterSelection: true,
  closeAfterSelection: true,
  showDropdownOnEmptySearch: true,
  getText: (option: any) => option.title,
  getValue: (option: any) => option.id,
});

const emit = defineEmits<{
  "update:modelValue": [BaseModelValue | BaseModelValue[]];
  change: [BaseModelValue | BaseModelValue[]];
  search: [string | undefined];
}>();

const { color } = useColor(toRef(props, "color"));

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
  emitSearch();
  state.focused = true;
  state.focusedOption = undefined;
};

const handleInputFocus = (e: FocusEvent) => {
  state.focused = true;
};

const handleInputBlur = (e: FocusEvent) => {
  const relatedTarget = e.relatedTarget as HTMLElement;

  // don't do anything if it's on select
  if (relatedTarget && containerRef.value?.selfRef?.contains(relatedTarget)) return;

  // don't do anything if it's dropdown.
  if (dropdownRef.value?.contains(relatedTarget)) return;

  // close
  state.focused = false;
  close();
};

const inputReadonly = computed(() => !props.searchable);

const focus = () => {
  inputRef.value?.focus();
};

const blur = () => {
  inputRef.value?.blur();
};

// POSITIONING
const middleware = ref([
  offset(4),
  flip({
    crossAxis: false,
  }),
  shift(),
  size({
    apply: ({ rects, elements }) => {
      Object.assign(elements.floating.style, {
        width: props.dropdownWidth ?? `${rects.reference.width}px`,
      });
    },
  }),
]);
const { floatingStyles } = useFloating(containerRef as any, dropdownRef, {
  placement: "bottom",
  whileElementsMounted: autoUpdate,
  open: active,
  middleware,
});

// ACTIVE/DEACTIVE

const toggleActive = () => (active.value = !active.value);

const activate = () => {
  if (props.disabled) return;
  active.value = true;
};

const close = () => {
  active.value = false;
  state.focusedOption = undefined;
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
        return local;
      })
      .filter((v) => !!v);
  } else {
    return flatOptions.value?.find(({ value }) => props.modelValue == value);
  }
});

const renderDisplayLabel = computed(() => {
  if (Array.isArray(liveSelected.value)) {
    return liveSelected.value.map((item) => item?.text).join(", ");
  } else {
    return liveSelected.value?.text;
  }
});

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
    isFocused: getIsFocusedOption(option.value),
    isSelected: getIsSelected(option.value),
    isLastActive: getIsLastActive(option.value),
    color: props.color,
    onClick: () => select(option.value),
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

const handleEsc = () => {
  if (active.value) close();
};

const handleKeydown = (e: KeyboardEvent) => {
  const key = e.key;

  if (key === "Enter") {
    handleEnter();
  }

  if (key === "Tab") {
    if (active.value) e.preventDefault();
  }

  if (key === "Escape") {
    handleEsc();
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

// STATES

const slots = useSlots();

const hasErrors = computed(() => !!props.error || !!props.errorMessage);

// EMITS
const emitUpdateModelValue = (value: BaseModelValue | BaseModelValue[]) => {
  emit("update:modelValue", value);
  emit("change", value);
};
const emitSearch = () => {
  emit("search", search.value);
};
</script>

<style lang="scss">
.r-selectnew {
  &-input {
    border: none;
    background: transparent;
    font-size: 1rem;
    font-family: inherit;
    width: 100%;
    color: inherit;
    padding: var(--r-normal-padding-y) 0;
  }

  .r-input-container {
    padding: 0 var(--r-normal-padding-y);
    align-items: center;
    height: var(--r-element-default-height);
  }

  &-display {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
  }
  &-display-label,
  &-placeholder {
    pointer-events: none;
    position: absolute;
    left: 0;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &-placeholder {
    color: color(disabled, var(--r-disabled-alpha));
  }

  &-toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform var(--r-duration);
    &_rotate {
      transform: rotate(180deg);
    }
  }

  &-options-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &-empty {
    color: color(disabled);
    text-align: center;
    padding: var(--r-normal-padding-y);
  }

  &_disabled {
    opacity: 0.76;
  }

  &_error {
    --r-color: var(--r-red) !important;
    --r-border-color: var(--r-red);
    --r-border-alpha: 1;
  }
}

.r-selectnew-dropdown {
  &-inner {
    background-color: color(b2);
    border-radius: var(--r-radius);
  }
  &-scroll-area {
    padding: 4px;
    overflow-y: auto;
    max-height: 200px;
    @extend .scroll-bar;
  }
}

.fade-move {
  &-enter-active,
  &-leave-active {
    --duration: calc(var(--r-duration) / 1.5);
    transition-duration: var(--duration);
    .r-selectnew-dropdown-inner {
      transition: opacity var(--duration), transform var(--duration);
    }
  }

  &-enter-from,
  &-leave-to {
    .r-selectnew-dropdown-inner {
      opacity: 0;
      transform: translateY(6px);
    }
  }
}
</style>
