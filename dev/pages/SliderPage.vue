<template>
  <div class="center-it">hi</div>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import { RInput } from "../../src/main";

const value = ref("sdds");

const onInput = (e) => {
  console.log(e);
};
</script>

<style lang="scss" scoped></style>
