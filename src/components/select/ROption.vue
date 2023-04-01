<template>
  <div :class="['r-option r', { active: isActive, focused, disabled }]" @click="onSelectValue" v-if="visible" v-ripple
    tabindex="-1" :style="{ '--r-prm': color }">
    <div class="padding">
      <slot> {{ text }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, toRef } from "vue";
import { rSelectKey } from "@/injectionKeys";
import { isArray } from "@vue/shared";
import useColor from "@/composables/useColor";
export interface Props {
  text?: string
  value: number | string
  disabled?: boolean
  color?: string
}

const props = withDefaults(
  defineProps<Props>(),
  {
    text: '',
    value: 0,
    disabled: false,
  }
)
defineOptions({
  isOption: true,
});
const select = inject(rSelectKey);
const color = useColor(props.color ? toRef(props, 'color') : toRef(select!, 'color'))
const onSelectValue = () => {
  select!.onSelectValue({
    event: props.value,
    activate: isActive.value ? false : true,
  });
};
const visible = computed(() => {
  return props.text.toLowerCase().includes(select!.search.value.toLowerCase());
});
const focused = computed(() => {
  if (select!.focusedItemValue.value) {
    return props.value === select!.focusedItemValue.value.value;
  }
});
const isActive = computed(() => {
  const value = select!.modelValue.value;
  if (select!.multiple.value && isArray(value)) {
    return !!value.find((x: any) => x === props.value);
  } else {
    return value == props.value;
  }
});
</script>

<style scoped lang="scss">
.r-option {
  color: color(text);
  width: 100%;
  font-size: var(--r-font-small);
  min-height: 100%;
  margin-bottom: calc(var(--r-space-1) / 2);
  padding: 0;

  .padding {
    padding: $bp;
  }

  &:hover {
    background: color(hover, var(--hover-alpha));
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.focused {
    background: color(hover, var(--hover-alpha));
    outline: 1px dashed color(prm);
  }

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}

.active {
  color: color(prm);
  background: color(prm, var(--light-alpha)) !important;
}
</style>
