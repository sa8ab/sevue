<template>
  <div class="center-it">
    <RCheckbox v-model="checked">Checkbox</RCheckbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checked = ref(true);
</script>

<style lang="scss" scoped></style>
