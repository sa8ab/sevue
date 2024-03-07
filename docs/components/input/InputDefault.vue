<template>
  <div class="doc-input">
    <!-- #region template -->
    <RInput v-model="name" placeholder="Please enter your name" label="Name" />
    <!-- #endregion template -->
  </div>
</template>

<script lang="ts" setup>
// #region script
import { ref } from "vue";
const name = ref("");
// #endregion script
</script>
