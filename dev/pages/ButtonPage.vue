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
      <RButton>Normal</RButton>
      <RButton iconOnly><i class="bx bx-user"></i></RButton>
      <RButton compact iconOnly><i class="bx bx-user"></i></RButton>
      <RButton compact bordered>Compact</RButton>
      <RButton disabled>Disabled</RButton>
    </div>
    <div class="items loading">
      <RButton compact iconOnly color="red"><i class="bx bx-user"></i></RButton>
      <RButton :loading="loading" color="red" compact>compact</RButton>
      <RButton :loading="loading" variant="transparent">Some transparent button</RButton>
      <RButton :loading="loading" iconOnly compact>X</RButton>
      <RButton>button</RButton>
      <RButton compact>button</RButton>
      <RButton iconOnly compact>ICC</RButton>
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
