<template>
  <div class="r-selectnew" :style="{ '--r-color': color || 'var(--r-prm)' }">
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
          :readonly="inputReadonly"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @keydown="handleKeydown"
        />
        <div class="r-selectnew-placeholder"></div>
        <div class="r-selectnew-display-label"></div>
      </div>
      <div class="r-selectnew-toggle-icon" ref="toggleIconRef">
        <SevueIcon name="chevron-down" width="24px" height="24px" />
      </div>
    </InputContainer>
    <Transition name="fade-move">
      <div class="r-selectnew-dropdown" ref="dropdownRef" v-if="active" :style="floatingStyles">
        <div class="r-selectnew-dropdown-inner">Dropdown Element</div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRef, computed } from "vue";
import type { Ref } from "vue";
import FieldLabel from "../internal/FieldLabel.vue";
import InputContainer from "../internal/InputContainer.vue";
import SevueIcon from "@/components/icons/SevueIcon.vue";
import { useFloating, autoUpdate, flip, offset, size, shift } from "@floating-ui/vue";

import useColor from "@/composables/useColor";

type BaseModelValue = string | number | undefined | null;

export interface Props {
  modelValue?: BaseModelValue | BaseModelValue[];
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  closeAfterSelection?: boolean;
  color?: string;
  error?: boolean;
  errorMessage?: string | boolean | null;
  message?: string;
  hint?: string;
  id?: string;
  showDropdownOnEmptySearch?: boolean;
  loading?: boolean;
  options?: any[];
  creatable?: boolean;
  focusable?: boolean;
  deselectable?: boolean;
  dropdownWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  closeAfterSelection: true,
  showDropdownOnEmptySearch: true,
});

const { color } = useColor(toRef(props, "color"));

const state = reactive<{
  focused: boolean;
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

const handleInputFocus = (e: FocusEvent) => {
  state.focused = true;
};
const handleInputBlur = (e: FocusEvent) => {
  const relatedTarget = e.relatedTarget as HTMLElement;

  // don't do anything if it's on select
  if (relatedTarget && containerRef.value?.selfRef?.contains(relatedTarget)) return;

  // TODO: don't do anything if it's dropdown

  // close
  state.focused = false;
  close();
};
const inputReadonly = computed(() => !props.searchable);

const focus = () => {
  inputRef.value?.focus();
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
  active.value = true;
};

const close = () => {
  active.value = false;
};

// EVENTS
const handlePointerDown = (e: PointerEvent) => {
  const target = e.target as HTMLElement;

  if (target.closest("input, button, a")) return;
  requestAnimationFrame(() => {
    focus();
  });
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
  }

  if (key === "Escape") {
    handleEsc();
  }

  if (key === "ArrowUp") {
  }

  if (key === "ArrowDown") {
  }
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
    align-items: center;
  }
  &-display-label,
  &-placeholder {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &-toggle-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}

.r-selectnew-dropdown-inner {
  background-color: color(b2);
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
      transform: translateY(8px);
    }
  }
}
</style>
