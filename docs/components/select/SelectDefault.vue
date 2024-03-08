<template>
  <div>
    <!-- #region template -->
    <RSelect
      label="Select"
      v-model="selected"
      :options="items"
      :getText="(option) => option.name"
      :getValue="(option) => option.id"
    />
    <!-- #endregion template -->
  </div>
</template>

<script lang="ts" setup>
// #region script
import { ref } from "vue";
const items = [
  { name: "Vue", id: 1 },
  { name: "React", id: 2 },
  { name: "Svelte", id: 3 },
  { name: "Nuxt", id: 4 },
  { name: "Node", id: 5 },
];
const selected = ref();
// #endregion script
</script>
