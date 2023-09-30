<template>
  <div
    :class="['r-option', { active: isActive, focused, disabled }]"
    @click="onSelectValue"
    v-if="visible"
    v-ripple
    tabindex="-1"
    :style="{ '--r-color': color || 'var(--r-prm)' }"
    ref="elementRef"
  >
    <div class="padding">
      <slot> {{ text }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, toRef, ref, onMounted } from "vue";
import { rSelectKey } from "@/injectionKeys";
import useColor from "@/composables/useColor";
import type { SelectInject } from "@/types";
export interface Props {
  text?: string;
  value?: number | string | null;
  disabled?: boolean;
  color?: string;
  context?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  text: "",
  value: undefined,
  disabled: false,
});
defineOptions({
  isOption: true,
});
const select = inject(rSelectKey) as SelectInject;
const color = useColor(props.color ? toRef(props, "color") : toRef(select!, "color"));

const elementRef = ref<HTMLDivElement | undefined>();

const onSelectValue = () => {
  select.onSelectValue({
    event: props.value,
    activate: isActive.value ? false : true,
  });
};
const visible = computed(() => {
  return !!select.customSearch ? true : props.text.toLowerCase().includes(select.search.value.toLowerCase());
});
const focused = computed(() => {
  if (select!.focusedItemValue.value) {
    return props.value === select.focusedItemValue.value.value;
  }
});
const isActive = computed(() => {
  const value = select.modelValue.value;
  if (select.multiple.value && Array.isArray(value)) {
    return !!value.find((x) => x === props.value);
  } else {
    return value == props.value;
  }
});
const isLastSelectedItem = computed(() => {
  return props.value === select.lastSelectedValue.value;
});

onMounted(() => {
  if (isLastSelectedItem.value) {
    const offsetTop = elementRef.value?.offsetTop;
    if (offsetTop) elementRef.value?.scrollIntoView(false);
  }
});
</script>

<style lang="scss">
.r-option {
  color: color(text);
  width: 100%;
  font-size: var(--r-font-small);
  min-height: 100%;
  margin-bottom: calc(var(--r-space-1) / 2);
  padding: 0;
  transition: background var(--r-duration);
  border-radius: var(--r-radius);
  cursor: pointer;

  .padding {
    padding: var(--r-normal-padding);
  }

  &:hover {
    background: color(hover, var(--r-hover-alpha));
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.focused {
    background: color(hover, var(--r-hover-alpha));
    box-shadow: 0 0 0 1px color();
  }

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &.active {
    color: color();
    background: color(color, var(--r-light-alpha)) !important;
  }
}
</style>
