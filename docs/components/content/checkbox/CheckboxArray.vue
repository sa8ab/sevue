<template>
  <div class="doc-items four">
    <RCheckbox v-model="state" v-for="{ name, id } in items" :val="id" >{{ name }}</RCheckbox>
    <pre>Selected: {{ state }}</pre>
  </div>
</template>

<script lang="ts" setup>
const items = [
  { name: "Switzerland", id: 1 },
  { name: "Poland", id: 2 },
  { name: "Croatia", id: 3 },
  { name: "Sweden", id: 4 },
];
const state = ref([]);
</script>

<style scoped>
.doc-item {
  max-width: 100%;
}
</style>
