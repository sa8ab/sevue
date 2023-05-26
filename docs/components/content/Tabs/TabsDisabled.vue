<template>
  <div class="doc-item">
    <RTab :initialActiveTab="1">
      <RTabItem title="disabled tab" name="1" :disabled="true"> Content #1 </RTabItem>
      <RTabItem title="Tab 2" name="2"> Content #2 </RTabItem>
      <RTabItem title="Tab 3" name="3"> Content #3 </RTabItem>
    </RTab>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.doc-item {
  max-width: 100%;
}
</style>
