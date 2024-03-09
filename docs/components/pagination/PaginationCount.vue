<template>
  <div class="doc-item">
    <!-- #region template -->
    <RPagination :count="10" v-model="page" />
    <!-- #endregion template -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const page = ref(4);
</script>
