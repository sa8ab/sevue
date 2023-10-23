<template>
  <div class="center-it">
    <div class="items">
      <!-- <RButton>Default</RButton>
      <RButton compact color="yellow">Small</RButton>
      <RButton compact iconOnly color="red"><i class="bx bx-user"></i></RButton> -->
      <RButton :loading="loading" color="red" compact>some transparent button</RButton>
      <RButton :loading="loading" autoHeight>some transparent button</RButton>
      <RButton :loading="loading">button</RButton>
      <RButton>button test</RButton>
      <RButton @click="loading = !loading">Load</RButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RButton } from "../../src/main";

const loading = ref(false);

const buttonRef = ref<HTMLButtonElement | undefined>(undefined);

const customFocus = () => {};
</script>

<style lang="scss" scoped>
.center-it {
  padding: 40px;
  display: flex;
  justify-content: center;
}
.items {
  display: flex;
  align-items: center;

  gap: 4px;
}
</style>
