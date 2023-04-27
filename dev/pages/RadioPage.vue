<template>
  <div class="center-it">
    <div class="container">
      <RRadio v-model="selected" value="1" tag>radio item 1</RRadio>
      <RRadio v-model="selected" value="2" tag>radio item 2</RRadio>
      <RRadio v-model="selected" value="3" tag>radio item 3</RRadio>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selected = ref("2");
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--r-space-2);
}
</style>
