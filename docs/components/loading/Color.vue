<template>
  <div class="container">
    <RButton @click="prmBackground">Loading</RButton>
    <RButton @click="hexBackground">HEX Background</RButton>
    <RButton @click="hexColor">HEX Color</RButton>
  </div>
</template>

<script>
export default {
  methods: {
    prmBackground() {
      const loading = this.$r.loading({
        background: "prm",
        color: "#fff",
      });
      setTimeout(() => {
        loading.close();
      }, 2500);
    },
    hexBackground() {
      const loading = this.$r.loading({
        background: "#27ae60",
        color: "#fff",
      });
      setTimeout(() => {
        loading.close();
      }, 3000);
    },
    hexColor() {
      const loading = this.$r.loading({
        color: "#27ae60",
        text: "Loading #27ae60",
      });
      setTimeout(() => {
        loading.close();
      }, 3000);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>