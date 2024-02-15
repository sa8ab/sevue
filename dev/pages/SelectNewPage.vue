<template>
  <div>
    <div style="height: 200px"></div>
    <div class="center-it grid-4">
      <RSelectNew label="New Select" hint="Up to 4 items" searchable dropdownWidth="400px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RSelectNew } from "../../src/main";
</script>

<style lang="scss" scoped>
.grid-4 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  padding: 40px;
}
</style>
