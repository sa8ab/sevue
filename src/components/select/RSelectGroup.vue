<template>
  <div class="r-select-group">
    <p class="title" v-if="visible">{{ title }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "RSelectItem",
  inject: {
    select: {
      default: () => ({}),
    },
  },
  props: {
    title: { default: String },
  },
  data: () => ({}),
  mounted() {},
  methods: {},
  computed: {
    visible() {
      // const options = this.$slots.default
      //   .filter((item) => item.tag)
      //   .map(({ componentOptions }) => componentOptions.propsData);
      // const search = this.select().search;
      // const items = options.map(({ text }) => {
      //   return text.toLowerCase().includes(search.toLowerCase());
      // });
      // const trueItem = items.find((x) => x);
      // return trueItem;
      return !this.select().search;
    },
  },
};
</script>

<style scoped lang="scss">
.r-select-group {
  .title {
    padding: $p;
    font-weight: 500;
  }
}
</style>