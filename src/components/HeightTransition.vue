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
const beforeEnter = (el: Element) => {
  (<HTMLElement>el).style.height = `0`;
};
const enter = (el: Element) => {
  const h = el.scrollHeight;
  (<HTMLElement>el).style.height = `${h}px`;
};
const afterEnter = (el: Element) => {
  (<HTMLElement>el).style.height = `auto`;
};
const leave = (el: Element) => {
  const height = getComputedStyle(el).height;
  (<HTMLElement>el).style.height = height;
  getComputedStyle(el).height;
  (<HTMLElement>el).style.height = `0`;
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
