<template>
  <div class="center-it grid-4"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RSelect } from "../../src/main";
</script>

<style lang="scss" scoped>
.grid-4 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  padding: 40px;
}
</style>
