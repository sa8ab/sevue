<template>
  <transition
    @beforeEnter="beforeEnter"
    @enter="enter"
    @leave="leave"
    name="height-transition"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  name: "HeightTransition",
  methods: {
    beforeEnter(el) {
      el.style.height = 0;
    },
    enter(el, done) {
      const height = el.scrollHeight;
      el.style.height = `${height}px`;
    },
    leave(el) {
      el.style.height = "0px";
    },
  },
};
</script>

<style scoped lang="scss">
.height-transition {
  &-enter-active,
  &-leave-active {
    transition: all $duration;
    overflow: hidden;
  }
}
</style>