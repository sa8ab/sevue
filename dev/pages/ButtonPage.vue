<template>
  <div class="center-it">
    <div class="actions">
      <RButton @click="disabled = !disabled">Toggle Disabled</RButton>
    </div>
    <div class="items base">
      <RButton :disabled="disabled">Normal</RButton>
      <RButton :disabled="disabled" variant="flat">Flat</RButton>
      <RButton :disabled="disabled" variant="fill">Fill</RButton>
      <RButton :disabled="disabled" variant="bordered">Bordered</RButton>
      <RButton :disabled="disabled" variant="text">Text</RButton>
      <RButton :disabled="disabled" variant="link">Link</RButton>
    </div>
    <div class="items base">
      <RButton size="small">SMALL</RButton>
      <RButton>Normal</RButton>
      <RButton size="large">LARGE</RButton>

      <RButton size="small" iconOnly><i class="bx bx-user"></i></RButton>
      <RButton iconOnly><i class="bx bx-user"></i></RButton>
      <RButton size="large" iconOnly><i class="bx bx-user"></i></RButton>
    </div>
    <div class="items loading">
      <RButton size="small" iconOnly color="red"><i class="bx bx-user"></i></RButton>
      <RButton :loading="loading" color="red" size="small">SMALL</RButton>
      <RButton :loading="loading" variant="transparent">Some transparent button</RButton>
      <RButton :loading="loading" iconOnly size="small">X</RButton>
      <RButton>button</RButton>
      <RButton size="small">button</RButton>
      <RButton iconOnly size="small">ICC</RButton>
      <RButton iconOnly>IC</RButton>
      <RButton>button test</RButton>
      <RButton @click="loading = !loading">Load</RButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RButton } from "../../src/main";

const loading = ref(false);
const disabled = ref(false);

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
