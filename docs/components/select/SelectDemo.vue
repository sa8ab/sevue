<template>
  <div class="input-items">
    <RSelect
      v-model="selected"
      placeholder="Select An Option"
      label="Demo"
      :options="items"
      :getText="(option) => option.name"
      :getValue="(option) => option.id"
    >
    </RSelect>

    <RSelect
      v-model="selected"
      placeholder="Select An Option"
      searchable
      label="Searchable"
      :options="items"
      :getText="(option) => option.name"
      :getValue="(option) => option.id"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const items = ref([
  { name: "Vue", id: 1 },
  { name: "React", id: 2 },
  { name: "Svelte", id: 3 },
  { name: "Nuxt", id: 4 },
  { name: "Node", id: 5 },
]);
const selected = ref();
</script>
