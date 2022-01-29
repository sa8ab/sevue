<template>
  <div class="">
    <div class="actions">
      <RButton @click="loadingOnButton" fill ref="targetButton" class="button">
        On Button
      </RButton>
      <RButton @click="loadingOnContainer">On Container</RButton>
    </div>
    <div class="target-container">Target for loading</div>
  </div>
</template>

<script>
export default {
  methods: {
    loadingOnButton() {
      const loading = this.$r.loading({
        target: this.$refs.targetButton,
        scale: 0.7,
      });
      setTimeout(() => {
        loading.close();
      }, 3000);
    },
    loadingOnContainer() {
      const loading = this.$r.loading({
        target: ".target-container",
      });
      setTimeout(() => {
        loading.close();
      }, 3000);
    },
  },
};
</script>

<style scoped lang="scss">
.actions {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}
.target-container {
  margin: auto;
  padding: 40px 8px;
  box-shadow: 0 0 16px rgba(black, 0.2);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  text-align: center;
}
.button {
  position: relative !important;
}
</style>