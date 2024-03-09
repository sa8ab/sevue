<template>
  <div class="center-it">
    <RCheckbox v-model="checked" ref="checkbox" color="red"> Checkbox </RCheckbox>
    <RCheckbox v-model="checked" ref="checkbox"> Checkbox </RCheckbox>
    <RCheckbox v-model="checked" ref="checkbox" color="red" disabled> Checkbox </RCheckbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checked = ref(true);
</script>

<style lang="scss" scoped></style>
