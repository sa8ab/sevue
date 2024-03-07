<template>
  <div class="doc-item">
    <RCheckbox v-model="state" >Checkbox</RCheckbox>
  </div>
</template>

<script lang="ts" setup>
const state = ref();
</script>

<style scoped>
.doc-item {
  max-width: 100%;
}
</style>
