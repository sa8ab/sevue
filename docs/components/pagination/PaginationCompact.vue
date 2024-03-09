<template>
  <div class="doc-item">
    <!-- #region template -->
    <RPagination :count="100" v-model="page" bordered compact />
    <!-- #endregion template -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const page = ref(40);
</script>

<style lang="scss"></style>
