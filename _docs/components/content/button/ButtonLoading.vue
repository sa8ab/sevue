<template>
  <div class="container">
    <RButton @click="loading = !loading">Toggle Loading</RButton>
    <div class="items">
      <RButton :loading="loading" color="red">Red</RButton>
      <RButton :loading="loading" color="yellow">Yellow</RButton>
      <RButton :loading="loading">Default</RButton>
      <RButton :loading="loading" color="green">Green</RButton>
      <RButton :loading="loading" color="#FC427B">HEX</RButton>
      <RButton :loading="loading" color="rgb(33, 140, 116)">RGB</RButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RButton } from "sevue";
const loading = ref(true);
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.items {
  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;
}
</style>
