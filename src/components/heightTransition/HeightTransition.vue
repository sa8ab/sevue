<template>
  <transition
    @beforeEnter="beforeEnter"
    @enter="enter"
    @leave="leave"
    name="height-transition"
    :appear="appear"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  name: "HeightTransition",
  props: {
    appear: { default: false },
  },
  methods: {
    beforeEnter(el) {
      el.style.height = 0;
    },
    enter(el, done) {
      const h = el.scrollHeight;
      el.style.height = `${h}px`;
      // done();
    },
    leave(el) {
      el.style.height = "0px";
    },
  },
};
</script>

<style lang="scss">
.height-transition {
  &-enter-active,
  &-leave-active {
    overflow: hidden;
  }
}
</style>