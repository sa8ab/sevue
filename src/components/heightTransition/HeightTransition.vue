<template>
  <transition
    @beforeEnter="beforeEnter"
    @enter="enter"
    @leave="leave"
    @afterEnter="afterEnter"
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
      console.log("enter");
      const height = el.scrollHeight;
      el.style.height = `${height}px`;
    },
    afterEnter(el) {
      console.log("after enter", el);
      el.style.height = `auto`;
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