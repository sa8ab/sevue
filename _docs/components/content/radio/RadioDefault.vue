<template>
  <div class="doc-items">
    <RRadio v-for="item in items" :value="item.id" v-model="selected">{{ item.name }}</RRadio>
  </div>
</template>

<script lang="ts" setup>
const items = [
  { name: "Option 1", id: 1 },
  { name: "Option 2", id: 2 },
  { name: "Option 3", id: 3 },
  { name: "Option 4", id: 4 },
];
const selected = ref(2);
</script>

<style scoped>
.doc-items {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: var(--r-space-2);
  justify-content: center;
}
</style>
