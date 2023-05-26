<template>
  <div class="doc-item">
    <RButton @click="iconOnly = !iconOnly" class="action">Toggle Only Icon</RButton>
    <RTab :iconOnly="iconOnly">
      <RTabItem title="First Tab" name="1" icon="bxl-vuejs"> Some Content </RTabItem>
      <RTabItem title="Second Tab" name="2" icon="bxl-react"> Some Content </RTabItem>
    </RTab>
  </div>
</template>

<script lang="ts" setup>
const iconOnly = ref(false);
</script>

<style scoped>
.doc-item {
  max-width: 100%;
}
.action {
  margin-bottom: 8px;
}
</style>
