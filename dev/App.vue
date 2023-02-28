<template>
  <div class="app">
    <div>
      <RButton @click="click"> hi there </RButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const click = () => console.log("clicked");
</script>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  gap: $p2;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
