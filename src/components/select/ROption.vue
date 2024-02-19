<script setup lang="ts">
import { watch, ref, toRef, onMounted } from "vue";
import useColor from "@/composables/useColor";

export interface Props {
  value?: string | number | null;
  text?: string | number | null;
  disabled?: boolean;
  isSelected?: boolean;
  isFocused?: boolean;
  isLastActive?: boolean;
  color?: string;
}

const props = defineProps<Props>();

const { color } = useColor(toRef(props, "color"));

const selfRef = ref<HTMLDivElement>();

const scrollIntoView = () => {
  const offsetTop = selfRef.value?.offsetTop;
  if (offsetTop)
    selfRef.value?.scrollIntoView({
      block: "nearest",
    });
};

onMounted(() => {
  if (props.isLastActive) {
    requestAnimationFrame(() => scrollIntoView());
  }
});

watch(
  () => props.isFocused,
  () => {
    scrollIntoView();
  }
);
</script>

<template>
  <div
    :class="[
      'r-optionnew',
      { 'r-optionnew_selected': isSelected, 'r-optionnew_focused': isFocused, 'r-optionnew_disabled': disabled },
    ]"
    :style="{ '--r-color': color || 'var(--r-prm)' }"
    @click="$emit('click')"
    ref="selfRef"
  >
    <slot>{{ text }}</slot>
  </div>
</template>

<style lang="scss">
.r-optionnew {
  padding: var(--r-normal-padding-y);
  cursor: pointer;
  transition: all var(--r-duration);
  border-radius: var(--r-radius);
  font-size: var(--r-font-small);

  &_selected {
    color: color();
    background: color(color, var(--r-light-alpha));
  }

  &_focused,
  &:hover {
    background: color(hover, var(--r-hover-alpha));
  }

  &_disabled {
    pointer-events: none;
    opacity: 0.7;
  }
}
</style>
