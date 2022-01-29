<template>
  <div class="">
    <RButton @click="onClick">Show Loading</RButton>
  </div>
</template>

<script>
export default {
  methods: {
    onClick() {
      const loading = this.$r.loading();
      setTimeout(() => {
        loading.close();
      }, 3000);
    },
  },
};
</script>

<style>
</style>