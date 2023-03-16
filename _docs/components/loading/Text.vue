<template>
  <RButton @click="loading">Loading With Text</RButton>
</template>

<script>
export default {
  methods: {
    loading() {
      const loading = this.$r.loading({
        background: "prm",
        color: "#fff",
        text: "Please Wait...",
      });
      setTimeout(() => {
        loading.close();
      }, 2500);
    },
  },
};
</script>

<style scoped lang="scss">
</style>