<template>
  <transition
    @beforeEnter="beforeEnter"
    @enter="enter"
    @afterEnter="afterEnter"
    @beforeLeave="beforeLeave"
    name="fade"
  >
    <div class="r-tab-item" v-if="active">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "RTabItem",
  inject: {
    tab: {
      default: () => {},
    },
  },
  props: {
    title: { default: String },
    icon: { default: String },
  },
  mounted() {},
  methods: {
    beforeEnter(el) {
      // this.tab.setHeight(`0 px`);
    },
    enter(el) {
      const { height } = el.getBoundingClientRect();

      setTimeout(() => {
        this.tab.setHeight(`${height}px`);
      }, 0);
    },
    afterEnter(el) {
      this.tab.setHeight(`auto`);
    },
    beforeLeave(el) {
      const { height } = el.getBoundingClientRect();
      console.log({ height });
      this.tab.setHeight(`${height}px`);
    },
  },
  computed: {
    active() {
      return this.tab.activeTab === this.title;
    },
  },
};
</script>

<style lang="scss">
.r-tab-item {
  padding: $p;
}
.fade {
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter-active,
  &-leave-active {
    position: absolute;
    transition: all $duration;
  }
}
</style>