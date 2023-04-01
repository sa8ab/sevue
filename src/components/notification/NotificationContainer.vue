<template>
  <div :class="['r-notifications-container', ...renderPlacement]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  placement: { default: "bottom-right", type: String },
});
const renderPlacement = computed(() => {
  const { placement } = props;
  const classes = [placement];
  if (placement.includes("top")) classes.push("has-top");
  if (placement.includes("bottom")) classes.push("has-bottom");
  if (placement.includes("left")) classes.push("has-left");
  if (placement.includes("right")) classes.push("has-right");
  if (!placement.includes("right") && !placement.includes("left")) {
    classes.push("is-center");
  }
  return classes;
});
</script>

<style lang="scss">
.r-notifications-container {
  z-index: 100;
  position: fixed;
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  padding: var(--r-space-2);
  &.has-top {
    top: 0;
  }
  &.has-bottom {
    bottom: 0;
  }
  &.has-left {
    left: 0;
  }
  &.has-right {
    right: 0;
  }
  &.is-center {
    left: 50%;
    transform: translateX(-50%);
  }
}
@media only screen and (max-width: 600px) {
  .r-notifications-container {
    max-width: 100%;
    width: 100%;
    .r-notification,
    .inner {
      border-radius: var(--r-radius) !important;
    }
  }
}
</style>
