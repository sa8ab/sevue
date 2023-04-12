<template>
  <div class="center-it">
    <RButton :to="'/button'">Button</RButton>
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
</style>
