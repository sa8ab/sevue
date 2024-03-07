<template>
  <div class="doc-item">
    <RTab v-model="active">
      <RTabItem value="1" :disabled="true"> disabled tab </RTabItem>
      <RTabItem value="2"> Tab 2 </RTabItem>
      <RTabItem value="3"> Tab 3 </RTabItem>
    </RTab>
  </div>
</template>

<script lang="ts" setup>
const active = ref("2");
</script>

<style scoped>
.doc-item {
  max-width: 100%;
}
</style>
