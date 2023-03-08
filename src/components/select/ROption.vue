<template>
  <div
    :class="['r-select-item r', { active: isActive, focused, disabled }]"
    @click="onSelectValue"
    v-if="visible"
    v-ripple
    tabindex="-1"
  >
    <div class="padding">
      <slot> {{ text }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { RSelectKey } from "@/injectionKeys";
import { isArray } from "@vue/shared";

defineOptions({
  isOption: true,
});
const select = inject(RSelectKey);
const props = defineProps({
  text: {
    default: "",
    type: String,
  },
  value: {
    default: 0,
    type: [Number, String],
  },
  disabled: { default: false, type: Boolean },
});
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
.r-select-item {
  width: 100%;
  font-size: $fsmall;
  min-height: 100%;
  margin-bottom: math.div($p, 2);
  padding: 0;

  .padding {
    padding: $bp;
  }

  &:hover {
    background: color(hover);
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.focused {
    background: color(hover);
    outline: 1px dashed color(prm);
  }

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}

.active {
  color: color(prm);
  background: color(prm-light) !important;
}
</style>
