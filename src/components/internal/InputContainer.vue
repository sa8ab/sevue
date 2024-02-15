<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  focused?: boolean;
  disabled?: boolean;
}>();
const emit = defineEmits<{
  pointerdown: [PointerEvent];
}>();

const selfRef = ref<HTMLDivElement>();

defineExpose({
  selfRef,
});
</script>

<template>
  <div
    :class="['r-input-container', { 'r-input-container_disabled': disabled, 'r-input-container_focused': focused }]"
    @pointerdown="emit('pointerdown', $event)"
    ref="selfRef"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss">
.r-input-container {
  background: color(b1);
  display: flex;
  border-radius: var(--r-radius);
  transition: box-shadow var(--r-duration);
  overflow: hidden;
  box-shadow: generateBoxShadow(1px, border-color, var(--r-border-alpha));

  &:not(.r-input-container_disabled):hover {
    --r-border-alpha: 0.5;
  }

  &_focused {
    box-shadow: generateBoxShadow(2px, color);
  }
}
</style>
