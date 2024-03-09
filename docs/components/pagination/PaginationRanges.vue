<template>
  <div class="doc-item">
    <!-- #region template -->
    <RPagination :count="10" v-model="page" bordered :sideRange="1" :mainRange="0" />
    <!-- #endregion template -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const page = ref(4);
</script>

<style lang="scss"></style>
