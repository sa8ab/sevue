<template>
  <div class="doc-item">
    <RButton @click="activeTab = 'second'" fill>Change Tab</RButton>
    <div style="padding: 4px 0"></div>
    <RTab v-model="activeTab">
      <RTabItem title="Tab 1" name="first">FIRST</RTabItem>
      <RTabItem title="Tab 2" name="second">SECOND</RTabItem>
    </RTab>
  </div>
</template>

<script lang="ts" setup>
const activeTab = ref<string>("first");
</script>

<style scoped>
.doc-item {
  max-width: 100%;
}
.action {
  margin-bottom: 8px;
}
</style>
