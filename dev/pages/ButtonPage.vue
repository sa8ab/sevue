<template>
  <div class="center-it">
    <div class="items">
      <RButton :to="'/button'">Button</RButton>
      <RButton iconOnly icon="bx-x" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

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
}
</style>
