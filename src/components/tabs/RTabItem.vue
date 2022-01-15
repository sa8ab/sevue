<template>
  <transition
    @enter="enter"
    @afterEnter="afterEnter"
    @beforeLeave="beforeLeave"
    :name="renderTransitionName"
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
    enter(el) {
      const { height } = el.getBoundingClientRect();
      setTimeout(() => {
        this.tab.setHeight(`${height}px`);
      }, 0);
    },
    afterEnter() {
      this.tab.setHeight(`auto`);
    },
    beforeLeave(el) {
      // because auto to px does not translate
      const { height } = el.getBoundingClientRect();
      this.tab.setHeight(`${height}px`);
    },
  },
  computed: {
    active() {
      return this.tab.activeTab === this.title;
    },
    renderTransitionName() {
      return this.tab.direction;
    },
  },
};
</script>

<style lang="scss">
</style>