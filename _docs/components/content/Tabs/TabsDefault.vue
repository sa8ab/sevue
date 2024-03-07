<template>
  <div class="doc-item">
    <RTab v-model="activeTab" v-bind="$attrs">
      <RTabItem value="first"> First Tab </RTabItem>
      <RTabItem value="second"> Second Tab </RTabItem>
    </RTab>
    <RPanel v-model="activeTab">
      <RPanelItem value="first">
        <div>Content Of First Tab</div>
        <div>Content Of First Tab</div>
        <div>Content Of First Tab</div>
      </RPanelItem>
      <RPanelItem value="second">Content Of Second Tab</RPanelItem>
    </RPanel>
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
