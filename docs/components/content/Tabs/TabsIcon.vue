<template>
  <div class="doc-item">
    <RTab v-model:model-value="activeTab">
      <RTabItem value="first">
        <i class="bx bx-user"></i>
        &nbsp; USER</RTabItem
      >
      <RTabItem value="second">
        <i class="bx bx-cog"></i>
        &nbsp; SETTINGS
      </RTabItem>
    </RTab>
  </div>
</template>

<script lang="ts" setup>
const activeTab = ref("first");
</script>

<style scoped>
.doc-item {
  max-width: 100%;
}
.action {
  margin-bottom: 8px;
}
</style>
