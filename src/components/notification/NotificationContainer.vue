<template>
  <div :class="['r-notifications-container', ...renderPlacement]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
defineOptions({
  inheritAttrs: false,
});
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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: var(--r-space-2);

  &.has-top {
    top: 0;
  }

  &.has-bottom {
    bottom: 0;
  }

  &.has-left {
    left: 0;
    align-items: flex-start;
  }

  &.has-right {
    right: 0;
  }

  &.is-center {
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  }
}

@media only screen and (max-width: 600px) {
  .r-notifications-container {
    width: 100%;

    .r-notification,
    .inner {
      border-radius: var(--r-radius) !important;
    }
  }
}
</style>
