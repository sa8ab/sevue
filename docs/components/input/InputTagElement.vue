<template>
  <div class="doc-item">
    <RInput v-model="value" label="Textarea" tag="textarea" />
    <RInput v-model="value" label="value is initally set by directive" :tag="InputWithDirective" />
  </div>
</template>

<script lang="ts" setup>
import InputWithDirective from "./InputWithDirective.vue";
const value = ref("");
</script>

<style scoped lang="scss">
.doc-item {
  display: flex;
  flex-direction: column;
  gap: var(--r-space-3);
}
</style>
