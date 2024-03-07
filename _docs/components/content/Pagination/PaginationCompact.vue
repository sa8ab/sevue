<template>
  <div class="doc-item">
    <RPagination :count="100" v-model="page" bordered compact />
  </div>
</template>

<script lang="ts" setup>
const page = ref(40);
</script>

<style scoped lang="scss">
.doc-item {
  max-width: 100%;
}
</style>
