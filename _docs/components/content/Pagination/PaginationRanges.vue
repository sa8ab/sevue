<template>
  <div class="doc-item">
    <RPagination :count="10" v-model="page" bordered :sideRange="1" :mainRange="0" />
  </div>
</template>

<script lang="ts" setup>
const page = ref(4);
</script>

<style scoped lang="scss">
.doc-item {
  max-width: 100%;
}
</style>
