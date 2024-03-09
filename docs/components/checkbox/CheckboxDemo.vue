<template>
  <div class="doc-item">
    <RCheckbox v-model="state">Demo Checkbox</RCheckbox>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const state = ref();
</script>
