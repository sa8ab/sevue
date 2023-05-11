<template>
  <div class="center-it">
    <div class="items">
      <RButton>Default</RButton>
      <RButton compact>Small</RButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RButton } from "../../src/main";

const value = ref("");
</script>

<style lang="scss" scoped>
.center-it {
  max-width: 400px;
  margin: auto;
}
.items {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
