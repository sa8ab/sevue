<template>
  <div class="doc-items">
    <RRadio v-for="item in items" :value="item.id" v-model="selected" :color="item.color" :disabled="item.disabled">{{ item.name }}</RRadio>
  </div>
</template>

<script lang="ts" setup>
const items = [
  { name: "Default", id: 1 },
  { name: "HEX", id: 2, color: "#4cd137" },
  { name: "disabled", id: 3, disabled: true },
  { name: "Red", id: 4, color: "red" },
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
  margin-bottom: 40px;
}
</style>
