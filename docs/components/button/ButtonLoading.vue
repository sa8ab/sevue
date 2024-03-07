<template>
  <div class="button-loading-container">
    <RButton @click="loading = !loading">Toggle Loading</RButton>
    <div class="button-items">
      <!-- #region snippet -->
      <RButton :loading="loading" color="red">Red</RButton>
      <RButton :loading="loading" color="yellow">Yellow</RButton>
      <RButton :loading="loading">Default</RButton>
      <RButton :loading="loading" color="green">Green</RButton>
      <RButton :loading="loading" color="#FC427B">HEX</RButton>
      <RButton :loading="loading" color="rgb(33, 140, 116)">RGB</RButton>
      <!-- #endregion snippet -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { RButton } from "sevue";
// #region script
import { ref } from "vue";
const loading = ref(true);
// #endregion script
</script>
