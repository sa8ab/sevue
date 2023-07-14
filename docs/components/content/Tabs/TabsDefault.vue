<template>
  <div class="doc-item">
    <RTab v-model="activeTab" v-bind="$attrs">
      <RTabItem value="first"> First Tab </RTabItem>
      <RTabItem title="Second Tab" value="second"> Second Tab </RTabItem>
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
</style>
