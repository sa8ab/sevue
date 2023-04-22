<template>
  <div class="doc-items four">
    <RCheckbox v-model="state" v-for="{ name, id, disabled } in items" :value="id" :disabled="disabled">{{ name }}</RCheckbox>
    <pre>Selected: {{ state }}</pre>
  </div>
</template>

<script lang="ts" setup>
const items = [
  { name: "Switzerland", id: 1 },
  { name: "Poland", id: 2 },
  { name: "Croatia (disabled)", id: 3, disabled: true },
  { name: "Sweden", id: 4 },
];
const state = ref([]);
</script>

<style scoped>
.doc-item {
  max-width: 100%;
}
</style>
