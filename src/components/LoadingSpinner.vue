<template>
  <div class="r-loading-spinner" :style="{ '--spinner-w': `${width}px`, '--border-w': `${borderWidth}px` }">
    <div class="r-loading-spinner__1"></div>
    <div class="r-loading-spinner__2"></div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width?: number | string
    borderWidth?: number | string
  }>(),
  {
    width: 28,
    borderWidth: 2
  }
)
</script>

<style scoped lang="scss">
.r-loading {
  &-spinner {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--spinner-w);
    height: var(--spinner-w);
    position: relative;

    &__1 {
      position: absolute;
      width: 100%;
      height: 100%;
      border: var(--border-w) solid color();
      border-radius: inherit;
      border-top: var(--border-w) solid transparent;
      border-left: var(--border-w) solid transparent;
      border-right: var(--border-w) solid transparent;
      animation: rotate 0.8s ease infinite;
      top: 0px;
    }

    &__2 {
      top: 0px;
      position: absolute;
      width: 100%;
      height: 100%;
      border: var(--border-w) dashed color();
      border-radius: inherit;
      border-top: var(--border-w) solid transparent;
      border-left: var(--border-w) solid transparent;
      border-right: var(--border-w) solid transparent;
      animation: rotate 0.8s linear infinite;
      opacity: 0.2;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>