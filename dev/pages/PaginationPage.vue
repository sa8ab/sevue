<template>
  <div class="center-it">
    <div class="container">
      <RPagination :count="10" v-model="page" compact bordered />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const page = ref(2);
</script>

<style lang="scss" scoped></style>
