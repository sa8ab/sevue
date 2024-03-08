<template>
  <div class="input-items">
    <!-- #region template -->
    <RInput v-model="value" color="#1abc9c" placeholder="Hex color" />
    <RInput v-model="value" color="rgb(52, 73, 94)" placeholder="RGB color" />
    <!-- #endregion template -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const value = ref("");
</script>
