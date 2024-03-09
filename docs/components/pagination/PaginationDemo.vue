<template>
  <div class="doc-item">
    <RPagination :count="10" v-model="page" bordered :sideRange="1" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const page = ref(4);
</script>
