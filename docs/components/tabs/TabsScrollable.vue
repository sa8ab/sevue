<template>
  <div class="doc-item">
    <RTab v-model:modelValue="activeTab" scrollable>
      <RTabItem :value="`${x}`" v-for="x in 10"> Title #{{ x }} </RTabItem>
    </RTab>
  </div>
</template>

<script lang="ts" setup>
const activeTab = ref("1");
</script>

<style scoped>
.doc-item {
  max-width: 100%;
}
</style>
