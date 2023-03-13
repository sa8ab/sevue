<template>
  <Transition
    @beforeEnter="beforeEnter"
    @enter="enter"
    @afterEnter="afterEnter"
    @leave="leave"
    name="height-transition"
    :appear="appear"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
defineProps({
  appear: { default: false },
});
const beforeEnter = (el: HTMLElement) => {
  el.style.height = `0`;
};
const enter = (el: HTMLElement) => {
  const h = el.scrollHeight;
  el.style.height = `${h}px`;
};
const afterEnter = (el: HTMLElement) => {
  el.style.height = `auto`;
};
const leave = (el: HTMLElement) => {
  const height = getComputedStyle(el).height;
  el.style.height = height;
  getComputedStyle(el).height;
  el.style.height = `0`;
};
</script>

<style lang="scss">
.height-transition {
  &-enter-active,
  &-leave-active {
    overflow: hidden;
  }

  &-enter,
  &-leave-to {
    height: 0;
  }
}
</style>
